const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    sender: {type: String},
    date: {type: String},
    text: {type: String},
    comments: {type: [String]}

});

module.exports = mongoose.model("posts", userSchema);