var mongoose = require("mongoose");

var operatorSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : String,
    contact: String,
    birthday: Date,
    gender : String,
    nic : String,
    address : String,
    centre : {type: mongoose.Schema.Types.ObjectId, ref: 'Centre'}
});

var Operator = mongoose.model('Operator', operatorSchema);

module.exports = Operator;