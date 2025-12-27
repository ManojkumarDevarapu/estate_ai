import dotenv from 'dotenv';
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

/* ===============================
   START SERVER
================================ */
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
