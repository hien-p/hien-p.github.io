#!/usr/bin/env python3
"""
File Watcher for Auto Navigation
Automatically updates navigation when files change
"""

import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

class NavigationHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_update = 0
        self.debounce_time = 2  # seconds
    
    def on_created(self, event):
        if event.is_directory or not event.src_path.endswith('.md'):
            return
        self.debounced_update()
    
    def on_modified(self, event):
        if event.is_directory or not event.src_path.endswith('.md'):
            return
        self.debounced_update()
    
    def on_deleted(self, event):
        if event.is_directory or not event.src_path.endswith('.md'):
            return
        self.debounced_update()
    
    def debounced_update(self):
        current_time = time.time()
        if current_time - self.last_update > self.debounce_time:
            self.last_update = current_time
            print(f"🔄 File changed, updating navigation...")
            subprocess.run(["python", "auto_nav.py"])

def main():
    event_handler = NavigationHandler()
    observer = Observer()
    observer.schedule(event_handler, "docs/collections", recursive=True)
    observer.start()
    
    print("👀 Watching for changes in docs/collections/...")
    print("Press Ctrl+C to stop")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n🛑 Stopped watching")
    
    observer.join()

if __name__ == "__main__":
    main()
