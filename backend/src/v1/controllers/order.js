/** @format */

const mongoose = require("mongoose");
const moment = require("moment");
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const FoodItem = require("../models/foodItem");
const { ObjectId } = mongoose.Types;

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user;
        const { items, total, note, address, id_table } = req.body;
        const { phone } = await User.findById(userId._id);

        const order = id_table ? new Order({
            user_id: userId._id,
            items,
            total,
            note,
            phone,
            id_table,
        }) : new Order({
            user_id: userId._id,
            items,
            total,
            note,
            phone,
            address,
        });

        await order.save();
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

        // Kiểm tra xem id có phải là ObjectId hợp lệ hay không
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id không hợp lệ" });
        }

        const order = await Order.findById(id)
            .populate({
                path: "items",
                populate: {
                    path: "foodId",
                    select: "name image price",
                },
            })
            .sort({ createdAt: -1 });

        if (!order) {
            return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
        }

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

const getTopCustomersLastWeek = async (req, res, next) => {
    try {
        const pipeline = [
            // Group the orders by user_id and calculate the total payment
            {
                $group: {
                    _id: "$user_id",
                    totalPayment: { $sum: "$total" },
                    // tinh tong don hang
                    totalOrders: { $sum: 1 },
                    latestOrder: { $max: "$createdAt" },
                },
            },
            // Lookup user information
            {
                $lookup: {
                    from: "users", // Use the name of your User collection here
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            // Unwind the user array
            { $unwind: "$user" },
            // Sort by the latestOrder field
            { $sort: { latestOrder: -1 } },
            // Project the desired fields
            {
                $project: {
                    _id: 0,
                    username: "$user.username",
                    profileImage: "$user.avatar", // Replace with the actual field name for profile image
                    phone: "$user.phone",
                    totalPayment: 1,
                    totalOrders: 1,
                    latestOrder: 1,
                },
            },
        ];

        const result = await Order.aggregate(pipeline);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi server" });
    }
};

const getOrderCountsByStatusThisWeek = async (req, res, next) => {
    try {
        const pipeline = [
            // Filter orders that are created this week
            {
                $match: {
                    createdAt: {
                        $gte: moment().startOf("week").toDate(),
                        $lte: moment().endOf("week").toDate(),
                    },
                },
            },
            // Group the orders by status and calculate the total payment
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
            // Project the desired fields
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },
        ];

        const result = await Order.aggregate(pipeline);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi server" });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrder,
    getAllOrdersAdmin,
    updateOrderStatus,
    getLatest,
    getTopCustomersLastWeek,
    getOrderCountsByStatusThisWeek,
};
