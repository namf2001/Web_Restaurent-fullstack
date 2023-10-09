const router = require("express").Router();
const { register, login, getUser, updateUser, getAllUsers } = require("../controllers/user");
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");
const { verifyToken } = require("../middleware/tokenHandler");
const User = require("../models/user");

router.post(
    "/signup",
    body("username")
        .isLength({ min: 6 })
        .withMessage("Username must be at least 8 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
    body("email").custom(async (value) => {
        return await User.findOne({ email: value }).then((user) => {
            if (user) {
                return Promise.reject("Email already in use");
            }
        });
    }),
    validate,
    register
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
    login
);

router.get("/user", verifyToken, getUser);

router.put(
    "/user/:id",
    verifyToken,
    // if have new name, check if it is longer than 6 characters
    body("username")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Username must be at least 6 characters long"),
    // if have new email, check if it is valid
    validate,
    updateUser
);

router.get("/users", verifyToken, getAllUsers);

router.post("/verify-token", verifyToken, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;
