#!/bin/bash

# Optimized Vercel Build Script for MkDocs
# Focuses on speed and performance for production deployment

set -e

echo "🚀 Starting optimized Vercel build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf site/ .cache/ .mkdocs_cache/

# Install dependencies with caching
echo "📦 Installing dependencies..."
pip install --no-cache-dir mkdocs mkdocs-minify-plugin mkdocs-git-revision-date-localized-plugin pymdown-extensions

# Build with optimizations
echo "🔨 Building MkDocs site..."
mkdocs build --clean --no-strict

# Optimize images (if ImageMagick is available)
if command -v convert &> /dev/null; then
    echo "🖼️  Optimizing images..."
    find site -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read img; do
        if [[ "$img" == *.png ]]; then
            convert "$img" -strip -quality 85 "$img"
        else
            convert "$img" -strip -quality 80 "$img"
        fi
    done
fi

# Minify HTML (if html-minifier is available)
if command -v html-minifier &> /dev/null; then
    echo "📄 Minifying HTML..."
    find site -name "*.html" -exec html-minifier \
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
find site -type f \( -name "*.css" -o -name "*.js" -o -name "*.html" \) -exec gzip -9 -k {} \;

# Generate sitemap
echo "🗺️  Generating sitemap..."
cat > site/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

find site -name "*.html" | sed 's|site/||' | while read page; do
    echo "  <url><loc>https://harriweb3.dev/$page</loc></url>" >> site/sitemap.xml
done

echo "</urlset>" >> site/sitemap.xml

# Create Vercel-specific files
echo "⚙️  Creating Vercel configuration files..."

# Create _redirects for clean URLs
cat > site/_redirects << EOF
/index.html / 301
/*.html /:splat 301
EOF

# Create _headers for additional caching
cat > site/_headers << EOF
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

# Print build statistics
echo "📊 Build Statistics:"
echo "  - Total files: $(find site -type f | wc -l)"
echo "  - Total size: $(du -sh site | cut -f1)"
echo "  - HTML files: $(find site -name "*.html" | wc -l)"
echo "  - CSS files: $(find site -name "*.css" | wc -l)"
echo "  - JS files: $(find site -name "*.js" | wc -l)"
echo "  - Images: $(find site -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" | wc -l)"

echo "✅ Optimized Vercel build completed!"
echo "🚀 Ready for deployment to Vercel"
