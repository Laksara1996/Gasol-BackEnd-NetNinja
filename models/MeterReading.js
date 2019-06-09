const mongoose =require('mongoose');

const meterReadingSchema = new mongoose.Schema({
    pumpId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Pump'},
    reading:{type:Number,required:true},
    date:{type:Date,required:true}
});
module.exports = mongoose.model('MeterReading',meterReadingSchema);