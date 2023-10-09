const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/food-items", require("./FoodItem"));
router.use("/cart", require("./cart"));
router.use("/category", require("./category"));
router.use("/payment", require("./payment"));
router.use("/order", require("./order"));

module.exports = router;
