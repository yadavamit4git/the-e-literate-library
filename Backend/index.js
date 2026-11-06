
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import bookRoutes from './route/bookroute.js';
import userRoutes from './route/userroute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bookRoutes);
app.use('/api', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Book Management API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error.message);
  });
