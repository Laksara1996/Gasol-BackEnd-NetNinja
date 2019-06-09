const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    productId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Product'},
    quntity:{type:Number,required:true},
    availableQuntity:{type:Number,required:true},
    price:{type:Number,required:true},
    commission:{type:Number,required:true},
    date:{type:Date,required:true}

});

module.exports = mongoose.model('Stock',stockSchema);