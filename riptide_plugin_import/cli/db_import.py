import gzip
import os
import tempfile
from typing import Optional

import click
from click import prompt, echo

from riptide.config.document.project import Project
from riptide_cli.command import importt_impl
from riptide_cli.helpers import RiptideCliError
from riptide_plugin_import.cli.cli_file_downloader import CliFileDownloader
from riptide_plugin_import.document.asset import COMPRESSION_GZIP
from riptide_plugin_import.document.loader import load_import_config, search_db_asset
from riptide_plugin_import.files.downloader import FileDownloader
from riptide_plugin_import.files.lfs.resolver import LfsConfig, LfsAuthError, LfsConfigError
from riptide_plugin_import.files.provider import FileProvider


async def import_db_repo(ctx, lfs_config: Optional[LfsConfig] = None):
    project: Project = ctx.system_config["project"]
    import_project = load_import_config(project)
    if import_project is None:
        raise RiptideCliError("There is no import.riptide.yml, repository import is not available. "
                              "Use --path instead.", ctx)
    imprt_asset = search_db_asset(import_project)
    if lfs_config is None:
        lfs_config = LfsConfig(project.folder())
    if imprt_asset is None:
        raise RiptideCliError("There is no import.riptide.yml asset configured for the database. "
                              "Use --path instead.", ctx)

    filename = imprt_asset["path"]
    if not os.path.exists(os.path.abspath(filename)):
        raise RiptideCliError("The path does not exist.", ctx)
    try:
        echo("Downloading file (if neccesary)...")
        with FileProvider(project.folder(), lfs_config) as file_provider:
            downloader = CliFileDownloader(FileDownloader(file_provider.get((filename,))), ctx)
            (filename, *_) = await downloader.download_to_named()
            assert len(_) == 0
            if filename is None:
                return  # Error is already displayed.
            if imprt_asset["settings"]["compression"] == COMPRESSION_GZIP:
                click.echo("Unzipping...")
                try:
                    with tempfile.NamedTemporaryFile(mode='w+b') as f:
                        with gzip.GzipFile(mode='rb', filename=filename) as gzf:
                            f.write(gzf.read())
                        return await importt_impl(ctx, f.name)
                except RiptideCliError:
                    raise
                except Exception as ex:
                    raise RiptideCliError("Error processing the import.", ctx) from ex
            else:
                return await importt_impl(ctx, filename)
    except LfsAuthError as err:
        while True:
            user = prompt(f"Username for {err.url}")
            pw = prompt(f"Password", hide_input=True)
            try:
                lfs_config.set_credentials(user, pw)
                break
            except LfsAuthError:
                pass
        return await import_db_repo(ctx, lfs_config)
    except LfsConfigError as err:
        raise RiptideCliError("Could not download file(s) via Git LFS", ctx) from err


def import_db_path(ctx, file: str):
    return importt_impl(ctx, file)  # ! this is an awaitable
