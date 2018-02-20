var mongoose = require("mongoose");

var ownerSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : String,
    contact: String,
    birthday: Date,
    gender : String,
    nic : String,
    address : String,
    centres : [{type: mongoose.Schema.Types.ObjectId, ref: 'Centre'}]
});

var Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;