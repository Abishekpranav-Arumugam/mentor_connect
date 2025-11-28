// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mentorRoutes = require('./routes/mentor');  // Import mentor routes
const menteeRoutes = require('./routes/mentee');  // Import mentee routes
const connectDB = require('./config/db'); // MongoDB connection
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/mentor', mentorRoutes);
app.use('/api/mentee', menteeRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
