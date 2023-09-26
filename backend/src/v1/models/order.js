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
                item_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Cart",
                    required: true,
                }
            }
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered"],
            default: "pending",
        },
        address: { type: String, required: true },
        note: { type: String, default: "" },
    },
    schemaOptions
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;