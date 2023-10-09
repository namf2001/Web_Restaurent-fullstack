/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const reviewSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        menu_item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodItem",
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
        comment: {
            type: String,
        },
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

module.exports = mongoose.model("Review", reviewSchema);
