/** @format */

const Review = require("../models/review");
const FoodItem = require("../models/foodItem");
const Cart = require("../models/cart");

// Tạo một đánh giá mới
const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const foodItemId = req.params.foodItemId;
    const userId = req.user._id;

    try {
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        
        // Kiểm tra xem người dùng 
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Người dùng không tồn tại",
            });
        }

        const newReview = new Review({
            userId,
            foodItemId,
            rating,
            comment,
        });

        await newReview.save();
        // Thêm review vào sản phẩm
        foodItem.reviews.push(newReview._id);
        await foodItem.save();
        
        res.status(201).json({
            success: true,
            rating: newReview,
            message: "Đánh giá thành công",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Lấy tất cả đánh giá của một sản phẩm
const getReviewsByProduct = async (req, res) => {
    try {
        const foodItemId = req.params.foodItemId;
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        const reviews = await Review.find({ foodItemId })
            .populate("userId", "username avatar")
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

const checkPurchaseStatus = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user._id;
        // Kiểm tra xem người dùng có tồn tại không
        if (!userId) {
            return res.status(404).json({
                purchased: false,
                reviewed: false,
                message: "Người dùng không tồn tại",
            });
        }
        const foodItem = await FoodItem.findById(productId);
        if (!foodItem) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        const purchased = await Cart.findOne({
            userId: userId,
            foodId: productId,
            status: "delivered",
        });

        const isPurchased = !!purchased;

        // neu nguoi dung da mua hang thi xem ho da danh gia chua
        if (isPurchased) {
            const review = await Review.findOne({
                userId: userId,
                foodItemId: productId,
            });
            if (review) {
                return res.status(200).json({
                    purchased: isPurchased,
                    reviewed: true,
                    message: "Đã mua hàng và đã đánh giá",
                });
            }
        }

        res.status(200).json({
            purchased: isPurchased,
            reviewed: false,
            message: isPurchased ? "Đã mua hàng" : "Chưa mua hàng",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    createReview,
    getReviewsByProduct,
    checkPurchaseStatus,
};
