# 🚀 Vercel Deployment Guide for MkDocs

This guide shows you how to deploy your MkDocs site on Vercel with optimal performance and configuration.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your MkDocs project should be on GitHub
3. **Vercel CLI** (optional): `npm i -g vercel`

## 🔧 Vercel Configuration

### 1. `vercel.json` Configuration

The `vercel.json` file is already configured with:
- **Build Command**: `mkdocs build`
- **Output Directory**: `site`
- **Dependencies**: All required MkDocs plugins
- **Headers**: Security and caching headers
- **Redirects**: Clean URL handling

### 2. Key Features

```json
{
  "buildCommand": "mkdocs build",
  "outputDirectory": "site",
  "installCommand": "pip install mkdocs mkdocs-minify-plugin mkdocs-git-revision-date-localized-plugin pymdown-extensions"
}
```

## 🚀 Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `mkdocs build`
   - **Output Directory**: `site`
   - **Install Command**: `pip install mkdocs mkdocs-minify-plugin mkdocs-git-revision-date-localized-plugin pymdown-extensions`

3. **Environment Variables** (if needed)
   - Add any environment variables your site needs

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: your-project-name
# - Directory: ./
# - Override settings: No
```

## ⚡ Performance Optimizations

### 1. Caching Headers
Vercel automatically applies caching headers:
- **Static assets** (CSS, JS, images): 1 year cache
- **HTML pages**: 1 hour cache with revalidation

### 2. CDN Distribution
- Your site is automatically distributed globally
- Edge caching for faster loading
- Automatic HTTPS

### 3. Build Optimizations
- Parallel builds
- Dependency caching
- Optimized Python environment

## 🔄 Continuous Deployment

### Automatic Deployments
- **Push to main branch**: Triggers production deployment
- **Pull requests**: Creates preview deployments
- **Branch deployments**: Automatic for all branches

### Custom Domains
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real user metrics
- Core Web Vitals tracking

### Custom Analytics
Add to your `mkdocs.yml`:
```yaml
extra:
  analytics:
    provider: google
    property: !ENV GOOGLE_ANALYTICS_KEY
```

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check build logs in Vercel dashboard
   # Common fixes:
   - Ensure all dependencies are in installCommand
   - Check Python version compatibility
   - Verify mkdocs.yml syntax
   ```

2. **404 Errors**
   ```bash
   # Check vercel.json redirects
   # Ensure clean URLs are configured
   # Verify output directory is correct
   ```

3. **Slow Builds**
   ```bash
   # Optimize your content:
   - Compress images before adding
   - Remove unnecessary files
   - Use .gitignore to exclude files
   ```

### Debug Commands

```bash
# Test build locally
./build-vercel.sh

# Check build output
ls -la site/

# Test with Vercel CLI
vercel --debug
```

## 🎯 Best Practices

### 1. Content Optimization
- **Images**: Use WebP format, compress before adding
- **Markdown**: Keep files focused and well-structured
- **Assets**: Minimize external dependencies

### 2. Build Optimization
- **Dependencies**: Only install what you need
- **Cache**: Use Vercel's built-in caching
- **Build time**: Keep under 5 minutes

### 3. SEO Optimization
- **Sitemap**: Automatically generated
- **Meta tags**: Configure in mkdocs.yml
- **Clean URLs**: Enabled by default

## 📈 Performance Metrics

### Expected Performance
- **Build time**: 2-5 minutes
- **First load**: <2 seconds
- **Lighthouse score**: 90+ (Performance, Accessibility, Best Practices, SEO)

### Monitoring
- **Vercel Analytics**: Built-in performance tracking
- **Lighthouse**: Automatic performance audits
- **Real User Monitoring**: Actual user experience data

## 🔧 Advanced Configuration

### Custom Headers
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Environment Variables
Set in Vercel dashboard:
- `GOOGLE_ANALYTICS_KEY`: Your GA tracking ID
- `CUSTOM_VAR`: Any custom variables

### Preview Deployments
- Every PR gets a preview URL
- Test changes before merging
- Share previews with team

## 🎉 Success Checklist

- [ ] Site builds successfully
- [ ] All pages load correctly
- [ ] Images and assets load
- [ ] Search functionality works
- [ ] Mobile responsive
- [ ] Fast loading times
- [ ] SEO meta tags present
- [ ] Sitemap generated
- [ ] Custom domain configured (if needed)
- [ ] Analytics tracking (if needed)

## 🚀 Next Steps

1. **Monitor Performance**: Use Vercel Analytics
2. **Optimize Content**: Regular content updates
3. **Custom Domain**: Set up your domain
4. **Team Collaboration**: Invite team members
5. **Backup Strategy**: Regular repository backups

Your MkDocs site is now optimized for Vercel deployment with excellent performance! 🎉
