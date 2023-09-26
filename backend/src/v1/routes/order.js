/** @format */

const router = require("express").Router();
const { validate } = require("../middleware/validation");
const { verifyToken } = require("../middleware/tokenHandler");
const {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrderStatus,
} = require("../controllers/order");

router.post("/", verifyToken, validate("createOrder"), createOrder);
router.get("/", verifyToken, getAllOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validate("updateOrderStatus"), updateOrderStatus);


module.exports = router;
