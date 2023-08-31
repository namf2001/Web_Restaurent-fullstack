const Category = require("../models/category");
const FoodItem = require("../models/foodItem");

const create = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: [
                {
                    param: "server",
                    msg: err.message || "Something went wrong!",
                },
            ],
        });
    }
};