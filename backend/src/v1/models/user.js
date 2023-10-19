// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String },
        phone: { type: String },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        avatar: { type: String },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem",
            },
        ],
    },
        {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
