const mongoose =require('mongoose');

const tankSchema = new mongoose.Schema({
    
    name:{type:String,required:true},
    fuelTypeId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'FuelType'},
    capacity:{type:Number,required:true},
    availableAmount:{type:Number,required:true},
    reservoir:{type:Number,required:true},
    pumps:[{type:mongoose.SchemaTypes.ObjectId , ref:'Pump'}]
});
module.exports = mongoose.model('Tank',tankSchema);