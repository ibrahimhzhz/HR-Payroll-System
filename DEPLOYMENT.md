# HR-Payroll System - Deployment Guide

## GitHub Pages Deployment

This project has been optimized for static hosting on GitHub Pages. Follow these steps to deploy:

### Prerequisites
- GitHub account with a repository
- Node.js 18+ installed locally
- Git installed and configured

### Deployment Steps

1. **Build the client application:**
   ```bash
   npm run build:client
   ```
   This generates a production build in the `dist/` directory.

2. **Push the dist folder to GitHub Pages:**
   
   **Option A: Using GitHub CLI**
   ```bash
   gh pages deploy dist --branch gh-pages
   ```

   **Option B: Manual Push**
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git push origin HEAD:gh-pages
   ```

3. **Configure GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Source", select `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Click "Save"

4. **Access your site:**
   - Your site will be available at: `https://[username].github.io/[repo-name]`

### Features Included

✅ **Fully Functional Client:**
- Dashboard with role-based views (Employee, Manager, Admin)
- Employee directory with search
- Leave & WFH management
- Payroll tracking
- Document management

✅ **Mock Data:**
- All data is stored in-memory (`client/src/lib/mockData.ts`)
- No backend required
- Data resets on page refresh (demo purposes)

✅ **Optimizations:**
- Production build with minification
- No source maps in production
- Removed development-only plugins (Replit utilities)
- Clean build output

### Notes

- **No Backend API:** This deployment uses mock data. To add a real backend, you'll need to:
  - Deploy the Express server separately (e.g., Vercel, Railway, Heroku)
  - Update API endpoints in the client code
  - Remove mock data usage

- **Data Persistence:** Currently, all data resets on page reload. For a production app with real data:
  - Implement a database (PostgreSQL, MongoDB, etc.)
  - Set up proper authentication
  - Handle data validation and security

- **Environment Variables:** If you need to add API endpoints later, use `.env` files:
  ```
  VITE_API_URL=https://your-api.example.com
  ```

### Local Build Testing

Before deploying, test the production build locally:
```bash
npm run build:client
npm run preview
```

This serves the built app on `http://localhost:4173`.

### Troubleshooting

- **Blank page after deployment?** Check browser console (F12) for errors
- **Assets not loading?** Verify the repository name in GitHub Pages settings
- **Old content showing?** Clear browser cache and GitHub Pages cache
