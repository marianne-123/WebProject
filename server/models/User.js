const mongoose = require("mongoose");

/* Model for users. Users have username, email and a hashed password. 
Email is not used in this application, the user can register with only a username */

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: {type: String},
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("users", userSchema);
