const express = require('express');
const router = express.Router();
const Service = require('../models/Services');
const authenticate = require('../middleware/authenticate');
const jwt = require("jsonwebtoken");
 

// List all services
router.get('/get-services', authenticate, async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

// Customer selects services
router.post('/select-services', async (req, res) => {
    const { selectedServices} = req.body;
    // const customerId = req.userId;
    // console.log("Customer ID: ", customerId);
    // if(!customerId){
    //     return res.status(400).send("CustomerID not found");
    //         // Storing serviceIds on frontend.
    // }

    // Assuming you have a customer model and a way to update selected services
    // Here we just log the services for demonstration purposes
    // console.log(`Customer ${customerId}, selected services:`, selectedServices);
    res.status(200).json({
        selected: selectedServices
});

});

module.exports = router;
