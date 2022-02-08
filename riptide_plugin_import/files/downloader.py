import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Iterable, List, Callable, Optional

from riptide.engine.results import ResultQueue, MultiResultQueue, ResultError
from riptide_plugin_import.files.download_job import FileDownloadJob, StreamedDownloadJob, FileOnDisk
from riptide_plugin_import.files.lfs.stream import StreamableTransfer

MAX_CONCURRENT = 8


class DownloaderResultError(ResultError):
    def __init__(self, missed_size: int, job: FileDownloadJob, cause: Exception, *args: object, **kwargs: object) -> None:
        self._job = job
        self._missed_size = missed_size
        super().__init__("Download error", None, cause, *args, **kwargs)

    def get_source(self) -> FileDownloadJob:
        return self._job

    def get_missed_file_size(self) -> int:
        return self._missed_size


class FileDownloader:
    def __init__(self, files: Iterable[FileDownloadJob]):
        self.started = False
        self.files = list(files)
        self.total_size = sum([file.size() for file in self.files])
        self._job_cb: Optional[Callable[[FileDownloadJob], None]] = None
        self.pool = ThreadPoolExecutor(MAX_CONCURRENT)

    def __aiter__(self):
        if self.started:
            raise RuntimeError("A downloader can only be used once.")
        self.started = True

        queues = []
        queues_dict = {}
        for i, file in enumerate(self.files):
            q = ResultQueue()
            queues.append(q)
            queues_dict[q] = str(i)
        multi_queue = MultiResultQueue(queues_dict)

        loop = asyncio.get_event_loop()
        for job, queue in zip(self.files, queues):
            loop.run_in_executor(self.pool, self.download_single, job, queue)

        return self._reader(multi_queue)

    def register_callback(self, cb: Callable[[FileDownloadJob], None]):
        self._job_cb = cb

    def download_single(self, job: FileDownloadJob, queue: ResultQueue):
        try:
            if isinstance(job, StreamedDownloadJob):
                self.download_streamed(job, queue)
            elif isinstance(job, FileOnDisk):
                # Nothing to do.
                pass
            else:
                raise RuntimeError("Invalid download job type.")

            if self._job_cb is not None:
                try:
                    self._job_cb(job)
                except Exception as ex:
                    queue.end_with_error(DownloaderResultError(job.get_remaining(), job, ex))
            if isinstance(job, FileOnDisk):
                queue.put(job.size())
            queue.end()
        except BaseException as ex:  # yes even exit exceptions.
            queue.end_with_error(DownloaderResultError(job.get_remaining(), job, ex))
            if not isinstance(ex, Exception):
                raise ex

    def download_streamed(self, job: StreamedDownloadJob, queue: ResultQueue):
        for chunk_len in job.download():
            queue.put(chunk_len)

    async def _reader(self, multi_queue: MultiResultQueue):
        downloaded_size = 0
        finished_downloading = 0
        async for _, new_size_or_err, status in multi_queue:
            if status:
                finished_downloading += 1
                if new_size_or_err:
                    traceback_string = 'Unknown error.'
                    if hasattr(new_size_or_err, 'traceback_string'):
                        traceback_string = new_size_or_err.traceback_string
                    downloaded_size += new_size_or_err.get_missed_file_size()
                    yield finished_downloading, downloaded_size, {
                        "error": new_size_or_err.cause,
                        "source": new_size_or_err.get_source(),
                        "error_traceback": traceback_string
                    }
                else:
                    pass  # no error
            else:
                downloaded_size += new_size_or_err
                yield finished_downloading, downloaded_size, None
