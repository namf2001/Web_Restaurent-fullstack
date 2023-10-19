/** @format */

// design commnet model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        // them phan like
        like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference đến model người dùng, cho người dùng đã like comment
            },
        ],
        // them phan dislike
        dislike: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference đến model người dùng, cho người dùng đã dislike comment
            },
        ],
        // them phan tra loi
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply", // Reference đến model Reply, cho các reply trong comment
            },
        ],
        foodItemId: {
            type: Schema.Types.ObjectId,
            ref: "FoodItem",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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

module.exports = mongoose.model("Comment", commentSchema);
