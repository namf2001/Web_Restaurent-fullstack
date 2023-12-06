/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { MostOrder, FormUser } from "./components/";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Customer = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector((state) => state.user.value);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };


    useEffect(() => {
        setName(user !== undefined ? user.username : "");
    }, [user]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await orderApi.getAll();
            setOrders(res);
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        // if user is not defined, navigate to login page
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="p-6">
            <motion.div variants={item} className="flex gap-6">
                <FormUser />
                <MostOrder />
            </motion.div>
            <motion.div variants={item} className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark flex flex-col gap-2 w-full px-6 pt-6 pb-2 mt-6 rounded-lg h-[300px]">
                <div className="flex flex-row justify-between items-start mb-1">
                    <div className="text-xl font-semibold leading-[28px] mt-2">
                        {name}
                    </div>
                    <div className="border-solid border-[#393c49] flex flex-row gap-3 h-12 items-center pl-4 pr-8 py-3 border rounded-lg">
                        <img
                            src="https://file.rendit.io/n/dxfs6sbHZxPmbGuAiDCk.svg"
                            className="w-4 shrink-0"
                        />
                        <div className="text-sm font-medium">
                            Filter Order
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <div className="text-sm font-semibold">
                        Customer
                    </div>
                    <div className="text-sm font-semibold">Menu</div>
                    <div className="text-sm font-semibold">
                        Total Payment
                    </div>
                    <div className="text-sm font-semibold text-center">
                        Status
                    </div>
                </div>
                <hr className="border-0 bg-base/dark-line h-[1px]" />
                <div className="overflow-y-auto scrollbar-none">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="flex shrink-0 items-center py-2 w-full">
                            <div className="text-xl font-semibold self-center flex-1">
                                #Orders {order._id.slice(0, 5)}
                            </div>
                            <div className="flex-1 text-gray-400 dark:text-slate-600">
                                {order.phone}
                            </div>
                            <div className="text-xl flex-1 font-bold text-gray-400 dark:text-slate-600">
                                ${order.total}
                            </div>
                            <div className="flex flex-col items-center py-2 flex-1">
                                <div
                                    className={`text-center text-sm font-medium rounded-xl px-6
                                                                ${
                                                                    order.status ===
                                                                    "pending"
                                                                        ? "bg-blue-400"
                                                                        : order.status ===
                                                                          "delivered"
                                                                        ? "bg-yellow-400"
                                                                        : "bg-green-400"
                                                                }
                                                                `}>
                                    {order.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Customer;
