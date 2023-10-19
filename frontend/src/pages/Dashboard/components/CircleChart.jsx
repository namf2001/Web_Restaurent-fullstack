/** @format */

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import MenuDropDown from "../../../components/MenuDropDown";
import adminApi from "../../../api/adminApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
    const option = ["Today", "Week", "All the time"];
    const [orderOption, setOrderOption] = useState(option[0]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await adminApi.getOrderCountsByStatusThisWeek();
                setOrder(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, [orderOption]);

    const chartData = {
        labels: order.map((item) => item.status),
        datasets: [
            {
                data: order.map((item) => item.count),
                backgroundColor: ["#8785E9", "#FFB572", "#50D1AA"],
                borderColor: ["#8785E9", "#FFB572", "#50D1AA"],
                borderWidth: 5,
            },
        ],
    };

    return (
        <div className="bg-base/dark-bg-2-14 flex flex-col gap-5 min-h-[330px] p-6 rounded-lg">
            <div className=" bg-base/dark-bg-2-14 flex justify-between items-center">
                <div className="text-xl font-semibold ">Most Ordered</div>
                <MenuDropDown
                    option={option}
                    options={orderOption}
                    setOptions={setOrderOption}
                />
            </div>
            <hr className="h-[1px] bg-base/dark-line border-0" />
            <div className="w-full flex justify-between items-center">
                <div className="w-3/5">
                    <Doughnut
                        data={chartData}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex flex-row gap-2 w-20 items-start">
                        <img
                            src="https://file.rendit.io/n/rnZk21ZtZktYs2ulT5cL.svg"
                            className="mt-px w-4 shrink-0"
                        />
                        <div className="flex flex-col gap-px w-16 shrink-0 items-start">
                            <div className="text-sm font-medium ">Pending</div>
                            <div className="text-xs text-gray-400">
                                {order[0]?.count} đơn hàng
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mr-px gap-2 items-start">
                        <img
                            src="https://file.rendit.io/n/FjNeHzKAyZyJOxpk1vOX.svg"
                            className="mt-px w-4 shrink-0"
                        />
                        <div className="flex flex-col gap-px w-20 shrink-0 items-start">
                            <div className="text-sm font-medium  ">
                                Confirmed
                            </div>
                            <div className="text-xs text-gray-400">
                                {order[1]?.count} đơn hàng
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-col pt-2 pb-8">
                        <div
                            id="Info"
                            className="w-24 h-12 bg-[#1f1d2b] absolute top-0 left-px flex flex-col gap-px items-start pl-4 py-1">
                            <div className="text-sm font-medium  ml-2">
                                Delivered
                            </div>
                            <div className="text-xs text-gray-400 ml-2">
                                {order[2]?.count} đơn hàng
                            </div>
                        </div>
                        <img
                            src="https://file.rendit.io/n/TmvvFrtY5nlVB4WkgMUn.svg"
                            className="relative w-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircleChart;
