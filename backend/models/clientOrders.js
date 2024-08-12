const mongoose = require('mongoose');

const clientOrderSchema = mongoose.Schema({
  clientName: {type: String , require:true},
  clientContact: {type: String , require:true},
  clientID: {type: String , require:true},
  clientEmail: {type: String , require:true},
  productId : { type: Array , require: true},
  productNames : { type: Array , require: true},
  productPrice: {type: Array , require:true},
  productQuantity: {type: Array , require:true},
  realQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true}
})

module.exports = mongoose.model('clientOrder',clientOrderSchema);
