# 🚀 Quick Start Guide - MongoDB & Vercel Migration

## ✅ What Changed

This project has been successfully migrated from **Supabase** to **MongoDB Atlas** and is ready for **Vercel deployment**.

### Key Changes:
- ❌ Removed: Supabase authentication and database
- ❌ Removed: Supabase real-time subscriptions  
- ✅ Added: MongoDB Atlas integration
- ✅ Added: Express API server with JWT authentication
- ✅ Added: Vercel serverless function support
- ✅ Added: REST API endpoints for all operations

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- `mongoose` - MongoDB ODM
- `express` - API server
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT auth
- `cors` - Cross-origin requests
- `axios` - HTTP client

### 2. Configure Environment Variables

Create `.env.local` file in the root directory:

```env
VITE_MONGODB_URI=mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
VITE_API_URL=http://localhost:3001
VITE_DB_NAME=sunflix
JWT_SECRET=your-secret-key-change-in-production
```

### 3. Initialize Database

Run the database initialization script to create admin user and sample data:

```bash
npm run init-db
```

This will:
- ✓ Create admin user (admin@sunflix.com / admin123)
- ✓ Add sample videos
- ✓ Initialize site settings

### 4. Run Development Server

**Option A: Run both frontend and backend**
```bash
npm run dev:full
```

This starts:
- Frontend: http://localhost:3000 (Vite)
- Backend: http://localhost:3001 (Express API)

**Option B: Run frontend only** (if you have API running elsewhere)
```bash
npm run dev
```

**Option C: Run API server only**
```bash
npm run api
```

### 5. Test the Application

1. Go to http://localhost:3000
2. Click "Admin Login"
3. Login with: **admin@sunflix.com** / **admin123**
4. Start managing videos!

## 📝 Creating Your First Admin Account

If you need to create another admin account:

1. Go to MongoDB Atlas dashboard
2. Navigate to your `sunflix` database
3. In the `users` collection, insert a new document:

```json
{
  "name": "Your Name",
  "email": "youremail@example.com",
  "password": "$2b$10$...", // Use bcrypt to hash password
  "role": "admin",
  "approved": true,
  "favorites": [],
  "subscriptions": [],
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

Or use a script to create it properly.

## 🌐 Deploy to Vercel

### Prerequisites:
- GitHub account
- Vercel account (free)
- MongoDB Atlas cluster (already created)

### Deployment Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "MongoDB migration - ready for Vercel"
   git push origin main
   ```

2. **Create New Project on Vercel**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add these variables:
     ```
     VITE_MONGODB_URI: mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
     JWT_SECRET: (generate a strong random string)
     VITE_API_URL: https://your-project.vercel.app
     VITE_DB_NAME: sunflix
     ```

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

## 📊 API Endpoints

### Authentication
```
POST /api/auth/signup          - Register new user
POST /api/auth/login           - User login
POST /api/auth/admin-login     - Admin login
GET  /api/auth/me              - Get current user (auth required)
```

### Videos
```
GET  /api/videos               - Get all videos
GET  /api/videos/:id           - Get video by ID
POST /api/videos               - Create video (admin only)
PUT  /api/videos/:id           - Update video (admin only)
DELETE /api/videos/:id         - Delete video (admin only)
```

### Users
```
GET  /api/users                - Get all users
GET  /api/users/:id            - Get user by ID
PUT  /api/users/:id            - Update user profile
```

### Full API Documentation
See `MONGODB_MIGRATION_GUIDE.md` for complete API reference.

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update MongoDB IP whitelist for production
- [ ] Set up CORS restrictions for your domain
- [ ] Use HTTPS for all API requests
- [ ] Implement rate limiting
- [ ] Add input validation

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run api
```

### MongoDB Connection Error
- Verify connection string in `.env.local`
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
- Verify database user credentials

### API Not Responding
- Ensure API server is running on port 3001
- Check for errors in terminal
- Verify `VITE_API_URL` points to correct address

### CORS Errors
- Backend CORS is enabled by default for development
- For production, update CORS settings in `api/index.js`

## 📁 Project Structure

```
Sunflix Video Platform/
├── src/
│   ├── api/                 # Backend API
│   │   ├── models/         # MongoDB schemas
│   │   └── server.js       # Express server
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # Auth & Theme context
│   ├── lib/
│   │   ├── mongodb-storage.ts  # API client
│   │   └── api-client.ts      # Axios instance
│   └── App.tsx            # Main app
├── api/                    # Vercel serverless functions
├── scripts/
│   └── init-db.js         # Database initialization
├── .env.local             # Local environment variables
├── .env.example           # Example env file
├── package.json
└── vite.config.ts
```

## 🚀 Next Steps

1. ✅ Setup complete!
2. Test the application locally
3. Deploy to Vercel
4. Configure custom domain
5. Monitor logs in Vercel dashboard
6. Set up backups for MongoDB

## 📞 Support

For issues:
1. Check terminal output for error messages
2. Review MongoDB logs
3. Check browser console for frontend errors
4. Verify all environment variables are set

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

**Happy streaming! 🎬**
