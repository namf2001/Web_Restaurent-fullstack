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

        // tôi muốn kết quả trả về có thêm thông tin của người dùng
        // nên tôi sẽ populate userId
        await newReview.populate("userId", "username avatar");

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

const likeReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user._id;
        // Kiểm tra xem người dùng có tồn tại không
        if (!userId) {
            return res.status(404).json({
                liked: false,
                message: "Người dùng không tồn tại",
            });
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Đánh giá không tồn tại" });
        }

        const isLiked = review.likes.includes(userId);

        // neu nguoi dung da like thi unlike
        if (isLiked) {
            review.likes.pull(userId);
            await review.save();
            return res.status(200).json({
                liked: false,
                message: "Unlike thành công",
                review: review,
            });
        }

        // neu nguoi dung da dislike thi undislike
        if (review.dislikes.includes(userId)) {
            review.dislikes.pull(userId);
            await review.save();
        }

        review.likes.push(userId);
        await review.save();

        res.status(200).json({
            liked: true,
            message: "Like thành công",
            review: review,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

const dislikeReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user._id;
        // Kiểm tra xem người dùng có tồn tại không
        if (!userId) {
            return res.status(404).json({
                liked: false,
                message: "Người dùng không tồn tại",
            });
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Đánh giá không tồn tại" });
        }

        const isDisliked = review.dislikes.includes(userId);

        // neu nguoi dung da dislike thi undislike
        if (isDisliked) {
            review.dislikes.pull(userId);
            await review.save();
            return res.status(200).json({
                disliked: false,
                message: "Undislike thành công",
                review: review,
            });
        }

        // neu nguoi dung da like thi unlike
        if (review.likes.includes(userId)) {
            review.likes.pull(userId);
            await review.save();
        }

        review.dislikes.push(userId);
        await review.save();

        res.status(200).json({
            disliked: true,
            message: "Dislike thành công",
            review: review,
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
    likeReview,
    dislikeReview,
};
