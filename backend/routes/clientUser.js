const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkClientAuth = require("../middleware/check-cliAuth");

const ClientUser = require('../models/clientUser');

router.post("/clientSignup",(req,res,next)=>{

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const clientUser = new ClientUser({
        name : req.body.name,
        contact : req.body.contact,
        cliId : req.body.cliId,
        email : req.body.email,
        password : hash
      });

      clientUser.save()
        .then(result =>{
          res.status(201).json({
            message : 'Client Account created!',
            result: result
          });
        })

        .catch(err =>{
          res.status(500).json({
            error :err
          });
        });
    })

});


router.post("/clientLogin" , (req, res ,  next)=>{
  let fetchedUser;
  clientUser.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result =>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , userId : fetchedUser ._id, name:fetchedUser.name, contact:fetchedUser.contact , cliId:fetchedUser.cliId} ,
      'this_is_the_webToken_secret_key' ,
      { expiresIn : "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        email: fetchedUser.email,
        contact: fetchedUser.contact,
        cliId: fetchedUser.cliId,
      });
  })
  .catch(err =>{
    return res.status(401).json({
      message: "Auth failed"
    });
  });
})

router.get("/getclientUserData",(req,res,next)=>{
  ClientUser.find().then(cliuments=>{
    res.status(200).json({
      message : 'client added sucessfully',
      clients :cliuments
    });
  });
});

router.get("/:id",(req,res,next)=>{
  ClientUser.findById(req.params.id).then(client =>{
    if(client){
      res.status(200).json(client);
    }else{
      res.status(200).json({message:'client not found'});
    }
  });
});

router.put("/:id",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const client = new ClientUser({
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hash
    });

  ClientUser.updateOne({_id: req.params.id}, client)
  .then(result => {
    console.log(result);
    res.status(200).json({message : "Update client Successful !"});
  })
  .catch(err =>{
    res.status(500).json({
    error :err
   });
});

})
});

router.delete("/:id",(req, res, next) => {
  ClientUser.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'client deleted!' });
  });
});

router.get("/shoppingcart",(req,res,next)=>{

  console.log("crying to finish this");
});


module.exports = router;
