const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    productId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Product'},
    stockId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Stock'},
    quntity:{type:Number,required:true},
    price:{type:Number,required:true},
    commission:{type:Number,required:true},
    total:{type:Number,required:true},
    profit:{type:Number,required:true},
    date:{type:Date,required:true}

});

module.exports = mongoose.model('sale',saleSchema);