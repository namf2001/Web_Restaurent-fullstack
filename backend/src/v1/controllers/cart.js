const Cart = require("../models/cart");
const FoodItem = require("../models/foodItem");

const addToCart = async (req, res) => {
    try {
        const { foodItemId, quantity } = req.body;
        const userId = req.user._id;

        const foundUserCart = await Cart.findOne({ userId }).populate(
            "items.foodItemId"
        );

        const cartItem = foundUserCart.items.find(
            (item) => item.foodItemId._id.toString() === foodItemId
        );

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            const foodItem = await FoodItem.findById(foodItemId);
            if (!foodItem) {
                return res.status(404).json({
                    success: false,
                    message: "Food item not found",
                });
            }
            foundUserCart.items.push({
                foodItemId,
                quantity,
            });
        }

        await foundUserCart.save();

        return res.status(200).json({
            success: true,
            message: "Added to cart",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const foundUserCart = await Cart.findOne({ userId }).populate(
            "items.foodItemId"
        );

        if (!foundUserCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            cart: foundUserCart,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateCart = async (req, res) => {
    const { foodItemId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const foundUserCart = await Cart.findOne({ userId }).populate(
            "items.foodItemId"
        );

        const cartItem = foundUserCart.items.find(
            (item) => item.foodItemId._id.toString() === foodItemId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        cartItem.quantity = quantity;

        await foundUserCart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteFromCart = async (req, res) => {
    const { foodItemId } = req.body;
    const userId = req.user._id;

    try {
        const findUserCart = await Cart.findOne({ userId }).populate(
            "items.foodItemId"
        );

        const cartItem = findUserCart.items.find(
            (item) => item.foodItemId._id.toString() === foodItemId
        );

        if (cartItem) {
            const index = findUserCart.items.indexOf(cartItem);
            findUserCart.items.splice(index, 1);
        }

        await findUserCart.save();

        return res.status(200).json({
            success: true,
            message: "Item deleted",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    deleteFromCart,
};
