/** @format */

import { useContext, useMemo } from "react";
import CartContext from "../context/cartContext";
import { RiShoppingCart2Line as Cart } from "react-icons/ri";
import { Transition } from "@headlessui/react";
import ProductItem from "./ProductItem";
import Button from "./Button";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

const Pay = () => {
    const { openPayment, togglePayment, toggleCart } = useContext(CartContext);
    const cart = useSelector((state) => state.cart.value);
    const calculateTotalCost = useMemo(() => {
        return cart.reduce((totalCost, item) => {
            return totalCost + item.foodId.price * item.quantity;
        }, 0);
    }, [cart]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div
            className={`${
                !openPayment ? "w-20" : "min-w-[480px]"
            } bg-base/dark-bg-2-14 dark:bg-light-bg-1 py-6 px-4 transition-all duration-500 h-100vh`}>
            <div className={`${openPayment ? "hidden" : ""} w-12`}>
                <Button btnText={<Cart />} handler={togglePayment} />
            </div>
            <Transition
                show={openPayment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                {/* neu khong có sản phẩm nào trong cart thì hiện bạn chưa có sản phẩm nào */}
                <Transition
                    show={cart.length === 0}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="text-4xl mb-4">
                            <lord-icon
                                src="https://cdn.lordicon.com/dnmvmpfk.json"
                                trigger="loop"
                                colors="primary:#ffffff,secondary:#ffffff"
                            />
                        </div>
                        <p className="text-xl font-semibold mb-4">
                            Your cart is currently empty
                        </p>
                        <div className="w-40">
                            <Button
                                btnText="Go Back"
                                outline={true}
                                handler={togglePayment}
                            />
                        </div>
                    </div>
                </Transition>
                <Transition
                    show={openPayment}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div
                        className={`w-full px-4 flex flex-col justify-between h-screen ${
                            openPayment ? "" : "hidden"
                        }`}>
                        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-none">
                            <h2 className="text-xl font-semibold">
                                Orders #34562
                            </h2>
                            <span className="bg-primary-color rounded-md p-2 text-white max-w-min">
                                Delivery
                            </span>
                            <div className="flex justify-between w-full gap-6 font-semibold">
                                <div className="flex justify-between w-full">
                                    <span>Item</span>
                                    <span>Qty</span>
                                </div>
                                <span>Price</span>
                            </div>
                            <hr className="w-full h-[1px] bg-base/dark-line-1 border-0" />
                            <div className="flow-root">
                                <motion.ul
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col gap-6">
                                    {cart.map((product) => {
                                        return (
                                            <motion.li
                                                variants={item}
                                                key={product._id}>
                                                <ProductItem {...product} />
                                            </motion.li>
                                        );
                                    })}
                                </motion.ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 mb-12">
                            <hr className="w-full h-[1px] bg-base/dark-line-1 border-0" />
                            <div className="flex justify-between text-base font-medium ">
                                <p>Discount</p>
                                <p>0%</p>
                            </div>
                            <div className="flex justify-between text-base font-medium ">
                                <p>Subtotal</p>
                                <p>$ {calculateTotalCost}</p>
                            </div>
                            <div className="flex gap-3 w-full">
                                <Button
                                    btnText="Go Back"
                                    outline={true}
                                    handler={togglePayment}
                                />
                                <Button
                                    btnText="Pay Now"
                                    handler={toggleCart}
                                />
                            </div>
                        </div>
                    </div>
                </Transition>
            </Transition>
        </div>
    );
};

export default Pay;
