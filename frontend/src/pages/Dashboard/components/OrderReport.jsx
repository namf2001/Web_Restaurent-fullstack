/** @format */

import { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
import { formatDistanceToNow } from "date-fns";

const OrderReport = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await adminApi.getTopCustomersLastWeek();
                setOrders(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col w-full flex-1">
            <div className="flex flex-col bg-base/dark-bg-2-14 dark:bg-light-bg-1 rounded-md p-6">
                <div className="flex flex-col justify-between shrink-0 items-start">
                    <div className="self-stretch flex justify-between items-center">
                        <div className="text-2xl font-semibold text-white dark:text-dark">
                            Thống kê người dùng
                        </div>
                        <button className="border-solid border-dark dark:border-orange-200 border-2 self-start flex flex-row justify-center gap-2 h-12 items-center px-12 py-3 rounded-lg">
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
                <div className="flex flex-col w-full py-6 h-[510px]">
                    <div className="flex items-start dark:text-dark">
                        <div className="text-sm font-semibold flex-1">
                            Khách hàng
                        </div>
                        <div className="text-sm font-semibold flex-1 text-center">
                            Số đơn hàng
                        </div>
                        <div className="text-sm font-semibold flex-1 text-center">
                            Tổng tiền
                        </div>
                        <div className="text-sm font-semibold flex-1 text-center">
                            Đơn hàng gần nhất
                        </div>
                    </div>
                    <hr className="w-full h-[2px] bg-base/dark-line-1 border-0 my-4 dark:bg-primary-color" />
                    <div className="overflow-y-auto scrollbar-none">
                        <div className="w-full">
                            {orders.map((order) => (
                                <div
                                    key={order.name}
                                    className="flex shrink-0 items-center py-2 w-full relative">
                                    <div className="flex items-center gap-4 flex-1 dark:text-dark">
                                        <img
                                            src={
                                                order.profileImage ||
                                                "https://file.rendit.io/n/ohCGcOg1sN0JskqKa05n.png"
                                            }
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full bg-cover bg-blend-normal object-cover bg-no-repeat bg-slate-50 "
                                        />
                                        {order.username}
                                    </div>
                                    <div className="flex-1 text-gray-400 dark:text-slate-600 text-center">
                                        {order.totalOrders} đơn hàng
                                    </div>
                                    <div className="text-xl flex-1 font-bold text-gray-400 dark:text-slate-600 text-center">
                                        ${order.totalPayment}
                                    </div>
                                    <div className="flex flex-col items-center py-2 flex-1">
                                        <div
                                            className={`text-center text-sm font-medium rounded-xl px-6 dark:text-slate-700`}>
                                            {order.latestOrder
                                                ? formatDistanceToNow(
                                                      new Date(
                                                          order.latestOrder
                                                      ),
                                                      {
                                                          addSuffix: true,
                                                      },
                                                      { locale: "vi" }
                                                  )
                                                : "N/a"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReport;
