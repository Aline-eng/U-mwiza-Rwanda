# U'mwiza Rwanda - Deployment Guide

## 🚀 Quick Deployment Steps

### Backend Deployment (Render)

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `umwizarwandadb` (no special characters)
   - Copy the **Internal Database URL** (starts with `postgresql://`)

3. **Deploy Backend**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Settings:
     - **Name**: `umwiza-rwanda-api`
     - **Environment**: `Node`
     - **Build Command**: `./render-build.sh`
     - **Start Command**: `npm start`
     - **Node Version**: `18`

4. **Environment Variables** (Add in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<your-postgres-internal-url-from-render>
   JWT_ACCESS_SECRET=<generate-random-64-char-string>
   JWT_REFRESH_SECRET=<generate-different-random-64-char-string>
   CORS_ORIGIN=*
   ```
   
   **⚠️ SECURITY**: Generate strong random secrets:
   - Use: `openssl rand -hex 32` or online generator
   - Never use the example secrets in production

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Deploy Frontend**:
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables** (Add in Vercel dashboard):
   ```
   NEXT_PUBLIC_API_URL=https://umwiza-rwanda-api.onrender.com/api/v1
   ```

## 🔗 URLs After Deployment

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://umwiza-rwanda-api.onrender.com`
- **API Health**: `https://umwiza-rwanda-api.onrender.com/health`

## 🧪 Test Credentials

**Admin Login**:
- Email: `admin@umwiza.org`
- Password: `admin123`

**Staff Login**:
- Email: `staff@umwiza.org`
- Password: `staff123`

## 📝 Portfolio Description

**U'mwiza Rwanda - Humanitarian Management Platform**

A comprehensive NGO management system built with Next.js, TypeScript, Node.js, and PostgreSQL. Features include:

- 🏠 **Staff Portal**: Child sponsorship management, health records, education tracking
- 👨‍💼 **Admin Portal**: System analytics, approvals workflow, reports generation
- 🔐 **Authentication**: Role-based access control with JWT
- 📊 **Analytics**: Community impact metrics and performance dashboards
- 📱 **Responsive**: Mobile-first design with professional UI/UX

**Tech Stack**: Next.js 14, TypeScript, Node.js, Express, PostgreSQL, Prisma, TailwindCSS

**Live Demo**: [Your Vercel URL]
**GitHub**: [Your GitHub Repository]

## 🚨 Important Notes

1. **Database**: Render PostgreSQL takes 2-3 minutes to start on first deploy
2. **Build Time**: Backend build takes 3-5 minutes, frontend takes 1-2 minutes
3. **Environment**: Make sure to update CORS_ORIGIN after frontend deployment
4. **SSL**: Both platforms provide HTTPS automatically

## 🔧 Troubleshooting

**Backend Issues**:
- Check Render logs for build errors
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

**Frontend Issues**:
- Check Vercel deployment logs
- Verify NEXT_PUBLIC_API_URL points to correct backend
- Test API connection in browser console

**Database Issues**:
- Database might be sleeping (Render free tier)
- Check PostgreSQL connection in Render dashboard
- Verify migrations ran successfully

---

**Ready for Portfolio!** 🎉