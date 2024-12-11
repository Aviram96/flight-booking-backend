const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server'); // Import the app and server
const Flight = require('../models/Flight');

describe('Flight Routes', () => {
  beforeAll(async () => {
    // Set up your test MongoDB URI
    mongoURI = 'mongodb://localhost:27017/flightBooking'; // Adjust as needed
    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    // Close c MongoDhgB and server after all tests
    await mongoose.connection.close();
    if (server) {
      server.close();
    }
  });

  it('should return matching flights based on search criteria', async () => {
    // Mock flight data
    const flight = new Flight({
      airline: 'Airline A',
      flightNumber: 'E1234',
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      price: 500,
      passengers: 200,
    });
    await flight.save();

    const response = await request(app).post('/api/flights/search').send({
      departureCity: 'New York',
      destinationCity: 'London',
      departureDate: new Date('2024-12-01'),
      returnDate: new Date('2024-12-15'),
      passengers: 1,
    });

    expect(response.status).toBe(200);
  });

  it('should create a new booking', async () => {
    const bookingData = {
      name: 'aviram',
      email: 'aviram@gmail.com',
      contactNumber: '0526740366',
      bookingDate: new Date('2024-12-3'),
    };

    const response = await request(app).post('/api/flights/bookings').send(bookingData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('aviram');
  });

  it('should handle booking failures', async () => {
    const bookingData = {}; // Missing required fields

    const response = await request(app).post('/api/flights/bookings').send(bookingData);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Booking failed');
  });
});
