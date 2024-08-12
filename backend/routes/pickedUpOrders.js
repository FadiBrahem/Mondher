const express = require("express");
const router = express.Router();

const PickedUpClientOrder = require('../models/pickedUpOrders');

router.post("",(req,res,next)=>{
  const PickedUpClientOrder = new PickedUpClientOrder({
    clientName: req.body.clientName,
    clientContact: req.body.clientContact,
    clientID: req.body.clientId,
    clientEmail: req.body.clientEmail,
    productNames: req.body.productName,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });

  PickedUpClientOrder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Picked Up client Order Added Successfully',
    clientOrderId : createdCliOrder._id
    });
  });
});

router.get("",(req,res,next)=>{
  PickedUpClientOrder.find().then(documents=>{
    res.status(200).json({
      message : 'client picked up order added sucessfully',
      clientOders :documents
    });
  });
});





  module.exports = router;
