const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    slotId: { type: String, required: true },
    salonId : { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum:['available','held','booked', 'completed'], default: 'available', required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model("slots", slotSchema);
