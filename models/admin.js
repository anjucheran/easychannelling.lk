var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : String,
    contact: String,
    birthday: Date,
    gender : String,
    nic : String,
    address : String
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;