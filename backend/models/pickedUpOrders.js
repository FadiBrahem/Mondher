const mongoose = require('mongoose');

const pickedUPclientOrderSchema = mongoose.Schema({
  clientName: {type: String , require:true},
  clientContact: {type: String , require:true},
  clientID: {type: String , require:true},
  clientEmail: {type: String , require:true},
  productNames : { type: Array , require: true},
  productPrice: {type: Array , require:true},
  productQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true},
  dateTime: {type: Date, default: Date.now , require:true}
})

module.exports = mongoose.model('PickedUpclientOrder',pickedUPclientOrderSchema);
