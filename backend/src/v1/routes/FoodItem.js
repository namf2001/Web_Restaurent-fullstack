/** @format */

const router = require("express").Router();
const { param } = require("express-validator");
const { validate } = require("../middleware/validation");
const { verifyToken } = require("../middleware/tokenHandler");
const {
    getAllFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    addWishList,
} = require("../controllers/foodItem");

router.get("/", getAllFoodItems);
router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid food item id"),
    validate,
    getFoodItemById
);

router.post("/", verifyToken, createFoodItem);

router.put(
    "/:id",
    verifyToken,
    param("id").isMongoId().withMessage("Invalid food item id"),
    validate,
    updateFoodItem
);

router.delete(
    "/:id",
    verifyToken,
    param("id").isMongoId().withMessage("Invalid food item id"),
    validate,
    deleteFoodItem
);

router.post(
    "/:id/wishlist",
    verifyToken,
    param("id").isMongoId().withMessage("Invalid food item id"),
    validate,
    addWishList
);

module.exports = router;
