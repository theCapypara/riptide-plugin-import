import os
from typing import TYPE_CHECKING

import click
from click import echo, style
from tornado.web import StaticFileHandler, RedirectHandler

from riptide.plugin.abstract import AbstractPlugin
from riptide_cli.command import CMD_SETUP, CMD_DB_IMPORT, CMD_IMPORT_DB, CMD_IMPORT_FILES, cmd_constraint_has_db, \
    cmd_constraint_has_import
from riptide_cli.helpers import cli_section, async_command, RiptideCliError
from riptide_cli.loader import load_riptide_core, cmd_constraint_project_loaded
from riptide_cli.setup_assistant import setup_assistant, finish
from riptide_plugin_import.cli.db_import import import_db_repo, import_db_path
from riptide_plugin_import.cli.file_import import import_file_list_keys, import_file_repo, import_file_path
from riptide_plugin_import.proxy.handler.web import ProxySetupWebHandler
from riptide_plugin_import.proxy.handler.websocket import ProxySetupWebsocketHandler
from riptide_proxy.abstract_plugin import ProxyServerPlugin
from riptide_proxy.project_loader import RuntimeStorage
from riptide_proxy.server.starter import RiptideNoWebSocketMatcher

if TYPE_CHECKING:
    from riptide.config.document.config import Config
    from riptide.engine.abstract import AbstractEngine


CMD_LEGACY_SETUP = "setup-legacy"


def cmd_constraint_only_one_import_type(repo, path, ctx):
    if repo and path is not None:
        raise RiptideCliError("Only one of --repo or --path <path> must be specified.", ctx)
    elif not repo and path is None:
        raise RiptideCliError("Either --repo or --path <path> must be specified.", ctx)


