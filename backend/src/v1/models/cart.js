const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    foodId: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
    },

    quantity: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
