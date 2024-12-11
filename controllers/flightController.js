// controllers/flightController.js
const Flight = require('../models/Flight');

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new flight
exports.createFlight = async (req, res) => {
  const flight = new Flight(req.body);
  try {
    const newFlight = await flight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a flight by ID
exports.updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlight) return res.status(404).json({ message: 'Flight not found' });
    res.json(updatedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a flight by ID
exports.deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) return res.status(404).json({ message: 'Flight not found' });
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
