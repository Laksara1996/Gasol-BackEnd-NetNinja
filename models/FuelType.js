const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fuelTypeSchema = new Schema({
    name:{type:String,required:true},
    priceList:[
        {
          price:{type:Number,required:true},
          commission:{type:Number,required:true},
          date:{type:Date,required:true}
        }
    ]

});

module.exports = mongoose.model('FuelType',fuelTypeSchema);