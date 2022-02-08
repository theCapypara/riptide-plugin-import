import os.path
import tempfile
import uuid
from typing import Optional, Iterable

from riptide_plugin_import.files.download_job import FileDownloadJob
from riptide_plugin_import.files.lfs import LFS_HEADER_START
from riptide_plugin_import.files.lfs.resolver import LfsConfig


class FileProvider:
    """
    A file provider for the given directory.
    Files in it can be requested. If a file is a Git LFS metadata file, it is downloaded to a temp
    path and that temp path is returned, the directory with the temp files is deleted after the context manager.
    Pass in is_lfs to skip the automatic check and proceed with the appropriate action.

    For all file retrieving methods of the provider:
        An LfsAuthError is raised if LFS authentication failed.
        An LfsConfigError is raised on other LFS issues.
    """
    def __init__(self, project_root: str, lfs_config: Optional[LfsConfig]):
        self.project_root = project_root
        self.lfs_config = lfs_config
        self._tempdir: Optional[tempfile.TemporaryDirectory] = None

    def __enter__(self):
        self._tempdir = tempfile.TemporaryDirectory()
        return self

    def __exit__(self, type, value, traceback):
        try:
            self._tempdir.cleanup()
        finally:
            self._tempdir = None

    def get(self, paths: Iterable[str]) -> Iterable[FileDownloadJob]:
        """
        Returns files within the directory as a FileDownloadJob. See class doc for more info.
        If lfs_config is None and the original file path is always returned.

        An LfsAuthError is raised if LFS authentication failed.
        An LfsConfigError is raised on other LFS issues.

        All file paths must be inside of self.project_root.

        The context provided by this class MUST NOT be exited before the (potential) request in DownloadFile
        is finished / aborted etc. After the context files returned by this method may or me not be valid anymore.
        """
        if self._tempdir is None:
            raise RuntimeError("Must be used as a context manager.")
        for path in [self._path_in_dir(x) for x in paths]:
            if self._check_is_lfs(path):
                yield FileDownloadJob.from_stream(
                    path,
                    os.path.join(self._tempdir.name, str(uuid.uuid4())),
                    self.lfs_config.get_stream(path)
                )
            else:
                yield FileDownloadJob.from_disk(path)

    def _path_in_dir(self, relative_asset_file_path):
        p = os.path.abspath(os.path.join(self.project_root, relative_asset_file_path))
        if not p.startswith(os.path.abspath(self.project_root)):
            raise ValueError(f"The file {p} must be within the project.")
        return p

    def _check_is_lfs(self, source_fp: str):
        if self.lfs_config is None:
            return False

        with open(source_fp, 'rb') as f:
            return f.read(len(LFS_HEADER_START)) == LFS_HEADER_START
