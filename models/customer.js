const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({  
  customer_id: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("customers", customerSchema);
