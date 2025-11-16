# Quick Start Guide - After Migration

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```
✅ 363 packages installed successfully

### Step 2: Initialize Database
```bash
npm run init-db
```
Creates:
- Admin user: `admin@sunflix.com` / `admin123`
- MongoDB indexes
- Initial database setup

### Step 3: Start Development
```bash
npm run dev:full
```
Runs:
- Frontend dev server: http://localhost:5173
- Backend API server: http://localhost:3001

---

## 📋 What Changed

### Before (Supabase)
- Database: PostgreSQL (Supabase)
- Authentication: Supabase Auth
- Client Library: @supabase/supabase-js
- Data Storage: Supabase + localStorage

### After (MongoDB)
- Database: MongoDB Atlas
- Authentication: JWT tokens
- Client Library: Axios HTTP client
- Data Storage: MongoDB + JWT in localStorage

---

## 🔑 Environment Variables

Create `.env.local` file:
```bash
VITE_MONGODB_URI=mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
VITE_API_URL=http://localhost:3001
VITE_DB_NAME=sunflix
JWT_SECRET=your-secret-key-here
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/verify` - Verify token

### Videos
- `GET /api/videos` - List videos
- `GET /api/videos/:id` - Get video
- `POST /api/videos` - Create video (admin)
- `PUT /api/videos/:id` - Update video (admin)
- `DELETE /api/videos/:id` - Delete video (admin)

### Comments
- `GET /api/comments` - List comments
- `POST /api/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Messages
- `GET /api/messages` - List messages
- `POST /api/messages` - Send message
- `PATCH /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

### Users
- `GET /api/users` - List users (admin)
- `POST /api/users/:id/approve` - Approve user (admin)

### Watch History
- `GET /api/watch-history` - Get history
- `POST /api/watch-history` - Add to history

---

## ✅ Migration Verification

### Removed (All Supabase Code)
- ❌ Supabase client imports
- ❌ Supabase queries (from().select())
- ❌ Supabase authentication
- ❌ Old storage functions (getVideos, saveVideos, etc.)
- ❌ localStorage data calls (except JWT)

### Added (MongoDB Setup)
- ✅ Express.js API server (30+ routes)
- ✅ MongoDB Mongoose models (8 collections)
- ✅ JWT authentication with tokens
- ✅ Axios HTTP client with interceptors
- ✅ Database initialization script
- ✅ Vercel serverless wrapper

### Verified
- ✅ 13 page components updated
- ✅ Zero Supabase references remaining
- ✅ All API calls implemented
- ✅ 363 packages installed
- ✅ No compile errors in updated components

---

## 🧪 Testing Commands

### Run Tests
```bash
npm run test
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## 📱 Default Admin Account

- Email: `admin@sunflix.com`
- Password: `admin123`
- Role: Admin

⚠️ Change password after first login!

---

## 🌐 API Base URL

### Development
```
http://localhost:3001
```

### Production (Vercel)
```
https://your-vercel-domain.vercel.app
```

Update `VITE_API_URL` in `.env.local` for production.

---

## 📊 Database Structure

### Collections
1. **users** - User accounts and profiles
2. **videos** - Video metadata
3. **comments** - Video comments
4. **messages** - Contact/partnership messages
5. **notifications** - User notifications
6. **ads** - Advertisement data
7. **watchhistory** - Video watch history
8. **settings** - Site settings

All collections use MongoDB indexes for performance.

---

## 🔒 Security

### Authentication Flow
1. User submits credentials
2. Server validates and creates JWT token
3. Token stored in localStorage (7-day expiration)
4. Axios interceptor adds token to all API requests
5. Server verifies token on protected routes

### Password Security
- Hashed with bcrypt (10 rounds)
- Never stored in plaintext
- Never sent over HTTP (use HTTPS in production)

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Connect to Vercel
1. Visit https://vercel.com
2. Import your GitHub repository
3. Set environment variables

### Step 3: Environment Variables
Add to Vercel project settings:
```
VITE_MONGODB_URI=mongodb+srv://...
VITE_API_URL=https://your-domain.vercel.app
VITE_DB_NAME=sunflix
JWT_SECRET=your-secret
```

### Step 4: Deploy
```bash
vercel --prod
```

---

## 📝 Documentation Files

1. **MIGRATION_SUMMARY.md** - Complete migration details
2. **MIGRATION_VERIFICATION.md** - Verification report
3. **MONGODB_MIGRATION_GUIDE.md** - API documentation
4. **QUICK_START_MONGODB.md** - Quick reference guide
5. **DEPLOY_NOW.md** - Deployment instructions

---

## 🆘 Troubleshooting

### MongoDB Connection Error
- Check `VITE_MONGODB_URI` in `.env.local`
- Verify MongoDB Atlas cluster status
- Ensure IP whitelist includes your machine

### API Server Not Starting
- Check port 3001 is not in use
- Verify `JWT_SECRET` is set
- Check MongoDB connection

### Frontend Not Loading
- Check `VITE_API_URL` points to correct server
- Verify port 5173 is available
- Clear browser cache

### Authentication Issues
- Verify token in localStorage
- Check `sunflix-token` in browser DevTools
- Run `npm run init-db` to reset admin user

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review MIGRATION_VERIFICATION.md
3. Check MongoDB Atlas dashboard
4. Review Express server logs
5. Check browser console for errors

---

**Status: Ready for Development** ✅

All Supabase code removed. MongoDB setup complete. Ready to build and deploy!

