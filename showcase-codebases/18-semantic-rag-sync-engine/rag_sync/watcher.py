"""
File Watcher Daemon — Monitors document changes for incremental re-indexing.
"""
from __future__ import annotations
import os
import time
import logging
from typing import Callable, Optional

logger = logging.getLogger("rag-sync.watcher")

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler, FileSystemEvent
    HAS_WATCHDOG = True
except ImportError:
    HAS_WATCHDOG = False

class DocWatcher:
    """
    Watches a target directory for document creations, modifications, and deletions.
    Triggers callback on detected changes.
    """

    def __init__(self, watch_dir: str, callback: Callable[[str, str], None]):
        self.watch_dir = os.path.abspath(watch_dir)
        self.callback = callback
        self._observer = None

    def start(self):
        if not HAS_WATCHDOG:
            logger.info("Watchdog not installed. Running in manual notification mode.")
            return

        class Handler(FileSystemEventHandler):
            def __init__(outer):
                self.outer = outer

            def on_modified(self, event: FileSystemEvent):
                if not event.is_directory and self._is_target(event.src_path):
                    self.outer.callback("modified", event.src_path)

            def on_created(self, event: FileSystemEvent):
                if not event.is_directory and self._is_target(event.src_path):
                    self.outer.callback("created", event.src_path)

            def on_deleted(self, event: FileSystemEvent):
                if not event.is_directory and self._is_target(event.src_path):
                    self.outer.callback("deleted", event.src_path)

            def _is_target(self, path: str) -> bool:
                return path.endswith((".md", ".txt", ".json", ".rst"))

        handler = Handler()
        self._observer = Observer()
        self._observer.schedule(handler, path=self.watch_dir, recursive=True)
        self._observer.start()
        logger.info(f"Started DocWatcher daemon on: {self.watch_dir}")

    def stop(self):
        if self._observer:
            self._observer.stop()
            self._observer.join()
            logger.info("DocWatcher daemon stopped.")
