const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/food-items", require("./FoodItem"));


module.exports = router;
