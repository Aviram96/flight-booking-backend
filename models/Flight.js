// models/Flight.js
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  departureCity: {
    type: String,
    required: true,
  
  },
  destinationCity: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  passengers: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Flight', FlightSchema);
