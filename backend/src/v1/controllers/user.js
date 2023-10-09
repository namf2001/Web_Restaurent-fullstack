/** @format */
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

        return res.status(200).json({
            user,
            token,
            success: true,
            message: "User created successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
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

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { $set: { ...req.body } },
            { new: true }
        ).select("-password");
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    getAllUsers,
};
