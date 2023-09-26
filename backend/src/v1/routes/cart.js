/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    addToCart,
    allCartItem,
    editCart,
    editMessage,
    removeFromCart,
} = require("../controllers/cart");

router.post("/:id/:qty", verifyToken, addToCart);
router.get("/", verifyToken, allCartItem);
router.put("/:id/qty/:qty", verifyToken, editCart);
router.put("/:id/message/", verifyToken, editMessage);
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;
