/** @format */

const Stripe = require("stripe");
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");

const { default: mongoose } = require("mongoose");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    const userId = req.user;
    const items = req.body.items;
    const { address, note, total } = req.body;
    console.log(req.body);

    const customer = await stripe.customers.create({
        metadata: {
            userId: userId._id.toString(),
            carts: JSON.stringify(items),
            address: address, // Lưu địa chỉ vào metadata
            note: note,
            total: total,
        },
    });

    const line_items = await Promise.all(
        items.map(async (item) => {
            // get data from id of cart item
            const res = await Cart.findById(item).populate("foodId");

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: res.foodId.name,
                        images: [
                            "https://th.bing.com/th/id/OIP.YdFWs2fw6zI8w8KR0Ylt6AHaHa?pid=ImgDet&rs=1",
                        ],
                        description: res.foodId.description,
                        metadata: {
                            userId: userId._id.toString(),
                            carts: JSON.stringify(items),
                            address: address, // Lưu địa chỉ vào metadata
                            note: note,
                            total: total,
                        },
                    },
                    unit_amount: res.foodId.price * 100,
                },
                quantity: res.quantity,
            };
        })
    );

    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ["card"],
        line_items: line_items,
        payment_intent_data: {
            metadata: {
                userId: userId._id.toString(),
                carts: JSON.stringify(items),
                address: address, // Lưu địa chỉ vào metadata
                note: note,
                total: total,
            },
        },
        mode: "payment",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.send({ url: session.url });
};

const createOrder = async (metadata, phone) => {
    try {
        const { userId, carts, address, note, total } = metadata;
        console.log(metadata)
        const items = JSON.parse(carts);
        // Phân tích chuỗi JSON và chuyển đổi thành mảng ObjectId
        // const itemsArray = items.map(itemId => mongoose.Types.ObjectId(itemId)); // Chuyển đổi thành mảng ObjectId
        const order = await Order.create({
            user_id: userId,
            items: items,
            total,
            note,
            address,
            phone,
        });
        // update status of cart items to confirmed
        await Cart.updateMany(
            { _id: { $in: items } },
            { $set: { status: "confirmed" } }
        );
        // update order array in user model
        await User.findByIdAndUpdate(
            userId._id,
            { $push: { orders: order._id } },
            { new: true }
        );
    } catch (error) {
        console.log(error);
    }
};

const handleWebhook = async (req, res) => {
    let eventType;
    let data;

    // Check if webhook signing is configured.
    let webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_1;
    eventType = req.body.type;
    console.log(eventType);
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed:  ${err}`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data.object;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data.object;
        eventType = req.body.type;
    }
    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
        console.log(`🔔  Payment received!`);
        stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
                try {
                    const result = await createOrder(
                        customer.metadata,
                        customer.phone
                    );
                    console.log(result);
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => console.log(err.message));
    }

    res.status(200).end();
};

module.exports = {
    createCheckoutSession,
    handleWebhook,
};
