// models/foodItem.js
const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

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
        rating: { type: Number, default: 0 },
        highlights: [
            {
                type: String,
            },
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    schemaOptions
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
