var mongoose = require("mongoose");

var doctorSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : String,
    contact: String,
    birthday: Date,
    gender : String,
    nic : String,
    address : String,
    slmareg : String,
    category : String
});

var Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;