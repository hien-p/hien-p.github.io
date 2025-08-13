#!/usr/bin/env python3
"""
Auto Navigation Generator for MkDocs
Automatically generates .pages files and navigation structure
"""

import os
import yaml
import re
from pathlib import Path

def get_markdown_files(directory):
    """Get all markdown files in a directory"""
    md_files = []
    subdirs = []
    
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isfile(item_path) and item.endswith('.md'):
            md_files.append(item)
        elif os.path.isdir(item_path):
            subdirs.append(item)
    
    return sorted(md_files), sorted(subdirs)

def create_pages_file(directory, title=None):
    """Create a .pages file for a directory"""
    md_files, subdirs = get_markdown_files(directory)
    
    pages_content = {
        'title': title or os.path.basename(directory).replace('_', ' ').title(),
        'nav': []
    }
    
    # Add markdown files
    for md_file in md_files:
        if md_file != 'index.md':
            pages_content['nav'].append(md_file)
    
    # Add subdirectories
    for subdir in subdirs:
        pages_content['nav'].append(f"{subdir}/")
    
    # Write .pages file
    pages_file = os.path.join(directory, '.pages')
    with open(pages_file, 'w', encoding='utf-8') as f:
        yaml.dump(pages_content, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    print(f"✅ Created {pages_file}")
    return pages_content

def update_mkdocs_nav():
    """Update mkdocs.yml navigation using regex instead of YAML parsing"""
    collections_dir = "docs/collections"
    
    # Read current mkdocs.yml as text
    with open('mkdocs.yml', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate new nav for collections
    collections_nav = []
    md_files, subdirs = get_markdown_files(collections_dir)
    
    # Add individual markdown files
    for md_file in md_files:
        name = md_file.replace('.md', '').replace('_', ' ').title()
        collections_nav.append(f"    - {name}: collections/{md_file}")
    
    # Add subdirectories
    for subdir in subdirs:
        name = subdir.replace('_', ' ').title()
        collections_nav.append(f"    - {name}: collections/{subdir}/")
    
    # Create the new collections nav section
    new_collections_nav = "  - Collections:\n" + "\n".join(collections_nav)
    
    # Replace the old collections section
    pattern = r'  - Collections:.*?(?=  - |$)'
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, new_collections_nav, content, flags=re.DOTALL)
    else:
        # If no collections section found, add it after Home
        content = content.replace("  - Home: index.md", f"  - Home: index.md\n{new_collections_nav}")
    
    # Write updated mkdocs.yml
    with open('mkdocs.yml', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Updated mkdocs.yml navigation")

def create_watcher_script():
    """Create a script to watch for changes and auto-update navigation"""
    watcher_content = '''#!/usr/bin/env python3
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
        print("\\n🛑 Stopped watching")
    
    observer.join()

if __name__ == "__main__":
    main()
'''
    
    with open('watch_nav.py', 'w', encoding='utf-8') as f:
        f.write(watcher_content)
    
    # Make it executable
    os.chmod('watch_nav.py', 0o755)
    print("✅ Created watch_nav.py (run with: python watch_nav.py)")

def main():
    """Main function"""
    print("🚀 Auto Navigation Generator")
    print("=" * 40)
    
    # Create .pages files for all subdirectories in collections
    collections_dir = "docs/collections"
    
    # Create .pages for main collections directory
    create_pages_file(collections_dir, "Collections")
    
    # Create .pages for subdirectories
    for item in os.listdir(collections_dir):
        item_path = os.path.join(collections_dir, item)
        if os.path.isdir(item_path):
            title = item.replace('_', ' ').title()
            create_pages_file(item_path, title)
    
    # Update mkdocs.yml navigation
    update_mkdocs_nav()
    
    # Create watcher script
    create_watcher_script()
    
    print("\n🎉 Auto navigation generation complete!")
    print("💡 Run 'mkdocs serve' to see the changes")
    print("👀 Run 'python watch_nav.py' to auto-update when you add new files")

if __name__ == "__main__":
    main()
