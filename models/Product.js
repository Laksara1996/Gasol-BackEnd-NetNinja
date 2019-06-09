const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String,required:true},
    units:{type:String,required:true},
    stock:[
        {type:mongoose.SchemaTypes.ObjectId, ref:'Stock'}
    ]

});

module.exports = mongoose.model('Product',productSchema);