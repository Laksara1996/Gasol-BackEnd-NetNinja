const mongoose =require('mongoose');

const pumpSchema = new mongoose.Schema({
    tankId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Tank'},
    name:{type:String,required:true}
});
module.exports = mongoose.model('Pump',pumpSchema);