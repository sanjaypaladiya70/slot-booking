const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true },
    customerId: { type: String, required: true },
    salonId : { type: String, required: true },
    slotId: { type: String, required: true },
    bookingFor: { type: String },    // Kis k liye booking ki hai
    bookingBy: { type: String },      // Kisne booking ki hai
    startOTP: { type: String },
    endOTP: { type: String },
    status: { type: String, default: 'booked', enum: [ "booked", "in_progress", "service_ended", "completed" ] },
});

module.exports = mongoose.model("bookings", bookingSchema);
