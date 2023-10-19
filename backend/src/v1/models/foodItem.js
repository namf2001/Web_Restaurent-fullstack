/** @format */

// models/foodItem.js
const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        image: { type: String },
        background: {
            type: String,
            default: "https://source.unsplash.com/random/800x600",
        },
        quantity: { type: Number, required: true },
        isAvailable: { type: Boolean, default: true },
        discount: { type: Number, default: 0 },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        highlights: [
            {
                type: String,
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

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
