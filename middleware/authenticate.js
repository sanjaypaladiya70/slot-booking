const express = require('express');
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];   // accessing index 1 of array
  // Bearer eyJhbG----I6IkpXVCJ9.eyJzd----F0IjoxNTE2MjM5MDIyfQ.SflKxwRJ----SM_D3kwY3o2R4n6wJ0w

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    console.log("decoded = " + decoded);
    req.user = decoded; // Attach decoded token data to the request object
    console.log("req.user = " + req.user);
    console.log(typeof req.user);
    const [ field1 , field2 ] = req.user;

    console.log("field1 = " + field1);
    console.log("field2 = " + field2);

    const { customerId } = req.user;
console.log("customerId = ", customerId); 

    
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

  module.exports = authenticate;