#!/bin/bash

# Fast Development Script with Dirty Reload and Live Reload
# Optimized for Kubernetes + Skaffold workflow

set -e

echo "🚀 Starting Fast MkDocs Development Server..."

# Kill any existing mkdocs processes
echo "🔄 Cleaning up existing processes..."
pkill -f "mkdocs serve" || true

# Clear caches for faster startup
echo "🧹 Clearing caches..."
rm -rf .cache/ .mkdocs_cache/ site/

# Install dependencies if needed
if ! command -v mkdocs &> /dev/null; then
    echo "📦 Installing MkDocs..."
    pip install mkdocs mkdocs-material mkdocs-minify-plugin mkdocs-git-revision-date-localized-plugin
fi

# Start development server with optimizations
echo "🔥 Starting optimized development server..."
mkdocs serve \
    --dev-addr=0.0.0.0:8000 \
    --dev-host=0.0.0.0 \
    --dirty-reload \
    --live-reload \
    --no-strict \
    --verbose

echo "✅ Development server started at http://localhost:8000"
echo "📝 Features enabled:"
echo "   - Dirty reload (only rebuild changed pages)"
echo "   - Live reload (auto-refresh browser)"
echo "   - Verbose logging for debugging"
