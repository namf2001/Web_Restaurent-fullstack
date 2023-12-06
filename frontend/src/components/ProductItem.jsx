/** @format */

import PropTypes from "prop-types";
import { BiTrash } from "react-icons/bi";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import CartApi from "../api/cartApi";
import { setCart } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";

let timer = null;
const timeout = 500;
const ProductItem = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);
    const [quantity, setQuantity] = useState(props.quantity);
    const [message, setMessage] = useState(props.message);

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            await CartApi.editCart(id, quantity);
            const newCart = cart.map((item) => {
                if (item._id === id) {
                    return { ...item, quantity };
                }
                return item;
            });
            dispatch(setCart(newCart));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateMessage = async (e, id) => {
        const value = e.target.value;
        setMessage(value);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(async () => {
            try {
                await CartApi.editMessage(id, value);
                const newCart = cart.map((item) => {
                    if (item._id === id) {
                        return { ...item, message: value };
                    }
                    return item;
                });
                dispatch(setCart(newCart));
            } catch (error) {
                console.log(error);
            }
        }, timeout);
    };

    const handleDelete = async (id) => {
        try {
            await CartApi.removeFromCart(id);
            const item = cart.find((item) => item._id === id);
            const newCart = cart.filter((item) => item._id !== id);
            dispatch(setCart(newCart));
            toast.success(`${item.foodId.name} đã được xóa khỏi giỏ hàng`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <a
                            className="h-[40px] block mb-5 w-[40px]"
                            aria-label="link-wrap-image">
                            <img
                                src={props.foodId.image}
                                alt={props.foodId.name}
                                className="object-cover h-full min-w-[40px] rounded-full "
                            />
                        </a>
                        <span>
                            <p className="line-clamp-1">{props.foodId.name}</p>
                            <p>$ {props.foodId.price}</p>
                        </span>
                    </div>
                    <span className="bg-base/dark-bg-1-18 dark:bg-orange-200 rounded-md w-20 justify-between items-center h-12 text-center flex overflow-hidden">
                        {/* add button + and - */}
                        <button
                            className="text-2xl font-bold bg-base/dark-line dark:bg-orange-400 w-[30px] h-full"
                            onClick={async () => {
                                if (quantity > 1) {
                                    await handleUpdateQuantity(
                                        props._id,
                                        quantity - 1
                                    );
                                    setQuantity(quantity - 1);
                                }
                            }}>
                            -
                        </button>
                        <p className="px-2">{quantity}</p>
                        <button
                            className="text-2xl font-bold bg-base/dark-line dark:bg-orange-400 w-[30px] h-full"
                            onClick={async () => {
                                await handleUpdateQuantity(
                                    props._id,
                                    quantity + 1
                                );
                                setQuantity(quantity + 1);
                            }}>
                            +
                        </button>
                    </span>
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => handleUpdateMessage(e, props._id)}
                    placeholder="Enter your content"
                    className="bg-base/dark-line dark:bg-light-bg block rounded-md border-0 p-3.5 h-full text-gray-400 dark:text-slate-600 ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6 "
                />
            </div>
            <div className="flex flex-col gap-4 justify-between items-center">
                <span className="my-auto font-semibold">
                    $ {props.foodId.price * props.quantity}
                </span>
                <Button
                    btnText={<BiTrash />}
                    outline={true}
                    handler={() => handleDelete(props._id)}
                />
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    _id: PropTypes.string.isRequired,
    foodId: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    message: PropTypes.string,
};

export default ProductItem;
