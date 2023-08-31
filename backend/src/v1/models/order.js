const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "FoodItem", 
                    required: true,
                },
                quantity: { type: Number, default: 1 },
            },
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered"],
            default: "pending",
        },
    },
    schemaOptions
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;