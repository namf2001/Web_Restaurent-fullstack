const FoodItem = require("../models/foodItem");

const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
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

const getFoodItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                errors: [
                    {
                        param: "id",
                        msg: "Food item not found!",
                    },
                ],
            });
        }
        res.status(200).json({ foodItem });
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

const createFoodItem = async (req, res) => {
    const { name, description, price, category, image, quantity } = req.body;
    try {
        const foodItem = await FoodItem.create({
            name,
            description,
            price,
            category,
            image,
            quantity,
        });
        res.status(201).json(foodItem);
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

const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findByIdAndUpdate(
            id,
            { $set: req.body }
        );
        if (!foodItem) {
            return res.status(404).json({
                errors: [
                    {
                        param: "id",
                        msg: "Food item not found!",
                    },
                ],
            });
        }
        res.status(200).json({ foodItem });
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

const deleteFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findByIdAndDelete(id);
        if (!foodItem) {
            return res.status(404).json({
                errors: [
                    {
                        param: "id",
                        msg: "Food item not found!",
                    },
                ],
            });
        }
        res.status(200).json({ foodItem });
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

module.exports = {
    getAllFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
};
