const router = require("express").Router();
const { validate } = require("../middleware/validation");
const { verifyToken } = require("../middleware/tokenHandler");
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/order");

router.get("/", verifyToken, getAllOrders);
router.get("/:id", verifyToken, getOrderById);
router.post("/", verifyToken, validate, createOrder);
router.put("/:id", verifyToken, validate, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;
