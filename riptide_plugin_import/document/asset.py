from schema import Schema, Optional, Or

from configcrunch import YamlConfigDocument, DocReference

HEADER = 'asset'
ASSET_TYPE_FILES = 'files'
ASSET_TYPE_DATABASE = 'database'
COMPRESSION_NONE = 'none'
COMPRESSION_GZIP = 'gzip'


class Asset(YamlConfigDocument):
    """
    The definition of an asset to import.

    There are two types:

    - database: Used to define a path in the repository where a file is found that can be imported by the DB driver
                of the current project.

    - files: This defines paths in the repo to folders to import for paths defined in the 'import' entry of the app.
    """
    @classmethod
    def header(cls) -> str:
        return HEADER

    @classmethod
    def schema(cls) -> Schema:
        """
        type: 'database' or 'files'
            Type of the asset definition.

        path: str
            The path in the project (relative to root) where the asset(s) to be imported can be found.

        [ignore_not_exist]: bool
            If false, Riptide will error out if the path does not exist. Otherwise, it will pretend this
            asset definition just wasn't defined at all.

            Default: false

        [settings]: (Only optional if all following keys are optional)

            If ``type == 'database'``:

                [compression]: 'none' or 'gzip'
                    Compression method used for the file.

                    Default: 'none'

            If ``type == 'files'``:

                key: str
                    Key of the "import" entry in the app of the project defined via the riptide.yml.
                    For behaviour if it doesn't exist, see ``ignore_not_exist``.

        """

        common = {
            'path': str,
            Optional('ignore_not_exist'): bool,
        }

        return Schema(Or(
            {'type': ASSET_TYPE_FILES} | common | {'settings': {
                'key': str
            }},
            {'type': ASSET_TYPE_DATABASE} | common | {Optional('settings'): {
                Optional('compression'): Or(COMPRESSION_NONE, COMPRESSION_GZIP)
            }},
        ))

    def _initialize_data_after_merge(self, data: dict) -> dict:
        if 'ignore_not_exist' not in data:
            data['ignore_not_exist'] = False

        if data['type'] == ASSET_TYPE_DATABASE:
            if 'settings' not in data:
                data['settings'] = {}
            if 'compression' not in data['settings']:
                data['settings']['compression'] = COMPRESSION_NONE

        return data

    @classmethod
    def subdocuments(cls):
        return []
