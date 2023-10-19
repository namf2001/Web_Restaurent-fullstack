/** @format */

const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference đến model người dùng
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference đến model người dùng, cho người dùng đã like reply
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference đến model người dùng, cho người dùng đã dislike reply
            },
        ],
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

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
