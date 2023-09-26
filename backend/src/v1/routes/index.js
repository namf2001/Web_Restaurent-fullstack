const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/food-items", require("./FoodItem"));
router.use("/cart", require("./cart"));
router.use("/category", require("./category"));
// router.use("/payment", require("./payment"));

module.exports = router;
