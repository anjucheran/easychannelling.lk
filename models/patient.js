var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : String,
    contact: String,
    birthday: Date,
    gender : String,
    nic : String,
    address : String
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;