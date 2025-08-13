#!/bin/bash

# MkDocs Development Script
# Optimized for fast local development

set -e

echo "🚀 Starting MkDocs development server with optimizations..."

# Kill any existing mkdocs processes
echo "🔄 Stopping existing servers..."
pkill -f "mkdocs serve" 2>/dev/null || true

# Clear cache for faster rebuilds
echo "🧹 Clearing cache..."
rm -rf .cache/
rm -rf .mkdocs_cache/

# Start development server with optimizations
echo "🔥 Starting development server..."
mkdocs serve \
    --dev-addr=127.0.0.1:8000 \
    --dev-host=127.0.0.1 \
    --live-reload \
    --dirty-reload \
    --strict \
    --verbose

echo "✅ Development server started at http://127.0.0.1:8000"
echo "📝 Press Ctrl+C to stop the server"
