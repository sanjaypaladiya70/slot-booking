const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true },
    bookingId: { type: String, required: true },
    slotId: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending_final_payment', required: true, 
                    enum: [ "pending_final_payment", "done" ] },
    bookingPaymentId: { type: String },
    bookingPaymentTime: { type: Date },
    endPaymentId: { type: String },
    endPaymentTime: { type: Date },
});

module.exports = mongoose.model("payments", paymentSchema);
