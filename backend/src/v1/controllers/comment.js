/** @format */

// them cac chuc nang cho comment
const Comment = require("../models/comment");
const Reply = require("../models/reply");
const FoodItem = require("../models/foodItem");
const User = require("../models/user");
const Review = require("../models/review");

// them comment
const addComment = async (req, res) => {
    const { comment } = req.body;
    const foodItemId = req.params.id;
    const userId = req.user._id;
    //check foodItemId
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        return res.status(404).json({
            success: false,
            message: "Food item not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //create new comment
    try {
        const newComment = new Comment({
            comment,
            foodItemId,
            userId,
        });
        await newComment.save();
        // them comment vao Review
        const review = await Review.findOne({ foodItemId });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }
        review.comments.push(newComment._id);
        await review.save();
        res.status(201).json({
            success: true,
            message: "Add comment successfully",
            data: newComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// them reply

const addReply = async (req, res) => {
    const { reply, commentId } = req.body;
    const userId = req.user._id;
    //check commentId
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //create new reply
    try {
        const newReply = new Reply({
            reply,
            commentId,
            userId,
        });
        await newReply.save();
        // them reply vao comment
        comment.replies.push(newReply._id);

        res.status(201).json({
            success: true,
            message: "Add reply successfully",
            data: newReply,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// them like cho comment
const likeComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;
    //check commentId
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //check user da like chua neu roi thi xoa khoi mang like
    if (comment.like.includes(userId)) {
        comment.like.pull(userId);
        await comment.save();
        return res.status(400).json({
            success: false,
            message: "You already liked this comment",
        });
    }
    //update like
    try {
        comment.like.push(userId);
        await comment.save();
        res.status(200).json({
            success: true,
            message: "Like comment successfully",
            data: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// them dislike cho comment
const dislikeComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;
    //check commentId
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //check user da dislike chua
    if (comment.dislike.includes(userId)) {
        comment.dislike.pull(userId);
        await comment.save();
        return res.status(400).json({
            success: false,
            message: "You already dislike this comment",
        });
    }
    //update like
    try {
        comment.dislike.push(userId);
        await comment.save();
        res.status(200).json({
            success: true,
            message: "dislike comment successfully",
            data: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// them like cho reply
const likeReply = async (req, res) => {
    const replyId = req.params.id;
    const userId = req.user._id;
    //check replyId
    if (!replyId) {
        return res.status(404).json({
            success: false,
            message: "Reply not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //check user da like chua
    if (reply.like.includes(userId)) {
        reply.like.pull(userId);
        await reply.save();
        return res.status(400).json({
            success: false,
            message: "You already liked this reply",
        });
    }

    //update like
    try {
        reply.like.push(userId);
        await reply.save();
        res.status(200).json({
            success: true,
            message: "Like reply successfully",
            data: reply,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// them dislike cho reply
const dislikeReply = async (req, res) => {
    const replyId = req.params.id;
    const userId = req.user._id;

    //check replyId
    if (!replyId) {
        return res.status(404).json({
            success: false,
            message: "Reply not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    //check user da dislike chua
    if (reply.dislike.includes(userId)) {
        reply.dislike.pull(userId);
        await reply.save();
        return res.status(400).json({
            success: false,
            message: "You already dislike this reply",
        });
    }

    //update dislike
    try {
        reply.dislike.push(userId);
        await reply.save();
        res.status(200).json({
            success: true,
            message: "dislike reply successfully",
            data: reply,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// lay tat ca comment cua foodItem
const getAllComment = async (req, res) => {
    const foodItemId = req.params.id;
    try {
        const comments = await Comment.find({ foodItemId }).populate({
            path: "userId",
            select: "name avatar",
        }).populate({
            path: "replies",
            populate: {
                path: "userId",
                select: "name avatar",
            },
        });
        res.status(200).json({
            success: true,
            message: "Get all comment successfully",
            data: comments,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// update comment
const updateComment = async (req, res) => {
    const { comment } = req.body;
    const commentId = req.params.id;
    const userId = req.user._id;
    //check commentId
    const commentUpdate = await Comment.findById(commentId);
    if (!commentUpdate) {
        return res.status(404).json({
            success: false,
            message: "Comment not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    //update comment
    try {
        commentUpdate.comment = comment;
        await commentUpdate.save();
        res.status(200).json({
            success: true,
            message: "Update comment successfully",
            data: commentUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// update reply
const updateReply = async (req, res) => {
    const { reply } = req.body;
    const replyId = req.params.id;
    const userId = req.user._id;
    //check replyId
    if (!replyId) {
        return res.status(404).json({
            success: false,
            message: "Reply not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    //update reply
    try {
        replyUpdate.reply = reply;
        await replyUpdate.save();
        res.status(200).json({
            success: true,
            message: "Update reply successfully",
            data: replyUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// delete comment
const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;
    //check commentId
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    //delete comment
    try {
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({
            success: true,
            message: "Delete comment successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// delete reply
const deleteReply = async (req, res) => {
    const replyId = req.params.id;
    const userId = req.user._id;
    //check replyId
    if (!replyId) {
        return res.status(404).json({
            success: false,
            message: "Reply not found",
        });
    }
    //check userId
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    //delete reply
    try {
        await Reply.findByIdAndDelete(replyId);
        res.status(200).json({
            success: true,
            message: "Delete reply successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    addComment,
    addReply,
    likeComment,
    dislikeComment,
    likeReply,
    dislikeReply,
    getAllComment,
    updateComment,
    updateReply,
    deleteComment,
    deleteReply,
};