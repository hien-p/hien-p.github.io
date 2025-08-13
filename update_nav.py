#!/usr/bin/env python3
"""
Simple Navigation Updater
Quick script to update navigation when you add new files
"""

import os
import subprocess

def update_navigation():
    """Update navigation using the full generator"""
    print("🔄 Updating navigation...")
    
    # Run the full navigation generator
    result = subprocess.run(["python", "generate_full_nav.py"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Navigation updated successfully!")
        print("💡 Your MkDocs server will auto-reload")
    else:
        print("❌ Error updating navigation:")
        print(result.stderr)

if __name__ == "__main__":
    print("🚀 Quick Navigation Updater")
    print("=" * 30)
    update_navigation()
