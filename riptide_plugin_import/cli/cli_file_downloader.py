import os
from typing import Sequence, Callable, Optional

from click import echo, style
from tqdm import tqdm

from riptide_cli.helpers import get_is_verbose, TAB, RiptideCliError
from riptide_plugin_import.files.download_job import FileDownloadJob
from riptide_plugin_import.files.downloader import FileDownloader

class CliFileDownloader:
    def __init__(self, downloader: FileDownloader, ctx):
        self.downloader = downloader
        self.ctx = ctx

    async def download_to_named(self) -> Sequence[Optional[str]]:
        filenames = {f: None for f in self.downloader.files}
        await self.download_and_do(lambda f: filenames.__setitem__(f, f.filename()))
        return list(filenames.values())

    async def download_and_do(self, cb: Callable[[FileDownloadJob], None]):
        with tqdm(
            total=self.downloader.total_size,
            unit_scale=True,
            unit='b',
            bar_format="{n_fmt}/{total_fmt} {percentage:2.0f}% |{bar}| {rate_fmt} - {remaining}"
        ) as progress_bar:
            errors = []

            self.downloader.register_callback(cb)

            try:
                async for _, downloaded_size, err in self.downloader:
                    self._handle_progress_bar(downloaded_size, err, progress_bar, errors)
            except Exception as err:
                raise RiptideCliError("Critical download error", self.ctx) from err

        if len(errors) > 0:
            self._display_errors(errors)
        else:
            echo(style("Copying successful.", fg='green'))

    def _display_errors(self, errors):
        echo(style("There were errors copying some files: ", fg='red', bold=True))
        for error in errors:
            err = error["error"]
            echo(" - " + style(
                f'{error["source_file"]}: ',
                bold=True, fg='red') + style(
                f'{type(err).__name__}: {err}',
                fg='red')
             )
            if get_is_verbose(self.ctx):
                echo(style(str(error["error_traceback"]), bg='red'))

    def _handle_progress_bar(self, downloaded_size: int, err, progress_bar: tqdm, errors):
        """Handles progress bar updates"""
        if err:
            errors.append({
                "error_traceback": err["error_traceback"],
                "source_file": err["source"].source_filename(),
                "error": err["error"],
            })
        else:
            # Update increments, so when calling this we need to subtract the current n to get the delta
            progress_bar.update(downloaded_size - progress_bar.n)
            progress_bar.refresh()
