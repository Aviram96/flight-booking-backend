// routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const Flight = require('../models/Flight');
const Book = require('../models/Book');

// GET all flights
router.get('/flights', flightController.getAllFlights);

// GET a flight by ID
router.get('/:id', flightController.getFlightById);

// POST a new flight
router.post('/', flightController.createFlight);

// PUT to update a flight by ID
router.put('/:id', flightController.updateFlight);

// DELETE a flight by ID
router.delete('/:id', flightController.deleteFlight);

// Flight search endpoint
router.post('/search', async (req, res) => {
    const { departureCity, destinationCity, departureDate, returnDate, passengers } = req.body;
    try {
        // Query for flights based on search criteria
        const flights = await Flight.find({
            departureCity,
            destinationCity,
            departureDate,
            returnDate,
            passengers: { $gte: passengers }
        });

        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/bookings', async (req, res) => {
    try {
        const booking = new Book(req.body);
        const savedBooking = await booking.save();
        console.log("ENTER TRY");
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Booking failed', error });
    }
});

module.exports = router;
