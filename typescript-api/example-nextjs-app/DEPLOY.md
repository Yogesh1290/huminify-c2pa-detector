# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

### Method 1: Vercel Dashboard (Easiest!)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/c2pa-detector.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! ✅

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: One-Click Deploy

Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Click "Deploy"

---

## Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

---

## Environment Variables

No environment variables needed! 🎉

The app uses native C2PA library and works out of the box.

---

## Custom Domain

### Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps

---

## Performance Tips

1. **Enable Edge Functions** (Vercel)
   - Automatically enabled for API routes
   - Reduces latency globally

2. **Enable Caching**
   - Static assets cached automatically
   - API responses can be cached with headers

3. **Optimize Images**
   - Use Next.js Image component
   - Automatic optimization

---

## Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `pages/_app.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

---

## Troubleshooting

### Build Fails

**Error: Node version too old**
- Solution: Add `engines` to package.json:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

**Error: Module not found**
- Solution: Run `npm install` locally first
- Commit `package-lock.json`

### Runtime Errors

**Error: Function timeout**
- Solution: Increase timeout in `vercel.json`:
  ```json
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 30
    }
  }
  ```

**Error: Memory limit exceeded**
- Solution: Increase memory in `vercel.json`:
  ```json
  "functions": {
    "pages/api/**/*.ts": {
      "memory": 2048
    }
  }
  ```

---

## Cost Estimates

### Vercel (Hobby - Free)
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN

### Vercel (Pro - $20/month)
- ✅ 1TB bandwidth/month
- ✅ Advanced analytics
- ✅ Team collaboration
- ✅ Priority support

### Netlify (Free)
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Upload test images
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS is working
- [ ] Test file upload limits
- [ ] Check error handling
- [ ] Monitor performance
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

---

## Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [C2PA Specification](https://c2pa.org/specifications/)

---

**Your app is ready to deploy! 🚀**

Choose your platform and deploy in minutes!
