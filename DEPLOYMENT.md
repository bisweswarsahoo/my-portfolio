# Deployment Guide

This portfolio is set up for automated deployment to GitHub Pages.

## 🚀 Automatic Deployment

The application is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### How it works:
1. **GitHub Actions Workflow**: `.github/workflows/deploy.yml` handles the deployment process
2. **Build Process**: Runs `npm run build` to create production files
3. **Deploy**: Automatically publishes to GitHub Pages using the `peaceiris/actions-gh-pages` action

### Setup Requirements:
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions" 
3. Push changes to the `main` branch

## 🔧 Manual Deployment

You can also deploy manually using the `gh-pages` package:

```bash
# Install dependencies (if not already done)
npm install

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Live URL

Once deployed, your portfolio will be available at:
```
https://bisweswarsahoo.github.io/my-portfolio/
```

## ⚙️ Configuration

The deployment is configured in:
- `vite.config.js` - Sets the base path for GitHub Pages
- `package.json` - Contains deployment scripts
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## 🔍 Troubleshooting

### Common Issues:
1. **404 Error**: Ensure the base path in `vite.config.js` matches your repository name
2. **Assets not loading**: Check that all asset paths are relative and not absolute
3. **GitHub Pages not enabled**: Go to repository Settings > Pages and select "GitHub Actions" as source

### Build Verification:
```bash
# Test build locally
npm run build

# Preview build locally
npm run preview
```