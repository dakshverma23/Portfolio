# Deployment Guide - Vercel

This guide will help you deploy your portfolio to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Your code pushed to a GitHub repository

## Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your portfolio repository
   - Click "Import"

4. **Configure Project**
   - Vercel will auto-detect Vite configuration
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Click "Deploy"

5. **Wait for Deployment**
   - Vercel will build and deploy your site
   - You'll get a URL like: `your-portfolio.vercel.app`

6. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your project settings
   - Confirm deployment

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables (If Needed)

If you add backend functionality or API keys:

1. Go to Project Settings → Environment Variables
2. Add your variables:
   - `VITE_API_KEY`
   - `VITE_BACKEND_URL`
   - etc.

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch triggers a production deployment
- Pull requests get preview deployments
- You can configure branch deployments in settings

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify social media links work
- [ ] Check CV download functionality
- [ ] Test contact form (if connected to backend)
- [ ] Verify responsive design on mobile
- [ ] Check page load performance
- [ ] Test on different browsers

## Updating Your Site

Simply push changes to GitHub:
```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically rebuild and deploy!

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### 404 Errors
- The `vercel.json` file handles routing
- Ensure it's committed to your repository

### Slow Loading
- Optimize images before uploading
- Use lazy loading for heavy components
- Check Vercel Analytics for insights

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- Community: https://github.com/vercel/vercel/discussions
