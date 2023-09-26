/** @format */

const router = require("express").Router();
const {
        checkout,
    confirmPayment,
} = require("../controllers/payment");
const { verifyToken } = require("../middleware/tokenHandler");

router.get("/", verifyToken, checkout);
router.post("/confirm", verifyToken, confirmPayment);

module.exports = router;