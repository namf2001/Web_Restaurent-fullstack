const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const reviewSchema = new mongoose.Schema(
    {
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    schemaOptions
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;