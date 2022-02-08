from abc import abstractmethod
from typing import Optional, Protocol

import requests
from giftless_client import LfsClient
from giftless_client.types import DownloadObjectAttributes
from requests import Response


class StreamableTransfer(Protocol):
    size: int
    url: str
    @abstractmethod
    def start_download(self) -> Response: ...
    @abstractmethod
    def resume_download(self, start_at: int) -> Response: ...


class StreamedTransfer(StreamableTransfer):
    def __init__(self):
        self.download_request: Optional[DownloadObjectAttributes] = None
        self.size: Optional[int] = None
        self.url = '???'

    def __call__(self, *args, **kwargs):
        return self

    def upload(self, _, upload_spec):
        raise NotImplementedError("Upload not supported.")

    def download(self, _, download_spec: DownloadObjectAttributes):
        self.download_request = download_spec
        self.url = self.download_request['actions']['download']['href']
        self.size = download_spec['size']

    def start_download(self) -> Response:
        dl_action = self.download_request['actions']['download']
        return requests.get(
            dl_action['href'],
            headers=dl_action.get('header', {}),
            stream=True,
            timeout=2,
        )

    def resume_download(self, start_at: int) -> Response:
        dl_action = self.download_request['actions']['download']
        headers = dl_action.get('header', {}) | {'Range': f'bytes={start_at}-'}
        return requests.get(
            dl_action['href'],
            headers=headers,
            stream=True,
            timeout=2,
        )


class LazyStreamedTransfer(StreamableTransfer):
    def __init__(self, client: LfsClient, adapter: StreamedTransfer, oid: str, size: int):
        self._client = client
        self._adapter = adapter
        self.oid = oid
        self.size = size

    @property
    def url(self):
        return self._adapter.url

    def start_download(self) -> Response:
        # Our custom adapter returns immediately.
        self._client.download(None, self.oid, self.size, None, None)  # type: ignore
        return self._adapter.start_download()

    def resume_download(self, start_at: int) -> Response:
        return self._adapter.resume_download(start_at)
