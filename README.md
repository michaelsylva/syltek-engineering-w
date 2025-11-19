# Syltek Engineering Website

Precision Mechanical Design & Automation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### GitHub Pages Setup

To ensure GitHub Pages works correctly, make sure the following settings are configured in your repository:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**

The GitHub Actions workflow in `.github/workflows/deploy.yml` will automatically build and deploy the site when changes are pushed to the main branch.

### How It Works

1. The workflow is triggered on push to `main` branch
2. It installs dependencies and runs `npm run build`
3. Vite builds the app with the base path `/syltek-engineering-w/`
4. The built `dist/` folder is deployed to GitHub Pages

All asset paths are automatically adjusted to include the base path, so resources load correctly at `https://[username].github.io/syltek-engineering-w/`.
