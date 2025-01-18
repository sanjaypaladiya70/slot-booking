const express = require('express');
const router = express.Router();
const Slot = require('../models/Slots');
const Booking = require('../models/bookings');

const authenticate = require('../middleware/authenticate');
const mongoose = require('mongoose');


// Get available slots for a salon based on selected services
router.get('/getAvailableSlots', async (req, res) => {
    const { salonId, ServiceIds } = req.body;
  
    if (!salonId || !ServiceIds || !ServiceIds.length) {
      return res.status(400).json({ message: 'SalonId and ServiceIds are required.' });
    }
  
    try {
      // Fetch service durations for the given ServiceIds
      const services = await ServiceInfo.findOne({ SalonId: salonId });
  
      if (!services) {
        return res.status(404).json({ message: 'Salon not found or has no services.' });
      }
  
      // Extract offered service IDs from the salon's services
      const offeredServiceIds = services.ServicesOffered.map(s => s.ServiceId);
  
      // Check for any missing services
      const missingServices = ServiceIds.filter(id => !offeredServiceIds.includes(id));
  
      if (missingServices.length > 0) {
        return res.status(400).json({
          message: 'The salon does not offer all the required services.',
          missingServices
        });
      }
  
      // Calculate total duration
      const totalDuration = ServiceIds.reduce((sum, serviceId) => {
        const matchedService = services.ServicesOffered.find(s => s.ServiceId === serviceId);
        return sum + (matchedService ? matchedService.timeRequired : 0);
      }, 0);
  
      // Fetch available slots
      const availableSlots = await Slots.find({
        salonId: salonId,
        endTime: { $gt: new Date(currentTime).getTime() + totalDuration * 60 * 1000 },
        isBooked: false
      });
  
      res.status(200).json({ availableSlots });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching slots.', error: err.message });
    }
  });
  
// // Select and hold a slot
// router.post('/hold', authenticate, async (req, res) => {
//     const { slotId} = req.body;
//     const customerId = req.user.id;

//     const slot = await Slot.findByIdAndUpdate(slotId, { status: 'held' }, { new: true });

//     if (slot) {
        
//         try{
//             const booking = new Booking({
//                 slotId: slotId,
//                 customerId: customerId,
//                 salonId : slot.salonId,
//                 status: 'not-booked',
//                 paymentStatus: 'pending booking fee'
//             });
//             await booking.save();
//             return res.json({ message: 'Slot held successfully', slot, booking });

//         } catch(err){
//             return res.status(400).send(err);    }

//     } else {
//         res.status(400).json({ message: 'Slot not available' });
//     }
// });

// Get slot status
router.get('/:slotId/status', authenticate, async (req, res) => {
    const { slotId } = req.params;
    console.log(slotId);
    const slot = await Slot.find( { slotId:slotId } );

    if (slot) {
        res.json({ status: slot.status });
    } else {
        res.status(400).json({ message: 'Slot not found' });
    }
});

module.exports = router;
