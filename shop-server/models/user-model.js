const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    city: String,
    street: String,
    name: String,
    lastName: String,
    role: String,
    shipments: Array
}, { versionKey: false });

const User = mongoose.model("User", userSchema, "users");

module.exports = User;

