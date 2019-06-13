const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditOtherSaleSchema = new Schema({
    creditCustomerId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'CreditCustomer'},
    orderNo:{type:String,required:false},
    //invoiceNo:{type:ObjectId,required:true},
    itemList:[{
        stockId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Stock'},
        quntity:{type:Number,required:true},
        pricePerUnit:{type:Number,required:true}
    }],
    total:{type:Number,required:true},
    date:{type:Date,required:true}

});

module.exports = mongoose.model('CreditOtherSale',creditOtherSaleSchema);