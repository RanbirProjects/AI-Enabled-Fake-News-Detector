const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from any origin in production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? '*' // In production, allow any origin
    : 'http://localhost:3000', // In development, only allow the React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const newsRouter = require('./routes/news');

// Try to connect to MongoDB but continue if it fails
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.log('Server will continue with in-memory storage');
  });

app.use('/api/news', newsRouter);

app.get('/', (req, res) => {
  res.send('Fake News Detector API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});