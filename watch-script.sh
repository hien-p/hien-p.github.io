#!/bin/bash

# Watch script for selective MkDocs rebuilding
# Uses entr for efficient file watching

set -e

echo "👀 Setting up selective file watching..."

# Check if entr is installed
if ! command -v entr &> /dev/null; then
    echo "📦 Installing entr..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install entr
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y entr
    else
        echo "❌ Please install entr manually for your OS"
        exit 1
    fi
fi

# Function to watch markdown files
watch_markdown() {
    echo "📝 Watching markdown files..."
    find docs -name "*.md" | entr -r bash -c '
        echo "🔄 Rebuilding changed markdown files..."
        mkdocs build --dirty-reload --no-strict
        echo "✅ Rebuild complete"
    '
}

# Function to watch CSS files
watch_css() {
    echo "🎨 Watching CSS files..."
    find docs/css -name "*.css" | entr -r bash -c '
        echo "🔄 Rebuilding due to CSS changes..."
        mkdocs build --dirty-reload --no-strict
        echo "✅ Rebuild complete"
    '
}

# Function to watch config files
watch_config() {
    echo "⚙️  Watching config files..."
    echo "mkdocs.yml" | entr -r bash -c '
        echo "🔄 Full rebuild due to config changes..."
        mkdocs build --clean --no-strict
        echo "✅ Full rebuild complete"
    '
}

# Start watching in parallel
echo "🚀 Starting file watchers..."
watch_markdown &
watch_css &
watch_config &

# Wait for all background processes
wait
