/** @format */

const Order = require("../models/order");
const Cart = require("../models/cart");

const createOrder = async (req, res) => {
    try {
        const userId = req.user;
        const { items, total, note, address } = req.body;
        const order = await Order.create({
            user_id: userId._id,
            items,
            total,
			note,
			address,
        });
        // update status of cart items to confirmed
        await Cart.updateMany(
            { _id: { $in: items } },
            { $set: { status: "confirmed" } }
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

getOrder = async (req, res, next) => {
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

updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getAllOrders, getOrder, updateOrderStatus };
