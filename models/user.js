var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    // email : String,
    // password: String,
    // name : String,
    // contact: String,
    username : String,
    password: String,
    usertype: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;