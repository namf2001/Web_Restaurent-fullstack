/** @format */

const FoodItem = require("../models/foodItem");

const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find().sort({ createdAt: -1 });
        res.status(200).json(foodItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getFoodItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
            });
        }
        res.status(200).json(foodItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const createFoodItem = async (req, res) => {
    const { name, description, price, category, image, quantity } = req.body;
    console.log(req.body);
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
            success: false,
            message: "Internal server error",
        });
    }
};

const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findByIdAndUpdate(id, {
            $set: req.body,
        });
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found!",
            });
        }
        res.status(200).json({ foodItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteFoodItem = async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodItem.findByIdAndDelete(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully!",
            data: foodItem,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
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
