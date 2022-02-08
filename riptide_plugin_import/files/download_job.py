import os.path
from abc import ABC, abstractmethod

import requests.exceptions

from riptide_plugin_import.files.lfs.stream import StreamableTransfer


class FileDownloadJob(ABC):
    @classmethod
    def from_stream(cls, source_fn: str, out_fn: str, stream: StreamableTransfer):
        return StreamedDownloadJob(source_fn, out_fn, stream)

    @classmethod
    def from_disk(cls, fn: str):
        return FileOnDisk(fn)

    @abstractmethod
    def size(self) -> int: ...

    @abstractmethod
    def filename(self) -> str: ...

    @abstractmethod
    def source_filename(self) -> str: ...

    @abstractmethod
    def get_remaining(self) -> int: ...


class FileOnDisk(FileDownloadJob):

    def __init__(self, filename: str):
        self._filename = filename

    def size(self):
        return os.path.getsize(self._filename)

    def filename(self) -> str:
        return self._filename

    def source_filename(self) -> str:
        return self._filename

    def get_remaining(self) -> int:
        return self.size()

    def __str__(self):
        return f'<{self.filename()}>'


class StreamedDownloadJob(FileDownloadJob):
    def __init__(self, source_filename: str, output_filename: str, stream: StreamableTransfer):
        self._output_filename = output_filename
        self._source_filename = source_filename
        self._stream = stream
        self._remaining = stream.size

    def size(self):
        return self._stream.size

    def filename(self) -> str:
        return self._output_filename

    def source_filename(self) -> str:
        return self._source_filename

    def get_remaining(self) -> int:
        return self._remaining

    def download(self):
        downloaded = 0
        chunk_exc_counter = 0
        with open(self.filename(), 'wb') as file_obj:
            while True:
                try:
                    if downloaded == 0:
                        ctx = self._stream.start_download()
                    else:
                        ctx = self._stream.resume_download(downloaded)
                    with ctx as response:
                        for chunk in response.iter_content(1024 * 16):
                            downloaded += len(chunk)
                            self._remaining -= len(chunk)
                            file_obj.write(chunk)
                            yield len(chunk)
                        file_obj.flush()
                        return
                except requests.exceptions.ReadTimeout:
                    continue
                except requests.exceptions.ChunkedEncodingError as ex:
                    chunk_exc_counter += 1
                    if chunk_exc_counter > 5:
                        raise ex
                except requests.exceptions.ConnectionError as ex:  # because what is consistency anyway
                    if "Read timed out." in str(ex):  # todo: No better way?
                        continue
                    raise ex

    def __str__(self):
        return f'<{self._source_filename}@{self._stream.url}>'
