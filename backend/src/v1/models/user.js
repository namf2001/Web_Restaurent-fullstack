// models/user.js
const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String },
        phone: { type: String },
    },
    schemaOptions
);

const User = mongoose.model("User", userSchema);

module.exports = User;
