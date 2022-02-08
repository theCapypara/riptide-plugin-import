import os
import warnings
from configparser import NoOptionError
from typing import Optional, Tuple
from urllib.parse import urlparse

from giftless_client import LfsClient, LfsError
from git import Repo
from git_credentials import GitCredentialDescription, GitCredentials, GitCredentialError, GitCredentialNotStoredError

from riptide_plugin_import.files.lfs.stream import StreamedTransfer, LazyStreamedTransfer, StreamableTransfer


class LfsConfigError(Exception):
    """An error configuring or using Lfs"""


class LfsGitError(LfsConfigError):
    """An error invoking or communicating with Git"""


class LfsAuthError(LfsConfigError):
    """
    LFS authentication failed.
    The context / causing exception contains more information on the error.
    If 'informative' is True, the error message contains a warning detailing why
    it failed that might be interesting for the user. Otherwise, you can assume that either
    the credential helper did just not provide a password or that the provided password was invalid.
    """
    def __init__(self, *args, informative=False, url: Optional[str] = None):
        self.informative = informative
        self.url = url
        super().__init__(args)


class LfsConfig:
    """Lfs configuration and management."""
    def __init__(self, repository_root: str):
        self.repository_root = repository_root
        self._cached_credentials: Optional[Tuple[str, str]] = None
        self._cached_url: Optional[str] = None
        self._git_repo: Repo = Repo(repository_root)
        self._credentials = GitCredentials(repository_root)

    def try_auth(self):
        """Returns nothing on success, raises LfsAuthError otherwise."""
        try:
            self._try_get_and_cache_credentials()
        except LfsAuthError:
            raise
        except LfsGitError as err:
            raise LfsAuthError(
                "There was an error communicating with Git to read the credentials.",
                informative=True
            ) from err

    def set_credentials(self, user: str, pw: str):
        self._try_store_credentials(user, pw)
        self._cached_credentials = (user, pw)

    def get_stream(self, relative_asset_file_path: str) -> StreamableTransfer:
        """
        May raise LfsAuthError on auth failures or other errors on file/network IO errors.
        Returns a streamed requests.Response.
        """
        self.try_auth()
        try:
            client = LfsClient(
                lfs_server_url=self.get_lfs_url(),
                basic_auth=self._try_get_and_cache_credentials(),
                transfer_adapters=['basic']
            )
            adapter = StreamedTransfer()
            client.TRANSFER_ADAPTERS = {'basic': adapter}
            oid, size = self.get_asset_info(relative_asset_file_path)
            return LazyStreamedTransfer(client, adapter, oid, size)

        except LfsError as e:
            raise LfsConfigError("Error running a Git LFS download request.") from e

    def get_lfs_url(self) -> str:
        if not self._cached_url:
            self._cached_url = self._cache_lfs_url()
        return self._cached_url

    def _cache_lfs_url(self) -> str:
        config_reader = self._git_repo.config_reader()
        lfsconfig = os.path.join(self.repository_root, ".lfsconfig")
        if os.path.exists(lfsconfig):
            with open(lfsconfig, 'rb') as f:
                config_reader.read_file(f)
        try:
            return config_reader.get("lfs", "url")
        except NoOptionError:
            try:
                repo_url = config_reader.get('remote "origin"', "url")
                if repo_url.startswith("http"):
                    return repo_url.rstrip("/") + "/info/lfs"
            except NoOptionError:
                pass
            raise LfsConfigError("Was unable to determine the URL of the Git LFS server. "
                                 "Try specifying lfs.url in your git repository.")

    def _try_store_credentials(self, user: str, pw: str):
        url_raw = self.get_lfs_url()
        url = urlparse(url_raw)
        try:
            # test
            LfsClient(
                lfs_server_url=url_raw,
                basic_auth=(user, pw),
                transfer_adapters=['basic']
            ).list_locks(limit=1)
        except LfsError as e:
            if e.status_code == 404:
                # This is OK, the server just doesn't support locks.
                pass
            elif e.status_code == 401:
                # PW DID NOT WORK
                try:
                    self._credentials.reject(GitCredentialDescription(
                        protocol=url.scheme,
                        host=url.hostname,
                        path=url.path,
                        username=user,
                        password=pw
                    ))
                except GitCredentialError as e2:
                    # We ignore rejection errors.
                    warnings.warn(f"Riptide LFS: Failed telling 'git-credentials' to reject pw: {type(e2)}: {e2}")
                raise LfsAuthError("Failed to authenticate.", url=url_raw) from e
            else:
                raise LfsGitError("Failed to communicate with the LFS server") from e
        # PW WORKED
        self._cached_credentials = (user, pw)
        try:
            self._credentials.approve(GitCredentialDescription(
                protocol=url.scheme,
                host=url.hostname,
                path=url.path,
                username=user,
                password=pw
            ))
        except GitCredentialError as e:
            # We ignore approval errors.
            warnings.warn(f"Riptide LFS: Failed telling 'git-credentials' to approve pw: {type(e)}: {e}")

    def _try_get_and_cache_credentials(self) -> Tuple[str, str]:
        if self._cached_credentials:
            return self._cached_credentials
        url_raw = self.get_lfs_url()
        url = urlparse(url_raw)
        # Build a credential request:
        try:
            fill = self._credentials.fill(GitCredentialDescription(
                protocol=url.scheme,
                host=url.hostname,
                path=url.path
            ))
            self._try_store_credentials(fill.username, fill.password)
        except GitCredentialNotStoredError as e:
            raise LfsAuthError("The password was not stored.", url=url_raw) from e
        except GitCredentialError as e:
            raise LfsGitError("Failed invoking Git.") from e

    @staticmethod
    def get_asset_info(relative_asset_file_path: str) -> Tuple[str, int]:
        with open(relative_asset_file_path) as f:
            obj = {}
            for line in f.readlines():
                line = line.strip()
                if len(line) > 0:
                    k, v = line.split(" ")
                obj[k] = v
            assert 'oid' in obj
            assert obj['oid'].startswith('sha256:')
            return obj['oid'][7:], int(obj['size'])
