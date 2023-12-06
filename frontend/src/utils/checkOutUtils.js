/** @format */
import PaymentApi from "../api/paymentApi";

const handleCheckout = async (cart, note, tableId, locationData) => {
    const total = cart.reduce((total, item) => {
        return total + item.quantity * item.foodId.price;
    }, 0);
    let order = {};

    if (tableId !== null) {
        order = {
            table_id: tableId,
            items: cart.map((item) => item._id), // Sử dụng _id của mỗi mục Cart
            total: total,
            note: note,
        };
    } else {
        order = {
            address: locationData,
            items: cart.map((item) => item._id), // Sử dụng _id của mỗi mục Cart
            total: total,
            note: note,
        };
    }

    await PaymentApi.createCheckoutSession(order)
        .then((result) => {
            console.log(result);
            if (result.url) {
                window.location.href = result.url;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export default handleCheckout;