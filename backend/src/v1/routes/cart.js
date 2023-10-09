/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
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
} = require("../controllers/cart");

router.post("/:id/:qty", verifyToken, addToCart);
router.get("/", verifyToken, allCartItem);
router.put("/:id/qty/:qty", verifyToken, editCart);
router.put("/:id/message/", verifyToken, editMessage);
router.delete("/:id", verifyToken, removeFromCart);
router.get("/most-ordered-today", verifyToken, getMostOrderedFoodsToday);
router.get("/most-ordered-this-week", verifyToken, getMostOrderedFoodsThisWeek);
router.get("/most-ordered-all-time", verifyToken, getMostOrderedFoodsAllTime);
router.get("/most-ordered-today-admin", verifyToken, getMostOrderedFoodsTodayAdmin);
router.get("/most-ordered-this-week-admin", verifyToken, getMostOrderedFoodsThisWeekAdmin);
router.get("/most-ordered-all-time-admin", verifyToken, getMostOrderedFoodsAllTimeAdmin);

module.exports = router;
