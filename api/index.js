// For Vercel deployment, all API routes go through this index
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { hash as bcryptHash, compare as bcryptCompare } from '../src/lib/bcrypt.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load .env.local first for local development, then fall back to .env
try {
  dotenv.config({ path: '.env.local' });
} catch (e) {
  // ignore
}
dotenv.config();

// Import models
import { User } from '../src/api/models/User.js';
import { Video } from '../src/api/models/Video.js';
import { Comment } from '../src/api/models/Comment.js';
import { Message } from '../src/api/models/Message.js';
import { Notification } from '../src/api/models/Notification.js';
import { Ad } from '../src/api/models/Ad.js';
import { WatchHistory } from '../src/api/models/WatchHistory.js';
import { Settings } from '../src/api/models/Settings.js';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const MONGODB_URI = process.env.VITE_MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// =====================================================
// AUTH ROUTES
// =====================================================

app.post('/api/auth/signup', async (req, res) => {
  await connectToDatabase();
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcryptHash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      approved: false,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        approved: user.approved,
        favorites: user.favorites,
        subscriptions: user.subscriptions,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  await connectToDatabase();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcryptCompare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        approved: user.approved,
        favorites: user.favorites,
        subscriptions: user.subscriptions,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/admin-login', async (req, res) => {
  await connectToDatabase();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const isValidPassword = await bcryptCompare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        approved: user.approved,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Admin login failed' });
  }
});

app.get('/api/auth/me', verifyToken, async (req, res) => {
  await connectToDatabase();
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// =====================================================
// VIDEO ROUTES (Basic - extend as needed)
// =====================================================

app.get('/api/videos', async (req, res) => {
  await connectToDatabase();
  try {
    const { category } = req.query;
    const query = { status: 'published' };
    if (category) query.category = category;
    const videos = await Video.find(query).limit(50);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.get('/api/videos/trending/list', async (req, res) => {
  await connectToDatabase();
  try {
    const videos = await Video.find({ trending: true, status: 'published' }).limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending videos' });
  }
});

app.get('/api/videos/featured/list', async (req, res) => {
  await connectToDatabase();
  try {
    const videos = await Video.find({ featured: true, status: 'published' }).limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured videos' });
  }
});

app.get('/api/videos/search', async (req, res) => {
  await connectToDatabase();
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const videos = await Video.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
      status: 'published',
    }).limit(20);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('/api/videos/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// =====================================================
// ADS ROUTES
// =====================================================

app.get('/api/ads', async (req, res) => {
  await connectToDatabase();
  try {
    const ads = await Ad.find({ active: true });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ads' });
  }
});

app.post('/api/ads', verifyToken, async (req, res) => {
  await connectToDatabase();
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, imageUrl, clickUrl, position, active } = req.body;
    
    // Validate required fields
    if (!title || !imageUrl || !clickUrl) {
      return res.status(400).json({ error: 'Missing required fields: title, imageUrl, clickUrl' });
    }

    const ad = new Ad({
      title,
      imageUrl,
      clickUrl,
      position: position || 'banner',
      active: active !== false,
      impressions: 0,
      clicks: 0,
    });
    await ad.save();
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ad', details: error.message });
  }
});

app.put('/api/ads/:id', verifyToken, async (req, res) => {
  await connectToDatabase();
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ad' });
  }
});

app.delete('/api/ads/:id', verifyToken, async (req, res) => {
  await connectToDatabase();
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ad' });
  }
});

export default app;
