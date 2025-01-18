const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const Slot = require('../models/Slots');
const ServiceInfo = require('../models/ServiceInfo');
const Service = require('../models/Services');
const authenticate = require('../middleware/authenticate');

router.post('/service', async (req, res) => {
  try {
    const service = new Service({
      serviceId: uuidv4(),
      serviceName: req.body.serviceName
    });
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.post('/slot', async (req, res) => {
  const { salonId, startTime, endTime, price } = req.body;

  try {
    const slot = new Slot({
      slotId: uuidv4(),
      salonId: salonId,
      startTime: startTime,
        endTime: endTime,
        price: price
    });

    await slot.save();
    res.status(201).send(slot);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/service-info', async (req, res) => {    
    const { salonId, serviceId, price, timeRequired  } = req.body;
    
    const serviceInfo = await ServiceInfo.findOne( {salonId: salonId} );

    if(serviceInfo){
        const service = {
            serviceId: serviceId,
            price: price,
            timeRequired: timeRequired
        };
        
          serviceInfo.servicesOffered.push(service);
          await serviceInfo.save();
          return res.status(201).json({ "konsa":"upperWala" ,serviceInfo });

    } else{

        const newServiceInfo = new ServiceInfo({
            salonId: salonId,
            servicesOffered: [
                {
                    serviceId: serviceId,
                    price: price,
                    timeRequired: timeRequired
                }
            ]
        });
        await newServiceInfo.save();
        return res.status(201).send.json({ "konsa":"nicheWala" , newServiceInfo });

    }

    try{
        const serviceInfo = await ServiceInfo.findOne( {salonId: salonId} );
        console.log(serviceInfo);
        if(serviceInfo){
            const service = {
                serviceId: serviceId,
                price: price,
                timeRequired: timeRequired
              };
            
              serviceInfo.ServicesOffered.push(service);
              await serviceInfo.save();
              res.status(201).send(serviceInfo);

    }
    else{
        const newServiceInfo = new ServiceInfo({
            salonId: salonId,
            servicesOffered: [
                {
                    serviceId: serviceId,
                    price: price,
                    timeRequired: timeRequired
                }
            ]
        });
        await newServiceInfo.save();
        const services = await ServiceInfo.find({ salonId: salonId });
        res.status(201).send(newServiceInfo);
    }
    }
    catch(error){
        res.status(400).send(error);
    }
});


module.exports = router;