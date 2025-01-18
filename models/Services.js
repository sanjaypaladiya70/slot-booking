const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true }
});

module.exports = mongoose.model("services", serviceSchema);
