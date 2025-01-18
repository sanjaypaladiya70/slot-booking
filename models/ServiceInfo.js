const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceId: { 
    type: String, 
    required: true 
  },
  timeRequired: { 
    type: Number, 
    required: true,
    min: 0 // Ensures the time is non-negative
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 // Ensures the price is non-negative
  }
});

const ServiceInfoSchema = new mongoose.Schema({
  salonId: { 
    type: String, 
    required: true 
  },
  servicesOffered: {
    type: [ServiceSchema] }     // Embedding ServiceSchema
  });

module.exports = mongoose.model('serviceinfo', ServiceInfoSchema);
