# Sunflix Video Platform - MongoDB Migration & Vercel Deployment Guide

## Overview
This guide explains the migration from Supabase to MongoDB Atlas and deployment to Vercel.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
VITE_MONGODB_URI=mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
VITE_API_URL=http://localhost:3001
VITE_DB_NAME=sunflix
JWT_SECRET=your-secret-key-change-in-production
```

For production (Vercel), set these as environment variables in Vercel dashboard:
- `VITE_MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong random secret key
- `VITE_API_URL`: Your Vercel deployment URL (https://your-domain.vercel.app)
- `VITE_DB_NAME`: sunflix

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **For development with both frontend and backend:**
   ```bash
   npm run dev:full
   ```
   This runs Vite on port 3000 and the API server on port 3001.

3. **For frontend only:**
   ```bash
   npm run dev
   ```

4. **For API server only:**
   ```bash
   npm run api
   ```

## Build

```bash
npm run build
```

## Database Setup

The MongoDB collections will be automatically created when the server starts. The following collections are created:

- **Users**: Stores user accounts and profiles
- **Videos**: Stores video metadata and content
- **Comments**: Stores video comments
- **Messages**: Stores contact form messages
- **Notifications**: Stores user notifications
- **Ads**: Stores advertisement data
- **WatchHistory**: Stores user watch history
- **Settings**: Stores site-wide settings

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/me` - Get current user (requires auth token)

### Videos
- `GET /api/videos` - Get all published videos
- `GET /api/videos?category=action` - Get videos by category
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/trending/list` - Get trending videos
- `GET /api/videos/featured/list` - Get featured videos
- `GET /api/videos/search?q=query` - Search videos
- `POST /api/videos` - Create video (admin only)
- `PUT /api/videos/:id` - Update video (admin only)
- `DELETE /api/videos/:id` - Delete video (admin only)
- `POST /api/videos/:id/like` - Like a video
- `POST /api/videos/:id/unlike` - Unlike a video

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/approve` - Approve user (admin only)
- `GET /api/users/:id/favorites` - Get user's favorite videos
- `POST /api/users/:id/favorites` - Add video to favorites
- `DELETE /api/users/:id/favorites/:videoId` - Remove from favorites
- `GET /api/users/:id/watch-history` - Get user's watch history
- `GET /api/users/:id/notifications` - Get user's notifications

### Comments
- `GET /api/videos/:videoId/comments` - Get video comments
- `POST /api/videos/:videoId/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/like` - Like comment

### Messages
- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Create message
- `DELETE /api/messages/:id` - Delete message (admin only)
- `PUT /api/messages/:id/read` - Mark message as read

### Notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark notification as read

### Ads
- `GET /api/ads` - Get active ads
- `POST /api/ads` - Create ad (admin only)
- `PUT /api/ads/:id` - Update ad (admin only)
- `DELETE /api/ads/:id` - Delete ad (admin only)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update settings (admin only)

### Watch History
- `POST /api/watch-history` - Add to watch history

## Key Changes from Supabase

### Authentication
- **Before**: Supabase Auth with email verification
- **After**: JWT tokens stored in localStorage with bcrypt password hashing
- Users are created with `approved: false` and must be approved by an admin

### Data Storage
- **Before**: Supabase PostgreSQL tables and real-time subscriptions
- **After**: MongoDB collections with REST API endpoints

### Real-time Updates
- **Before**: Supabase real-time subscriptions
- **After**: Polling or webhook-based updates (can be extended with WebSockets)

### Local Storage
- **Before**: Direct Supabase localStorage integration
- **After**: JWT tokens stored in localStorage, all data fetched via API

## Deployment to Vercel

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "MongoDB migration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add the following:
     ```
     VITE_MONGODB_URI=mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
     JWT_SECRET=your-strong-secret-key-here
     VITE_API_URL=https://your-project.vercel.app
     VITE_DB_NAME=sunflix
     ```

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Node.js Version: 18.x or higher

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

## MongoDB Atlas Setup

If you haven't already:

1. Create a MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user with username `rizqaratech_db_user`
3. Add IP whitelist entry for 0.0.0.0/0 (or your Vercel IP)
4. Copy your connection string and add to environment variables

## Troubleshooting

### MongoDB Connection Issues
- Verify the connection string in `.env.local`
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0 for development
- For Vercel, use 0.0.0.0/0 as Vercel's IP range varies

### API Endpoint Not Found
- Ensure the API server is running on port 3001 in development
- For Vercel, API routes are served from `/api/` paths

### Auth Token Expires
- Tokens have a 7-day expiration by default
- Users will need to log in again after expiration

### CORS Issues
- CORS is enabled for all origins in development
- For production, update CORS configuration in `api/index.js`

## Development

### Adding New Endpoints
1. Create a new model in `src/api/models/`
2. Add routes in both `src/api/server.js` and `api/index.js`
3. Update the storage layer in `src/lib/mongodb-storage.ts`
4. Use the new functions in your React components

### Testing
- Use Postman or Thunder Client to test API endpoints
- Include Authorization header: `Bearer YOUR_JWT_TOKEN`

## Security Notes

1. **Change JWT Secret**: Update `JWT_SECRET` environment variable
2. **API Rate Limiting**: Implement rate limiting on production
3. **HTTPS Only**: Use HTTPS for all API requests
4. **Input Validation**: Sanitize and validate all user inputs
5. **CORS Policy**: Restrict CORS to your domain on production

## Support

For issues or questions:
1. Check MongoDB logs
2. Review API server logs in terminal
3. Check browser console for frontend errors
4. Verify environment variables are set correctly
