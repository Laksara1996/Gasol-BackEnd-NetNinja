const mongoose =require('mongoose');

const tankRecordSchema = new mongoose.Schema({
    
    tankId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Tank'},
    recordType:{type:String,required:true},
    inhandBalance:{type:Number,required:true},
    amount:{type:Number,required:true},
    expectedBalance:{type:Number,required:true},
    realBalance:{type:Number,required:true},
    pricePerUnit:{type:Number,required:true},
    commission:{type:Number,required:true},
    date:{type:Date,required:true},
});
module.exports = mongoose.model('TankRecord',tankRecordSchema);