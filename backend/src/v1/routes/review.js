/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    createReview,
    getReviewsByProduct,
    checkPurchaseStatus,
    likeReview,
    dislikeReview,
} = require("../controllers/review");

router.post("/:foodItemId", verifyToken, createReview);
router.get("/:foodItemId", getReviewsByProduct);
router.get("/check/:productId", verifyToken, checkPurchaseStatus);
router.post("/like/:reviewId", verifyToken, likeReview);
router.post("/dislike/:reviewId", verifyToken, dislikeReview);

module.exports = router;
