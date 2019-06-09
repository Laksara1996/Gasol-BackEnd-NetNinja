const mongoose =require('mongoose');

const creditPaymentSchema = new mongoose.Schema({
    creditCustomerId:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'CreditCustomer'},
    paidAmount:{type:Number,required:true},
    paymentType:{type:String,required:true},
    chequeNo:{type:String},
    date:{type:Date,required:true}
});
module.exports = mongoose.model('CreditPayment',creditPaymentSchema);