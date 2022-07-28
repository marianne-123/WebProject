const mongoose = require("mongoose");

/* Model for posts. One post has a sender, date, text that includes 
the post itself and a list of comments that is initially empty */

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    sender: {type: String},
    date: {type: String},
    text: {type: String},
    comments: {type: [String]}

});

module.exports = mongoose.model("posts", userSchema);