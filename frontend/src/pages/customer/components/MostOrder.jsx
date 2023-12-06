/** @format */

import { useEffect, useState } from "react";
import CartApi from "../../../api/cartApi";
import { Link } from "react-router-dom";
import MenuDropDown from "../../../components/MenuDropDown";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
import { Button } from "../../../components";
defineElement(lottie.loadAnimation);

const MostOrder = () => {
    const option = ["Today", "Week", "All the time"];
    const [orderOption, setOrderOption] = useState(option[0]);
    const [mostOrder, setMostOrder] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            if (orderOption === "Today") {
                const res = await CartApi.getMostOrderedFoodsToday();
                setMostOrder(res);
            } else if (orderOption === "Week") {
                const res = await CartApi.getMostOrderedFoodsThisWeek();
                setMostOrder(res);
            } else if (orderOption === "All the time") {
                const res = await CartApi.getMostOrderedFoodsAllTime();
                setMostOrder(res);
            }
        };
        fetchOrder();
    }, [orderOption]);

    return (
        <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark flex flex-col justify-center  gap-5 w-[400px] p-6 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="text-xl  font-semibold leading-[28px]">
                    Most Ordered
                </div>
                <MenuDropDown
                    option={option}
                    options={orderOption}
                    setOptions={setOrderOption}
                />
            </div>
            <hr className="h-[1px] bg-base/dark-line border-0" />
            <div className="max-h-[200px] overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full flex flex-col justify-start items-start gap-6 w-full flex-1">
                {mostOrder.length === 0 && (
                    <div className="mx-auto flex flex-col items-center justify-between gap-2">
                        <lord-icon
                            src="https://cdn.lordicon.com/ggihhudh.json"
                            trigger="loop"
                            colors="primary:#e4e4e4,secondary:#646e78,tertiary:#eeaa66"
                            style={{
                                width: "100px",
                                height: "100px",
                            }}></lord-icon>
                        <div className="text-sm font-medium text-center text-gray-400 w-full">
                            chưa có đơn hàng nào
                        </div>
                        <Link
                            to="/user/"
                            className="text-sm font-medium text-center text-gray-400 w-full">
                            <Button btnText="Order Now" />
                        </Link>
                    </div>
                )}
                {mostOrder.map((item) => (
                    <Link
                        to={`/user/product/${item.foodItem[0]._id}`}
                        key={item._id}
                        className="flex flex-row gap-4 w-full items-start">
                        <img
                            src={item.foodItem[0].image}
                            className="w-12 shrink-0 rounded-full"
                        />
                        <div className="flex flex-col gap-1 items-start">
                            <div className="text-sm font-medium text-[#e0e6e9] dark:text-slate-600">
                                {item.foodItem[0].name}
                            </div>
                            <div className="text-xs leading-[16.8px] text-[#abbbc2] dark:text-slate-500">
                                {item.totalOrdered} lượt đặt
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MostOrder;