class ImportPlugin(AbstractPlugin, ProxyServerPlugin):
    def after_load_cli(self, main):
        # noinspection PyUnusedLocal
        @cli_section("Project")
        @main.command(CMD_SETUP)
        @click.pass_context
        @click.option('-f', '--force', is_flag=True, help='Ignored.')
        @click.option('-s', '--skip', is_flag=True, help="Mark project as set up, don't ask any interactive questions")
        def setup(ctx, force, skip):
            """
            Shows the URL for the web-based project setup.
            Guides you through the initial installation of the project
            and through importing already existing project data.

            If you want to use the legacy CLI-based setup wizard (does not support
            all feature), use "setup-legacy" instead.
            """
            load_riptide_core(ctx)
            cmd_constraint_project_loaded(ctx)

            if skip:
                echo("Project was marked as set up.")
                finish(ctx)
                return

            echo(style("Thank you for using Riptide!", fg='cyan', bold=True))

            domain = None
            services = ctx.system_config["project"]["app"]["services"]
            for service in services.values():
                if "port" in service and service["port"] is not None and (domain is None or "main" in service["roles"]):
                    domain = service.domain()

            if domain is None:
                echo("This project does not contain any services accessible via the proxy server. The web-based setup is not available.")
                echo("Please run 'riptide setup-legacy' instead.")
                return
            else:
                echo(f"You can set the project up at:")
                if ctx.system_config["proxy"]["ports"]["https"]:
                    if ctx.system_config["proxy"]["ports"]["https"] == 443:
                        echo(style(f'>>>> https://{domain}/___riptide_setup/', fg='cyan', bold=True))
                    else:
                        echo(style(f'>>>> https://{domain}:{ctx.system_config["proxy"]["ports"]["https"]}/___riptide_setup/', fg='cyan', bold=True))
                else:
                    if ctx.system_config["proxy"]["ports"]["http"] == 80:
                        echo(style(f'>>>> http://{domain}/___riptide_setup/', fg='cyan', bold=True))
                    else:
                        echo(style(f'>>>> http://{domain}:{ctx.system_config["proxy"]["ports"]["http"]}/___riptide_setup/', fg='cyan', bold=True))

            echo("")
            echo("Should you not have access to a modern web-browser or the proxy server, you can use the legacy CLI-based setup via 'riptide setup-legacy',")
            echo("Please note that this does not support all features of the web-based setup.")

        @cli_section("Project")
        @main.command(CMD_LEGACY_SETUP, hidden=True)
        @click.pass_context
        @click.option('-f', '--force', is_flag=True, help='Force setup, even if it was already run.')
        @click.option('-s', '--skip', is_flag=True, help="Mark project as set up, don't ask any interactive questions")
        @async_command()
        async def setup_legacy(ctx, force, skip):
            """
            Run the legacy CLI-based initial interactive project setup.
            Guides you through the initial installation of the project
            and through importing already existing project data.
            """
            load_riptide_core(ctx)
            cmd_constraint_project_loaded(ctx)

            await setup_assistant(ctx, force, skip)

        @cli_section("Database")
        @main.command(CMD_DB_IMPORT)
        @click.option('--repo', is_flag=True, help="Import using the definition in import.riptide.yml.")
        @click.option('--path', metavar="PATH", help="Path to the file to import.")
        @click.pass_context
        @async_command()
        async def db_import(ctx, repo, path):
            """
            Import a database dump into the active environment.

            Specify either --repo to import from the repository (if a configuration in
            import.riptide.yml exists for this) or --path to import from a path.

            The format of the dump depends on the database driver.
            """
            load_riptide_core(ctx)
            cmd_constraint_has_db(ctx)
            cmd_constraint_only_one_import_type(repo, path, ctx)

            if repo:
                await import_db_repo(ctx)
            else:
                await import_db_path(ctx, path)

        @cli_section("Import")
        @main.command(CMD_IMPORT_DB)
        @click.option('--repo', is_flag=True, help="Import using the definition in import.riptide.yml.")
        @click.option('--path', metavar="PATH", help="Path to the file to import.")
        @click.pass_context
        @async_command()
        async def import_db(ctx, repo, path):
            """ Alias for db:import """
            load_riptide_core(ctx)
            cmd_constraint_has_db(ctx)
            cmd_constraint_only_one_import_type(repo, path, ctx)

            if repo:
                await import_db_repo(ctx)
            else:
                await import_db_path(ctx, path)

        @cli_section("Import")
        @main.command(CMD_IMPORT_FILES)
        @click.argument("key", required=False)
        @click.option('--repo', is_flag=True, help="Import using the definition in import.riptide.yml.")
        @click.option('--path', metavar="PATH", help="Path to the file to import.")
        @click.pass_context
        @async_command()
        async def import_files(ctx, key, repo, path):
            """
            Imports file(s).
            To import specify a key to import (run command without arguments to list all available keys).

            Then specify either --repo to import from the repository (if a configuration in
            import.riptide.yml exists for this) or --path to import from a path.

            If the target already exists and isn't a directory, copying will fail.
            If the target directory already exists, existing files will not be removed.
            """
            load_riptide_core(ctx)
            cmd_constraint_has_import(ctx)

            if not key:
                return import_file_list_keys(ctx)

            cmd_constraint_only_one_import_type(repo, path, ctx)

            app = ctx.system_config["project"]["app"]
            if "import" not in app or app["import"] == {} or key not in app["import"]:
                raise RiptideCliError(f"No import specification for key '{key}' found.", ctx)

            if repo:
                await import_file_repo(ctx, key)
            else:
                import_file_path(ctx, key, path)

    def get_routes(self, config: 'Config', runtime_storage: RuntimeStorage):
        storage = {
            "config": config,
            "runtime_storage": runtime_storage
        }
        return [
            (r"/___riptide_setup", RedirectHandler, {"url": "/___riptide_setup/"}),
            (RiptideNoWebSocketMatcher(r'^/___riptide_setup/wizard-dist/(.*)$'), StaticFileHandler, {
                "path": os.path.realpath(os.path.join(os.path.dirname(__file__), 'tpl', 'wizard-dist'))
            }),
            (RiptideNoWebSocketMatcher(r'/___riptide_setup/'), ProxySetupWebHandler, storage),
            (r'/___riptide_setup/', ProxySetupWebsocketHandler, storage),
        ]

    def after_load_engine(self, engine: 'AbstractEngine'):
        pass  # not used

    def after_reload_config(self, config: 'Config'):
        pass  # not used

    def get_flag_value(self, config: 'Config', flag_name: str) -> any:
        # This plugin does not use flags.
        return None
