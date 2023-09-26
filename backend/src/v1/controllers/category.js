/** @format */

const Category = require("../models/category");
const FoodItem = require("../models/foodItem");

const create = async (req, res) => {
    try {
        const categoriesCount = await Category.find().count();
        const category = await Category.create({
            position: categoriesCount > 0 ? categoriesCount : 0,
        });
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getAll = async (req, res) => {
    try {
        const categories = await Category.find().sort({ position: 1 });
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json(category);
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

const update = async (req, res) => {
    const { id } = req.params;
    
    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { $set: { ...req.body } },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndRemove(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
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
    create,
    getAll,
    getById,
    update,
    remove,
};
