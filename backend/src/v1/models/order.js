const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        table_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cart",
                required: true,
            }
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered"],
            default: "pending",
        },
        payment_status: { type: String },
        // lấy phone và address từ user
        phone: { type: String, required: true, trim: true },
        address: { type: String, trim: true },
        note: { type: String, default: "" },
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

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;