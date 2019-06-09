const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    creditCustomerId:String,
    regiterdNo: String,
    fuelTypeId: String

});

module.exports = mongoose.model('Vehicle',vehicleSchema);