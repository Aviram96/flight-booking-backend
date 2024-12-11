// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');
require('dotenv').config();

const connectDB = require('./config/db'); // Import the database connection

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors({ origin: 'http://localhost:4200' })); // Allow requests from your Angular app

// Connect to the Database
connectDB();

// Routes
app.use('/api/flights', flightRoutes); // Use flight routes for `/api/flights` endpoint

// Start the Server
let server; // Declare server variable

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, server };
