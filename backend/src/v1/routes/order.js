/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    createOrder,
    getAllOrders,
    getAllOrdersAdmin,
    getOrder,
    updateOrderStatus,
    getLatest
} = require("../controllers/order");

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getAllOrders);
router.get("/latest", verifyToken, getLatest);
router.get("/admin", verifyToken, getAllOrdersAdmin);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, updateOrderStatus);

module.exports = router;
