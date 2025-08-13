#!/bin/bash

# MkDocs Performance Build Script
# This script optimizes the build process for faster rendering and deployment

set -e  # Exit on any error

echo "🚀 Starting optimized MkDocs build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf site/
rm -rf .cache/
rm -rf .mkdocs_cache/

# Clear Python cache
echo "🗑️  Clearing Python cache..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true

# Pre-build optimizations
echo "⚡ Running pre-build optimizations..."

# Optimize images (if you have ImageMagick installed)
if command -v convert &> /dev/null; then
    echo "🖼️  Optimizing images..."
    find docs/ -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read img; do
        if [[ $img != *"optimized"* ]]; then
            convert "$img" -strip -quality 85 "$img"
        fi
    done
fi

# Build with optimizations
echo "🔨 Building documentation with optimizations..."
mkdocs build --clean

# Post-build optimizations
echo "🎯 Running post-build optimizations..."

# Minify HTML files (if you have html-minifier installed)
if command -v html-minifier &> /dev/null; then
    echo "📄 Minifying HTML files..."
    find site/ -name "*.html" -exec html-minifier \
        --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --remove-script-type-attributes \
        --remove-tag-whitespace \
        --use-short-doctype \
        --minify-css true \
        --minify-js true \
        -o {} {} \;
fi

# Compress static assets
echo "🗜️  Compressing static assets..."
if command -v gzip &> /dev/null; then
    find site/ -name "*.html" -o -name "*.css" -o -name "*.js" | while read file; do
        gzip -9 -c "$file" > "$file.gz"
    done
fi

# Generate sitemap for better SEO
echo "🗺️  Generating sitemap..."
cat > site/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

find site/ -name "*.html" | while read file; do
    rel_path=${file#site/}
    url="https://hien-p.github.io/hari-docs/${rel_path}"
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

echo "✅ Build completed successfully!"
echo "🌐 Site is ready for deployment at: site/"
