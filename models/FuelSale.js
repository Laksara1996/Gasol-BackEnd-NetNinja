const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fuelSaleSchema = new Schema({

    fuelType:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'FuelType'},
    amount:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    date:{type:Date,required:true}

});

module.exports = mongoose.model('FuelSale',fuelSaleSchema);