const mongoose =require('mongoose');

const vehicleSchema = new mongoose.Schema({
    creditCustomerId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'CreditCustomer'},
    registerdNo:{type:String,required:false},
    fuelType:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'FuelType'},
   
});
module.exports = mongoose.model('Vehicle',vehicleSchema);