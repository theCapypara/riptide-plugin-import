from schema import Schema, Optional, Or

from configcrunch import YamlConfigDocument, DocReference
from riptide_plugin_import.document.asset import Asset

HEADER = 'riptide_import'


class ImportConfig(YamlConfigDocument):
    """
    The import.riptide.yml contains a list of assets.
    You can also extend it with an import.riptide.local.yml next to the file and
    reference documents from the repositories, like with other Riptide entities.
    """
    @classmethod
    def header(cls) -> str:
        return HEADER

    @classmethod
    def schema(cls) -> Schema:
        """
        [assets]
            {key}: :class:`~riptide_plugin_import.document.config.ImportConfig`
                Assets that can be imported.
        """
        return Schema(
            {
                Optional('assets'): [DocReference(Asset)],
            }
        )

    @classmethod
    def subdocuments(cls):
        return [
            ("assets[]", Asset),
        ]
