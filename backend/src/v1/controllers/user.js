const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: [
                {
                    param: "server",
                    msg: err.message || "Something went wrong!",
                },
            ],
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.trim() }).select(
            "password email"
        );
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "email",
                        msg: "Invalid email or password",
                    },
                ],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "Wrong credentials!",
                    },
                ],
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    register,
    login,
};
