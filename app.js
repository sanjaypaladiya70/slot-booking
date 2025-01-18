const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/salon_booking', { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
const serviceRoutes = require('./routes/services');
const slotRoutes = require('./routes/slots');
const bookingRoutes = require('./routes/bookings');
const dataCreationRoutes = require('./routes/dataCreation');


// Use routes
app.use('/api/services', serviceRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/create' , dataCreationRoutes);

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to Salon Booking API")
})

app.post('/token', (req, res)=>{
    const customerToken = jwt.sign({ customerId: "customer1"}, process.env.JWT_SECRET, { expiresIn: "10h" });
    const slaonToken = jwt.sign({ salonId: "salon01"}, process.env.JWT_SECRET, { expiresIn: "3h" });
    return res.status(200).json({ customerToken, slaonToken });
})  

app.get('/number' , (req, res)=>{
    const number = Math.floor(Math.random() * 1000000);
    return res.json( number );
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});