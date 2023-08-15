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
        category: { type: String, required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
        isAvailable: { type: Boolean, default: true },
        discount: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
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
