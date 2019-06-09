const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditCustomerSchema = new Schema({
    name:String,
    address:String,
    phoneNo:String,
    creditLimit:Number

});

module.exports = mongoose.model('CreditCustomer',creditCustomerSchema);