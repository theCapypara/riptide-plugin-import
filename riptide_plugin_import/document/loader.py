import os
from typing import Optional

from configcrunch import load_multiple_yml
from riptide.config import repositories
from riptide.config.document.app import App
from riptide.config.document.project import Project
from riptide_plugin_import.document.asset import Asset, ASSET_TYPE_FILES, ASSET_TYPE_DATABASE
from riptide_plugin_import.document.config import ImportConfig
IMPORT_PROJECT_FILENAME = "import.riptide.yml"
LOCAL_IMPORT_PROJECT_FILENAME = "import.riptide.local.yml"


def load_import_config(project: Project) -> Optional[ImportConfig]:
    """
    Loads the import config for the project (if it exists, otherwise None is returned):
    """
    import_path = os.path.join(project.folder(), IMPORT_PROJECT_FILENAME)
    if not os.path.exists(import_path):
        return None

    local_path = os.path.join(project.folder(), LOCAL_IMPORT_PROJECT_FILENAME)

    repos = repositories.collect(project.parent_doc)

    import_config = None
    try:
        if os.path.exists(local_path):
            import_config = load_multiple_yml(ImportConfig, import_path, local_path)
        else:
            import_config = load_multiple_yml(ImportConfig, import_path)

        import_config.resolve_and_merge_references(repos)

        import_config.process_vars()

        import_config.validate()
        import_config.freeze()
    except FileNotFoundError:
        pass

    return import_config


def search_file_asset(import_config: ImportConfig, app: App, key: str) -> Optional[Asset]:
    """
    Returns an asset from the riptide.import.yml project, that has the files type,
    is for the provided key and that key also exists in the app "imports". Otherwise
    returns None.
    """
    if "import" not in app or app["import"] == {} or key not in app["import"]:
        return None

    for asset in import_config["assets"]:
        if asset["type"] == ASSET_TYPE_FILES and asset["settings"]["key"] == key:
            return asset
    return None


def search_db_asset(import_config: ImportConfig) -> Optional[Asset]:
    """
    Returns an asset from the riptide.import.yml that has the database type,
    if none is defined, None is returned.
    """
    for asset in import_config["assets"]:
        if asset["type"] == ASSET_TYPE_DATABASE:
            return asset
    return None
