/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const { createReview, getReviewsByProduct, checkPurchaseStatus  } = require("../controllers/review");

router.post("/:foodItemId", verifyToken, createReview);
router.get("/:foodItemId", getReviewsByProduct);
router.get("/check/:productId", verifyToken, checkPurchaseStatus);

module.exports = router;
