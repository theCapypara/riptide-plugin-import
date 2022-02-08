import os
import shutil
from functools import partial
from pathlib import Path
from typing import Optional, Iterable

import click
from click import echo, prompt

from riptide.config.document.app import App
from riptide.config.document.project import Project
from riptide_cli.command import files_impl
from riptide_cli.helpers import RiptideCliError, TAB
from riptide_plugin_import.cli.cli_file_downloader import CliFileDownloader
from riptide_plugin_import.document.loader import load_import_config, search_file_asset
from riptide_plugin_import.files.download_job import FileDownloadJob
from riptide_plugin_import.files.downloader import FileDownloader
from riptide_plugin_import.files.lfs.resolver import LfsConfig, LfsAuthError, LfsConfigError
from riptide_plugin_import.files.provider import FileProvider


def import_file_list_keys(ctx):
    app: App = ctx.system_config["project"]["app"]
    import_project = load_import_config(ctx.system_config["project"])
    if "import" not in app or app["import"] == {}:
        click.echo("The project does not define any imports.")
    else:
        click.echo("The following import targets are defined:")
        for key, data in app["import"].items():
            can_be_repo = ""
            if search_file_asset(import_project, app, key):
                can_be_repo = " - Can be imported via --repo."
            click.echo(TAB + "- " + click.style(key, bold=True) + ": " +
                       data["name"] + " - Imported to: " +
                       click.style(data["target"], bold=True) + can_be_repo)


async def import_file_repo(ctx, key: str, lfs_config: Optional[LfsConfig] = None):
    project: Project = ctx.system_config["project"]
    import_project = load_import_config(project)
    app = project["app"]
    proje_asset = app["import"][key]
    imprt_asset = search_file_asset(import_project, app, key)
    if lfs_config is None:
        lfs_config = LfsConfig(project.folder())
    if imprt_asset is None:
        raise RiptideCliError("There is no import.riptide.yml asset configured for this import "
                              "specification. Use --path instead.", ctx)
    filename = imprt_asset["path"]
    if not os.path.exists(os.path.abspath(filename)):
        raise RiptideCliError("The path does not exist.", ctx)
    try:
        echo("Calculating file sizes (this may take a while)...")
        with FileProvider(project.folder(), lfs_config) as file_provider:
            abs_filename = os.path.abspath(os.path.join(project.folder(), filename))
            was_single_file = not os.path.isdir(abs_filename)
            if was_single_file:
                downloader = CliFileDownloader(FileDownloader(file_provider.get((filename,))), ctx)
            else:
                downloader = CliFileDownloader(FileDownloader(file_provider.get(_collect_all_files(abs_filename))), ctx)
            echo("Downloading files (if necessary)...")
            abs_target = os.path.abspath(os.path.join(project.folder(), proje_asset["target"]))
            await downloader.download_and_do(partial(_move_file, was_single_file, abs_filename, abs_target))
            echo("Done! :)")
    except LfsAuthError as err:
        while True:
            user = prompt(f"Username for {err.url}")
            pw = prompt(f"Password", hide_input=True)
            try:
                lfs_config.set_credentials(user, pw)
                break
            except LfsAuthError:
                pass
        return await import_file_repo(ctx, key, lfs_config)
    except LfsConfigError as err:
        raise RiptideCliError("Could not download file(s) via Git LFS", ctx) from err


def _move_file(is_single_file: bool, source_path: str, dest_path: str, job: FileDownloadJob):
    if is_single_file:
        assert job.source_filename() == source_path
        copy_to = dest_path
    else:
        assert job.source_filename().startswith(source_path)
        rel_path = job.source_filename()[len(source_path):]
        if rel_path.startswith('/') or rel_path.startswith('\\'):
            rel_path = rel_path[1:]
        copy_to = os.path.join(dest_path, rel_path)
    shutil.move(job.filename(), copy_to)


def _collect_all_files(dir_name: str) -> Iterable[str]:
    return (str(x) for x in Path(dir_name).rglob('*') if not x.is_dir())


def import_file_path(ctx, key: str, path: str):
    files_impl(ctx, key, path)
