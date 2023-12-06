/** @format */

import { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";
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
    const [viewAll, setViewAll] = useState(false);
    useEffect(() => {
        const fetchOrder = async () => {
            if (orderOption === "Today") {
                const res = await adminApi.getMostOrderedFoodsTodayAdmin();
                setMostOrder(res);
            } else if (orderOption === "Week") {
                const res = await adminApi.getMostOrderedFoodsThisWeekAdmin();
                setMostOrder(res);
            } else if (orderOption === "All the time") {
                const res = await adminApi.getMostOrderedFoodsAllTimeAdmin();
                setMostOrder(res);
            }
        };
        fetchOrder();
    }, [orderOption]);

    // chỉ lấy 3 phần tử đầu tiên


    return (
        <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex flex-col gap-5 w-[400px] min-h-[400px] p-6 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-white dark:text-dark">
                    Most Ordered
                </div>
                <MenuDropDown
                    option={option}
                    options={orderOption}
                    setOptions={setOrderOption}
                />
            </div>
            <hr className="h-[2px] bg-base/dark-line dark:bg-primary-color border-0" />
            <div
                className={`overflow-hidden flex flex-col justify-start items-start gap-6 w-full flex-1 ${
                    viewAll ? "h-auto" : "max-h-[200px]"
                }`}>
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
                        <div className="text-sm font-medium text-center text-gray-400 dark:text-slate-600 w-full">
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
                            <div className="text-sm font-medium text-[#e0e6e9] dark:text-dark">
                                {item.foodItem[0].name}
                            </div>
                            <div className="text-xs leading-[16.8px] text-[#abbbc2] dark:text-slate-600">
                                {item.totalOrdered} lượt đặt
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {mostOrder.length > 0 && (
                <div className="mt-auto">
                    <Button
                        btnText="View All"
                        outline={true}
                        handler={() => setViewAll(!viewAll)}
                    />
                </div>
            )}
        </div>
    );
};

export default MostOrder;
