/** @format */

const Cart = require("../models/cart");
const Food = require("../models/foodItem");

const addToCart = async (req, res, next) => {
    try {
        const userId = req.user;
        const foodToAddToCart = req.params.id.toString();
        let qty = req.params.qty;

        const foundFood = await Food.findById(foodToAddToCart);

        if (!foundFood) {
            return res.status(404).json("Food not found");
        }

        const findUsersCart = await Cart.find({
            userId: userId._id,
            status: "pending",
        });

        const existingCartItem = findUsersCart.find((eachItemInUserCart) => {
            return (
                eachItemInUserCart.foodId.toString() ===
                foundFood._id.toString()
            );
        });

        if (existingCartItem) {
            // If the product already exists in the cart, update its quantity.
            existingCartItem.quantity += parseInt(qty);
            await existingCartItem.save();
            const findCartItems = await Cart.find({
                userId: userId._id,
                status: "pending",
            }).populate({
                path: "foodId",
                select: "name image price",
            });

            return res.status(200).json({
                success: true,
                message: `${foundFood.name} quantity was updated to ${existingCartItem.quantity}`,
                data: findCartItems,
            });
        } else {
            // If the product is not in the cart, add it as a new item.
            if (
                (foundFood._id.toString() === foodToAddToCart && qty <= 0) ||
                null ||
                undefined
            ) {
                qty = 1;
            }
            if (foundFood._id.toString() === foodToAddToCart && qty >= 1) {
                await Cart.create({
                    userId: userId._id,
                    foodId: foundFood._id,
                    quantity: qty,
                });

                const findCartItems = await Cart.find({
                    userId: userId._id,
                    status: "pending",
                }).populate({
                    path: "foodId",
                    select: "name image price",
                });

                return res.status(201).json({
                    success: true,
                    message: `${foundFood.name} was added to cart`,
                    data: findCartItems,
                });
            }
        }

        return res
            .status(501)
            .json(
                `This isn't implemented as you have ${foundFood.name} in your cart before`
            );
    } catch (error) {
        next(error);
    }
};

const allCartItem = async (req, res, next) => {
    try {
        const userId = req.user;
        const findUsersCart = await Cart.find({
            userId: userId._id,
            status: "pending",
        }).populate({
            path: "foodId",
            select: "name image price",
        });

        return res.status(200).json(findUsersCart);
    } catch (error) {
        next(error);
    }
};

const editCart = async (req, res, next) => {
    try {
        const userId = req.user;
        const foodItemToUpdate = req.params.id;
        let newQty = req.params.qty;

        const findCart = await Cart.findById(foodItemToUpdate);

        if (
            findCart.userId.toString() == userId._id.toString() &&
            findCart.quantity.toString() !== newQty.toString()
        ) {
            if (newQty <= 0 || null || undefined) {
                return res
                    .status(501)
                    .json("Item can not be less then ONE, so not implemented");
            }
            if (newQty >= 1) {
                await findCart.updateOne({
                    quantity: newQty,
                });
                return res
                    .status(201)
                    .json(`${findCart.foodId} qty was updated to ${newQty}`);
            }
        }
        return res.status(200).json("in it really state nothing happened");
    } catch (error) {
        next(error);
    }
};

const editMessage = async (req, res, next) => {
    try {
        const userId = req.user;
        const foodItemToUpdate = req.params.id;

        const findItem = await Cart.findById(foodItemToUpdate);

        if (
            findItem.userId.toString() == userId._id.toString() &&
            findItem.message.toString() !== req.body.message.toString()
        ) {
            await findItem.updateOne({
                message: req.body.message,
            });
            return res.status(201).json({
                success: true,
                message: `${findItem.foodId} message was updated to ${req.body.message}`,
            });
        }
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user;
        const foodItemToRemove = req.params.id;
        const findUsersCart = await Cart.find({ userId: userId._id });

        const checkCart = findUsersCart.filter((eachItemInUserCart) => {
            return (
                eachItemInUserCart._id.toString() ===
                foodItemToRemove.toString()
            );
        });

        if (
            checkCart.length !== 0 &&
            checkCart !== undefined &&
            checkCart !== null
        ) {
            await Cart.deleteOne({ _id: checkCart[0]._id.toString() });
            return res.status(201).json({
                success: true,
                message: `đã xóa sản phẩm khỏi giỏ hàng`,
                data: checkCart,
            });
        }

        return res.status(200).json("looks like the item was not found");
    } catch (error) {
        next(error);
    }
};

// Lấy danh sách các món ăn được mua nhiều nhất trong hôm nay
const getMostOrderedFoodsToday = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const result = await Cart.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    createdAt: { $gte: today },
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods today:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Lấy danh sách các món ăn được mua nhiều nhất trong tuần nay
const getMostOrderedFoodsThisWeek = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Lấy ngày đầu tuần (Chủ Nhật là ngày 0)

        const result = await Cart.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    createdAt: { $gte: startOfWeek },
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods this week:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Lấy danh sách các món ăn được mua nhiều nhất all the time
const getMostOrderedFoodsAllTime = async (req, res) => {
    try {
        const result = await Cart.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods all time:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMostOrderedFoodsTodayAdmin = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const result = await Cart.aggregate([
            {
                $match: {
                    createdAt: { $gte: today },
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods today:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMostOrderedFoodsThisWeekAdmin = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Lấy ngày đầu tuần (Chủ Nhật là ngày 0)

        const result = await Cart.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek },
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods this week:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMostOrderedFoodsAllTimeAdmin = async (req, res) => {
    try {
        const result = await Cart.aggregate([
            {
                $match: {
                    status: { $in: ["confirmed", "delivered"] },
                },
            },
            {
                $group: {
                    _id: "$foodId",
                    totalOrdered: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "fooditems", // Tên collection của món ăn
                    localField: "_id",
                    foreignField: "_id",
                    as: "foodItem",
                },
            },
            {
                $sort: { totalOrdered: -1 },
            },
            {
                $limit: 10, // Lấy 10 món ăn được mua nhiều nhất
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting most ordered foods all time:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addToCart,
    allCartItem,
    editCart,
    editMessage,
    removeFromCart,
    getMostOrderedFoodsToday,
    getMostOrderedFoodsThisWeek,
    getMostOrderedFoodsAllTime,
    getMostOrderedFoodsTodayAdmin,
    getMostOrderedFoodsThisWeekAdmin,
    getMostOrderedFoodsAllTimeAdmin,
};
