/** @format */

import { Fragment, useContext, useMemo } from "react";
import CartContext from "../../context/cartContext";
import { Dialog, Transition } from "@headlessui/react";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../Button";
import { HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ProductItem from "../ProductItem";
import PaymentOrder from "./PaymentOrder";
import LocationOrder from "./LocationOrder.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_api_key");

const ConfirmationOrder = () => {
    const { openCart, toggleCart } = useContext(CartContext);
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
        <div>
            <Transition.Root show={openCart} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleCart}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full">
                                    <Dialog.Panel className="pointer-events-auto w-screen">
                                        <div className="flex h-full float-right ">
                                            <div className="flex h-full flex-col bg-base/dark-bg-2-14 dark:bg-light-bg-1 shadow-xl text-white dark:text-dark w-[400px]">
                                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                    <div className="flex items-start flex-col gap-4">
                                                        <div className="flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="hover:text-primary-color font-semibold"
                                                                onClick={
                                                                    toggleCart
                                                                }>
                                                                <span className="sr-only">
                                                                    Close panel
                                                                </span>
                                                                <FiArrowLeft
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                        <Dialog.Title className="text-lg font-medium flex justify-between w-full">
                                                            <div>
                                                                Xác Nhận Đơn
                                                                Hàng
                                                                <p className="text-sm font-normal pt-2 text-gray-400 dark:text-slate-600">
                                                                    Order #34562
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {/* icon + */}
                                                                <Button
                                                                    btnText={
                                                                        <HiPlus />
                                                                    }
                                                                />
                                                            </div>
                                                        </Dialog.Title>
                                                    </div>
                                                    <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 my-4" />
                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <div className="flow-root">
                                                                <motion.ul
                                                                    variants={container}
                                                                    initial="hidden"
                                                                    animate="show"
                                                                    className="flex flex-col gap-6"
                                                                    role="menu"
                                                                >
                                                                    {cart.map((product) => {
                                                                        return (
                                                                            <motion.li
                                                                                variants={item}
                                                                                key={product._id}
                                                                                role="menuitem"
                                                                                aria-label={product.name}
                                                                            >
                                                                                <ProductItem {...product} />
                                                                            </motion.li>
                                                                        );
                                                                    })}
                                                                </motion.ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="h-[1px] bg-base/dark-line-1 border-0 my-4 mx-6"/>
                                                <div className="px-6 pb-14">
                                                    <div className="flex justify-between text-base font-medium text-gray-400 dark:text-slate-600">
                                                        <p>Giảm giá</p>
                                                        <p className="text-white dark:text-dark font-semibold">
                                                            0%
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between text-base font-medium text-gray-400 dark:text-slate-600 pt-4">
                                                        <p>Thanh toán</p>
                                                        <p className="text-white dark:text-dark font-semibold">
                                                            {calculateTotalCost.toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Elements stripe={stripePromise}>
                                                <PaymentOrder />
                                            </Elements>
                                            <LocationOrder />
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default ConfirmationOrder;
