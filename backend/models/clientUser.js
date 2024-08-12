const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const clientUserSchema = mongoose.Schema({
  name: {type: String , require:true},
  contact: {type: String , require:true},
  clientId: {type: String , require:true},
  email: {type: String , require:true, unique:true} ,
  password: {type: String , require:true},
  dateTime: {type: Date, default: Date.now , require:true}
});

clientUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('clientUser',clientUserSchema);
