/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const { validate } = require("../middleware/validation");
const {
    createOrder,
    getAllOrders,
    getAllOrdersAdmin,
    getOrder,
    updateOrderStatus,
    getLatest,
    getTopCustomersLastWeek,
    getOrderCountsByStatusThisWeek
} = require("../controllers/order");

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getAllOrders);
router.get("/latest", verifyToken, getLatest);
router.get("/admin", verifyToken, getAllOrdersAdmin);
router.get("/top-customers", verifyToken, getTopCustomersLastWeek);
router.get("/counts-by-status", getOrderCountsByStatusThisWeek);
router.get("/:id", verifyToken, validate,  getOrder);
router.put("/:id", verifyToken, validate, updateOrderStatus);


module.exports = router;
