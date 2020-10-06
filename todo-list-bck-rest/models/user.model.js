const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        todoList: [{
            key: String,
            text: String,
            date: Date
        }],
        // roles: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Role"
        //     }
        // ],
        tokenVersion: Number,
        facebookID: String
    })
);

module.exports = User;