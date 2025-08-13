#!/bin/bash

# Vercel Build Script for MkDocs
# This script is optimized for Vercel's build environment

set -e

echo "🚀 Starting Vercel-optimized MkDocs build..."

# Install dependencies if not already installed
if ! command -v mkdocs &> /dev/null; then
    echo "📦 Installing MkDocs and dependencies..."
    pip install mkdocs mkdocs-minify-plugin mkdocs-git-revision-date-localized-plugin pymdown-extensions
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf site/
rm -rf .cache/
rm -rf .mkdocs_cache/

# Clear Python cache
echo "🗑️  Clearing Python cache..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true

# Build with optimizations
echo "🔨 Building documentation for Vercel..."
mkdocs build --clean

# Post-build optimizations for Vercel
echo "🎯 Running Vercel-specific optimizations..."

# Create _redirects file for Vercel (if needed)
echo "📄 Creating Vercel redirects..."
cat > site/_redirects << EOF
# Redirects for Vercel
/index.html / 301
EOF

# Create _headers file for Vercel (if needed)
echo "📋 Creating Vercel headers..."
cat > site/_headers << EOF
# Headers for Vercel
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate
EOF

# Generate sitemap for SEO
echo "🗺️  Generating sitemap..."
cat > site/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

find site/ -name "*.html" | while read file; do
    rel_path=${file#site/}
    # Use your Vercel domain here
    url="https://your-vercel-domain.vercel.app/${rel_path}"
    echo "  <url><loc>${url}</loc></url>" >> site/sitemap.xml
done

echo "</urlset>" >> site/sitemap.xml

# Build statistics
echo "📊 Build statistics:"
echo "  - Total files: $(find site/ -type f | wc -l)"
echo "  - Total size: $(du -sh site/ | cut -f1)"
echo "  - HTML files: $(find site/ -name "*.html" | wc -l)"
echo "  - CSS files: $(find site/ -name "*.css" | wc -l)"
echo "  - JS files: $(find site/ -name "*.js" | wc -l)"

echo "✅ Vercel build completed successfully!"
echo "🌐 Site is ready for Vercel deployment at: site/"
