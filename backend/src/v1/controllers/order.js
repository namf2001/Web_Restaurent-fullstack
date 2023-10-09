/** @format */

const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const FoodItem = require("../models/foodItem");

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user;
        const { items, total, note, address } = req.body;
        const { phone } = await User.findById(userId._id);

        const order = await Order.create({
            user_id: userId._id,
            items,
            total,
            note,
            address,
            phone,
        });
        // update status of cart items to confirmed
        await Cart.updateMany(
            { _id: { $in: items } },
            { $set: { status: "confirmed" } }
        );
        // update order array in user model
        await User.findByIdAndUpdate(
            userId._id,
            { $push: { orders: order._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const userId = req.user;
        const orders = await Order.find({ user_id: userId._id })
            .populate({
                path: "items",
                populate: {
                    path: "foodId",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getAllOrdersAdmin = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({
                path: "items",
                populate: {
                    path: "foodId",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate({
                path: "items",
                populate: {
                    path: "foodId",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 });
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );
        // if order status is delivered, update status of cart items to delivered
        if (status === "delivered") {
            await Cart.updateMany(
                { _id: { $in: order.items } },
                { $set: { status: "delivered" } }
            );
        }
        // tru di 1 so luong food
        if (status === "confirmed") {
            const { items } = order;
            items.forEach(async (item) => {
                const { foodId, quantity } = await Cart.findById(item);
                const food = await FoodItem.findById(foodId);
                const { quantity: foodQuantity } = food;
                await FoodItem.findByIdAndUpdate(
                    foodId,
                    { $set: { quantity: foodQuantity - quantity } },
                    { new: true }
                );
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const getLatest = async (req, res, next) => {
    try {
        const userId = req.user;
        const order = await Order.find({ user_id: userId._id })
            .populate({
                path: "items",
                populate: {
                    path: "foodId",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 })
            .limit(1);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrder,
    getAllOrdersAdmin,
    updateOrderStatus,
    getLatest,
};
