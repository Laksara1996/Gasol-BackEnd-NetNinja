const mongoose =require('mongoose');

const creditCustomerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:false},
    phoneNo:{type:String,required:false},
    creditLimit:{type:Number,required:true},
    currentCredit:{type:Number,required:true},
    vehicles:[
        {type:mongoose.SchemaTypes.ObjectId, ref:'Vehicle'}
    ]
});
module.exports = mongoose.model('CreditCustomer',creditCustomerSchema);