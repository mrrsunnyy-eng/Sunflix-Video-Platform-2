# 🚀 DEPLOYMENT INSTRUCTIONS - STEP BY STEP

## ✅ WHAT YOU HAVE

✓ React Frontend (Vite)
✓ Express API Server
✓ MongoDB Atlas Connection (ready)
✓ JWT Authentication
✓ All API Endpoints

## 🎯 IMMEDIATE NEXT STEPS

### Step 1: Install Dependencies
```bash
npm install
```

**What this does:**
- Installs all Node.js packages
- Includes mongoose, express, cors, bcrypt, jsonwebtoken, axios
- Creates node_modules folder

### Step 2: Initialize Database
```bash
npm run init-db
```

**What this does:**
- Connects to MongoDB
- Creates admin user: **admin@sunflix.com / admin123**
- Adds sample videos
- Initializes settings

⚠️ **IMPORTANT**: Change the admin password immediately after first login!

### Step 3: Test Locally
```bash
npm run dev:full
```

**What this does:**
- Starts frontend on http://localhost:3000
- Starts API on http://localhost:3001
- Both running simultaneously

**Test by:**
1. Open http://localhost:3000 in browser
2. Click "Admin Login"
3. Enter: admin@sunflix.com / admin123
4. Should login successfully
5. Try uploading a test video

## 🌐 DEPLOY TO VERCEL

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "MongoDB migration - ready for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub URL
4. Click "Import"

### Step 3: Add Environment Variables
In Vercel dashboard → Project Settings → Environment Variables:

**Add these variables:**
```
Name: VITE_MONGODB_URI
Value: mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix

Name: JWT_SECRET
Value: (Generate secure key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

Name: VITE_API_URL
Value: https://YOUR_PROJECT.vercel.app

Name: VITE_DB_NAME
Value: sunflix
```

### Step 4: Configure Build Settings
- Build Command: `npm run build`
- Output Directory: `build`
- Node.js Version: 18.x

### Step 5: Deploy
- Click "Deploy"
- Wait 2-5 minutes for build
- Your app is live! 🎉

## ✅ VERIFICATION CHECKLIST

After deployment:

- [ ] Frontend loads at vercel domain
- [ ] Can navigate pages
- [ ] Admin login works
- [ ] Can view videos
- [ ] API responds to requests
- [ ] No CORS errors in console

## 🔐 SECURITY CHECKLIST

Before going live:

- [ ] Changed admin password
- [ ] Generated new JWT_SECRET
- [ ] Verified MongoDB IP whitelist
- [ ] Using HTTPS (automatic with Vercel)
- [ ] CORS properly configured
- [ ] No sensitive data in .env files committed to git

## 🔗 YOUR MONGODB CREDENTIALS

```
Username: rizqaratech_db_user
Password: i3PYU789a4VXwWEu
Connection: mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
Database: sunflix
```

**⚠️ NEVER share these credentials publicly!**

## 📋 ENVIRONMENT FILES

### `.env.local` (For Local Development)
```env
VITE_MONGODB_URI=mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
VITE_API_URL=http://localhost:3001
VITE_DB_NAME=sunflix
JWT_SECRET=your-secret-key
```

### Vercel Dashboard (For Production)
Same variables set in Vercel project settings

## 🆘 TROUBLESHOOTING

### Can't Connect to MongoDB Locally
```bash
# Check if connection string is correct in .env.local
# Verify MongoDB Atlas allows your IP (0.0.0.0/0 for local dev)
# Try connecting directly:
mongosh "mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/sunflix"
```

### Port 3001 Already in Use
```bash
# Kill the process
lsof -ti:3001 | xargs kill -9
# Then retry
npm run dev:full
```

### API Not Responding on Vercel
- Check Vercel deployment logs
- Verify environment variables are set
- Ensure MongoDB Atlas allows connections from Vercel

## 📞 QUICK REFERENCE

| Need | Command |
|------|---------|
| Install | `npm install` |
| Initialize DB | `npm run init-db` |
| Dev Server (full) | `npm run dev:full` |
| Dev Frontend only | `npm run dev` |
| Dev API only | `npm run api` |
| Build | `npm run build` |

## 📚 DOCUMENTATION

Full guides available:
- `QUICK_START_MONGODB.md` - Detailed setup guide
- `MONGODB_MIGRATION_GUIDE.md` - Complete API reference
- `MIGRATION_COMPLETE.md` - What changed summary

## 🎊 DONE!

Follow these steps and your Sunflix platform will be live on Vercel with MongoDB!

**Questions? Check the documentation files or review the terminal output for error messages.**

---

Happy streaming! 🎬
