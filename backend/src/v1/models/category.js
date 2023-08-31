const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
    },
    schemaOptions
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
