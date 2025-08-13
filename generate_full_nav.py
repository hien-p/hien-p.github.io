#!/usr/bin/env python3
"""
Generate Full Navigation for MkDocs
Creates complete navigation structure for all markdown files
"""

import os
import yaml
import re

def scan_directory(directory):
    """Scan directory and return all markdown files and subdirectories"""
    items = []
    
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isfile(item_path) and item.endswith('.md'):
            items.append((item, 'file', item_path))
        elif os.path.isdir(item_path):
            items.append((item, 'dir', item_path))
    
    return sorted(items)

def generate_nav_for_directory(directory, base_path=""):
    """Generate navigation for a directory"""
    items = scan_directory(directory)
    nav_items = []
    
    for item, item_type, item_path in items:
        if item_type == 'file':
            if item == 'index.md':
                continue  # Skip index files as they're handled by directory
            name = item.replace('.md', '').replace('_', ' ').title()
            nav_items.append({name: f"{base_path}{item}"})
        elif item_type == 'dir':
            name = item.replace('_', ' ').title()
            sub_nav = generate_nav_for_directory(item_path, f"{base_path}{item}/")
            if sub_nav:
                nav_items.append({name: sub_nav})
            else:
                nav_items.append({name: f"{base_path}{item}/"})
    
    return nav_items

def update_mkdocs_nav():
    """Update mkdocs.yml with complete navigation"""
    # Read current mkdocs.yml
    with open('mkdocs.yml', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate collections navigation
    collections_nav = generate_nav_for_directory('docs/collections', 'collections/')
    
    # Generate VBI Academy navigation
    vbi_nav = generate_nav_for_directory('docs/What_I_learned_from_VBI_Academy', 'What_I_learned_from_VBI_Academy/')
    
    # Generate Vibe Coding navigation
    vibe_nav = generate_nav_for_directory('docs/vibe_coding', 'vibe_coding/')
    
    # Generate Weminal navigation
    weminal_nav = generate_nav_for_directory('docs/weminal', 'weminal/')
    
    # Create new navigation structure
    new_nav = {
        'nav': [
            {'Home': 'index.md'},
            {'Collections': collections_nav},
            {'VBI Academy': vbi_nav},
            {'Vibe Coding': vibe_nav},
            {'Weminal': weminal_nav}
        ]
    }
    
    # Convert to YAML string
    nav_yaml = yaml.dump(new_nav, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    # Replace the nav section in mkdocs.yml
    nav_pattern = r'# Navigation structure\nnav:.*?(?=\n# |\n$|$)'
    new_nav_section = f"# Navigation structure\n{nav_yaml}"
    
    if re.search(nav_pattern, content, re.DOTALL):
        content = re.sub(nav_pattern, new_nav_section, content, flags=re.DOTALL)
    else:
        # If no nav section found, add it after site_author
        content = content.replace("site_author: Harry Phan", f"site_author: Harry Phan\n\n{new_nav_section}")
    
    # Write updated mkdocs.yml
    with open('mkdocs.yml', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Updated mkdocs.yml with complete navigation")

def main():
    """Main function"""
    print("🚀 Generating Complete Navigation")
    print("=" * 40)
    
    update_mkdocs_nav()
    
    print("\n🎉 Navigation generation complete!")
    print("💡 Run 'mkdocs serve' to see all your content")

if __name__ == "__main__":
    main()
