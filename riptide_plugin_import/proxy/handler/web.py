import logging
import os
from typing import Optional, Any

import tornado.web
import tornado.template
import traceback

from riptide.config.document.config import Config
from riptide.config.document.project import Project
from riptide_plugin_import import LOGGER_NAME
from riptide_plugin_import.document.config import ImportConfig
from riptide_plugin_import.document.loader import load_import_config
from riptide_proxy.project_loader import resolve_project, RuntimeStorage, ResolveStatus

logger = logging.getLogger(LOGGER_NAME)
MAGIC_IMPORT_STR = "import::"


class ImportTemplateLoader(tornado.template.Loader):
    def __init__(self, proxy_root_directory: str, import_plugin_root_directory: str, *, is_for_import=False, **kwargs: Any) -> None:
        self.proxy_root_directory = proxy_root_directory
        self.import_plugin_root_directory = import_plugin_root_directory
        super().__init__(self.proxy_root_directory if not is_for_import else self.import_plugin_root_directory, **kwargs)

    def load(self, name: str, parent_path: Optional[str] = None):
        if name.startswith(MAGIC_IMPORT_STR):
            return ImportTemplateLoader(
                self.proxy_root_directory,
                self.import_plugin_root_directory,
                is_for_import=True
            ).load(name[len(MAGIC_IMPORT_STR):], None)
        try:
            return super().load(name, parent_path)
        except FileNotFoundError:
            if self.root != self.proxy_root_directory:
                self.root = self.proxy_root_directory
                return super().load(name, parent_path)
            else:
                raise


class ProxySetupWebHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, config: Config, runtime_storage: RuntimeStorage, **kwargs):
        """
        HTTP handler. Provides the setup pages.
        """
        super().__init__(application, request, **kwargs)
        self.config = config['proxy']
        self.runtime_storage = runtime_storage

    def compute_etag(self):
        return None  # disable tornado Etag

    def create_template_loader(self, template_path: str) -> tornado.template.BaseLoader:
        return ImportTemplateLoader(template_path, os.path.realpath(os.path.join(os.path.dirname(__file__), '..', '..', 'tpl')))

    async def get(self):
        try:
            rc, data = resolve_project(self.request.host, self.config["url"],
                                       self.runtime_storage, self.config['autostart'])

            if rc == ResolveStatus.SUCCESS or rc == ResolveStatus.NOT_STARTED or rc == ResolveStatus.NOT_STARTED_AUTOSTART:
                project, _ = data
                return self.pp_setup(project, load_import_config(project))
            else:
                return self.pp_not_found()
        except Exception as err:
            # Unknown error happened, tell the user.
            self.pp_500(err, traceback.format_exc())
            return

    def pp_500(self, err, trace, log_exception=True):
        """ Display a generic error page """
        self.set_status(500)
        if log_exception:
            logger.exception(err)
        self.render("pp_500.html", title="Riptide Proxy - 500 Internal Server Error", trace=trace, err=err, base_url=self.config["url"])

    def pp_setup(self, project: Project, import_config: Optional[ImportConfig]):
        """ Show the setup page """
        self.set_status(200)
        self.render(
            "import::pp_setup.html", title="Riptide Proxy - Project Setup",
            project=project, import_config=import_config, base_url=self.config["url"],
            url=self.request.full_url()
        )

    def pp_not_found(self):
        """ Inform the user, that the requested project was not found, and display a list of all projects. """
        self.set_status(400)
        self.render("import::pp_notfound.html", title="Riptide Proxy - Not Found",
                    base_url=self.config["url"])
