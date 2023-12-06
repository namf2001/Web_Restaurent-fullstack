/** @format */

const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number, // Số thứ tự của bàn
            unique: true, // Đảm bảo số thứ tự duy nhất cho mỗi bàn
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        capacity: {
            type: Number, // Sức chứa của bàn (số lượng người có thể ngồi)
            required: true,
        },
        status: {
            type: String, // Trạng thái của bàn (đang trống, đã đặt, v.v.)
            enum: ["Available", "Reserved", "Occupied", "Closed"],
            default: "Available", // Trạng thái mặc định
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: false,
    }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
