var mongoose = require("mongoose");

var centreSchema = new mongoose.Schema({
    name : String,
    SLMAnum : String,
    address : String,
    contact : String,
    doctors : [{type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}],
    operators : [{type: mongoose.Schema.Types.ObjectId, ref: 'Opertor'}]
});

var Centre = mongoose.model('Centre', centreSchema);

module.exports = Centre;