const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditFuelSaleSchema = new Schema({
    creditCustomerId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'CreditCustomer'},
    vehicleId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Vehicle'},
    orderNo:{type:String,required:false},
    //invoiceNo:{type:ObjectId,required:true},
    fuelType:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'FuelType'},
    amount:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    date:{type:Date,required:true}

});

module.exports = mongoose.model('CreditFuelSale',creditFuelSaleSchema);