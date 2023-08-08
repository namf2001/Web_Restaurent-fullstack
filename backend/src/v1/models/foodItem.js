// models/foodItem.js
const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
},
    schemaOptions
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
