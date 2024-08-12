const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// var handlebars = require('handlebars');
// var fs = require('fs');

const ClientOrder = require('../models/clientOrders');


router.post("",(req,res,next)=>{
  const CliOrder = new ClientOrder({
   clientName: req.body.clientName,
   clientContact: req.body.clientContact,
   clientID: req.body.clientId,
   clientEmail: req.body.clientEmail,
    productId: req.body.productId,
    productNames: req.body.productName,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
    realQuantity: req.body.realQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });
  ClientOrder.save().then(createdClientOrder=>{
  res.status(201).json({
    message:'client Order Added Successfully',
    clientOrderId : createdClientOrder._id
  });

  });

  });

  router.get("",(req,res,next)=>{
    clientOrder.find().then(documents=>{
      res.status(200).json({
        message : 'client Order added sucessfully',
        clientOrders :documents
      });
    });
  });

  router.delete("/:id", (req, res, next) => {
    clientOrders.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'client order deleted!' });
    });
  });

  router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });


  async function sendMail(user, callback) {
    // reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "fadibrahem@hotmail.fr",
        pass: "matildaabadeer123"
      }
    });

    let mailOptions = {
      from: '"Mondher"<example.gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "We Recived Your Orders 👻", // Subject line
      html: `
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script>

            $(function(){
              var results = [], row;
              $('#table1').find('th, td').each(function(){
                  if(!this.previousElementSibling && typeof(this) != 'undefined'){ //New Row?
                      row = [];
                      results.push(row);
                  }
                  row.push(this.textContent || this.innerText); //Add the values (textContent is standard while innerText is not)
              });
              console.log(results);
          });

        </script>
        </head>

      <body>
      <h1>Hey Dr. ${user.name}</h1><br>
      <h3>Thanks for the placing Orders us </h3><br>
      <h2>Your Orders has been verified</h2><br>
      <h3>You can pick up the Ordersed packaged on or after ${user.pickupDate}</h3>

      <h2>These is the Orders you placed on our online shop</h2>

      <table id="table1">
        <tr>
          <th>Ordersed product Name</th>
          <th>product Quantity</th>
          <th>Price per unit (Rs.)</th>
        </tr>
        <tr>
          <td>${user.productName[0]}</td>
          <td>${user.productQuantity[0]}</td>
          <td>${user.productPrice[0]}</td>
        </tr>
        <tr>
          <td>${user.productName[1]}</td>
          <td>${user.productQuantity[1]}</td>
          <td>${user.productPrice[1]}</td>
        </tr>
        <tr>
          <td>${user.productName[2]}</td>
          <td>${user.productQuantity[2]}</td>
          <td>${user.productPrice[2]}</td>
        </tr>
        <tr>
          <td>${user.productName[3]}</td>
          <td>${user.productQuantity[3]}</td>
          <td>${user.productPrice[3]}</td>
        </tr>
        <tr>
          <td>${user.productName[4]}</td>
          <td>${user.productQuantity[4]}</td>
          <td>${user.productPrice[4]}</td>
        </tr>
        <tr>
          <td>${user.productName[5]}</td>
          <td>${user.productQuantity[5]}</td>
          <td>${user.productPrice[5]}</td>
        </tr>
        <tr>
          <td>${user.productName[6]}</td>
          <td>${user.productQuantity[6]}</td>
          <td>${user.productPrice[6]}</td>
        </tr>
      </table><br>
      <h2>Total Amount :Rs. ${user.total}</h2><br>
      <h3>Info* : </h3>
      <h4>If there is any issue reagrding the Orders please be free to contact us or email us (pharmacare.contactus@gmail.com) 😃 </h4>
      </body>
      `
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  }


  module.exports = router;
