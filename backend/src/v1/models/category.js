/** @format */

const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, default: "Untitled" },
        position: {
            type: Number,
        },
        description: {
            type: String,
            default: "Thêm miêu tả cho loại sản phẩm ...",
        },
        image: { type: String, default: "https://via.placeholder.com/150" },
        status: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
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

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
