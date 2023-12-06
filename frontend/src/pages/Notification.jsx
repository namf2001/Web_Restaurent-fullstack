/** @format */
import { Disclosure, Transition } from "@headlessui/react";
import { Button, OrderItem, ProgressChecking } from "../components";
import { Fragment, useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

const Notification = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await adminApi.getAllAdmin();
                setOrders(res);
                // console.log(res)
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const handleTrack = (orderId, status) => {
        if (status === "pending") {
            setSelectedOrderId(orderId);
        } else {
            setSelectedOrderId(null);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await adminApi.updateStatus(orderId, { status });
            const updatedOrders = orders.map((order) =>
                order._id === orderId ? { ...order, status } : order
            );
            setOrders(updatedOrders);
            console.log(response);
        } catch (error) {
            console.error(
                `Error updating order status for order ${orderId}:`,
                error
            );
        }
    };

    return (
        <div className="w-full px-6">
            <div className="flex flex-col bg-base/dark-bg-2-14 dark:bg-light-bg-1 rounded-md p-6 transition-all">
                <div className="flex flex-col justify-between shrink-0 items-start">
                    <div className="self-stretch flex justify-between items-center">
                        <div className="text-2xl font-semibold text-white dark:text-dark">
                            Thông báo đơn hàng
                        </div>
                        <button className="border-solid border-dark border-2 self-start flex flex-row justify-center gap-2 h-12 items-center px-12 py-3 rounded-lg">
                            <div className="overflow-hidden bg-black/0 flex flex-col w-5 shrink-0 items-center p-px">
                                <img
                                    src="https://file.rendit.io/n/LKjy1hTjObhNeQmb6vOP.svg"
                                    className="w-4"
                                />
                            </div>
                            <div className="text-sm font-medium text-white dark:text-dark">
                                Filter Order
                            </div>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full h-[600px] py-6">
                    <div className="flex items-start dark:text-dark">
                        <div className="text-sm font-semibold flex-1">
                            Mã đơn hàng
                        </div>
                        <div className="text-sm font-semibold flex-1">
                            Khách hàng
                        </div>
                        <div className="text-sm font-semibold flex-1">
                            Tổng tiền
                        </div>
                        <div className="text-sm font-semibold flex-1 text-center">
                            Trạng thái
                        </div>
                    </div>
                    <hr className="w-full h-[2px] bg-base/dark-line-1 dark:bg-primary-color border-0 my-4" />
                    <div className="overflow-y-auto scrollbar-none">
                        <div className="w-full">
                            {orders.map((order) => (
                                <Disclosure key={order._id}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={`flex w-full justify-between rounded-lg p-2 text-left text-sm font-medium hover:bg-primary-color transition ${order.table_id
                                                        ? "bg-primary-color/50"
                                                        : "bg-base/dark-bg-2-14 dark:bg-light-bg-1"
                                                    }`}>
                                                <div className="flex shrink-0 items-center py-2 w-full relative">
                                                    <div className="text-xl font-semibold text-white dark:text-dark self-center flex-1">
                                                        #Orders{" "}
                                                        {order._id.slice(0, 5)}
                                                    </div>
                                                    <div className="flex-1 text-gray-400 dark:text-slate-600">
                                                        #Customer{" "}
                                                        {order.user_id.slice(
                                                            0,
                                                            5
                                                        )}
                                                    </div>
                                                    <div className="text-xl flex-1 font-bold text-gray-400 dark:text-dark">
                                                        ${order.total}
                                                    </div>
                                                    <div className="flex flex-col items-center py-2 flex-1">
                                                        <div
                                                            className={`text-center text-sm font-medium rounded-xl px-6
                                                                ${order.status ===
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
                                                    {/* icon */}
                                                    <button
                                                        className={`h-8 w-8 transition-transform duration-300 dark:bg-primary-color rounded-full ${open ? "transform rotate-180" : ""
                                                            }`}
                                                        type="button"
                                                        onClick={() => {
                                                            handleTrack(order._id, order.status);
                                                        }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/rxufjlal.json"
                                                            trigger="hover"
                                                            colors="primary:#fff"
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                            }}></lord-icon>
                                                    </button>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition-all ease-in-out duration-150"
                                                enterFrom="h-0 opacity-0"
                                                enterTo="h-auto opacity-100"
                                                leave="transition-all ease-in-out duration-150"
                                                leaveFrom="h-auto opacity-100"
                                                leaveTo="h-0 opacity-0">
                                                <Disclosure.Panel className="py-4 text-sm text-gray-400 rounded-b-lg mb-2 flex flex-col gap-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {order.items.map(
                                                            (item) => (
                                                                <OrderItem
                                                                    key={
                                                                        item._id
                                                                    }
                                                                    item={item}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <Transition
                                                        show={
                                                            selectedOrderId ===
                                                            order._id &&
                                                            order.status ===
                                                            "pending"
                                                        }
                                                        className="flex gap-4">
                                                        <Disclosure.Button className="flex-1">
                                                            <Button
                                                                btnText="Hủy"
                                                                outline={true}
                                                            />
                                                        </Disclosure.Button>
                                                        <div className="flex-1 text-white">
                                                            <Button
                                                                btnText="Xác nhận"
                                                                color="bg-blue-500"
                                                                handler={() =>
                                                                    updateOrderStatus(
                                                                        order._id,
                                                                        "confirmed"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </Transition>
                                                    <Transition
                                                        show={
                                                            order.status ===
                                                            "confirmed" ||
                                                            order.status ===
                                                            "delivered"
                                                        }>
                                                        <ProgressChecking
                                                            status={
                                                                order.status
                                                            }
                                                        />
                                                        <div className="flex gap-4">
                                                            <Disclosure.Button
                                                                className={`flex-1`}>
                                                                <Button
                                                                    btnText="Đóng"
                                                                    outline={
                                                                        true
                                                                    }
                                                                    handler={() =>
                                                                        setSelectedOrderId(
                                                                            null
                                                                        )
                                                                    }
                                                                />
                                                            </Disclosure.Button>
                                                            {order.status ===
                                                                "confirmed" && (
                                                                    <div className="flex-1 text-white">
                                                                        <Button
                                                                            btnText="Đang giao hàng"
                                                                            color="bg-green-500"
                                                                            handler={() =>
                                                                                updateOrderStatus(
                                                                                    order._id,
                                                                                    "delivered"
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </Transition>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
