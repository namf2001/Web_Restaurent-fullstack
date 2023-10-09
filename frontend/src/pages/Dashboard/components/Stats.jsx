/** @format */
import PropTypes from "prop-types";
import {
    calculateWeeklyRevenue,
    compareWeeklyRevenuePercentage,
    calculateWeeklyUser,
    compareWeeklyUsersPercentage,
    calculateOrderUser,
    compareOrderUserPercentage,
} from "../../../utils/adminUtlis";
import { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";

const Stats = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await adminApi.getAllAdmin();
                setOrders(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();

        const fetchUsers = async () => {
            try {
                const res = await adminApi.getAllUsers();
                setUsers(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div className="flex gap-4">
            <div className="bg-base/dark-bg-2-14  flex flex-col justify-center pl-4 gap-2 w-full h-[143px] items-start rounded-lg">
                <div className="flex flex-row gap-3 w-2/3 items-center">
                    <div className="bg-base/dark-bg-1-18 self-start flex flex-col w-10 shrink-0 h-10 items-center py-2 rounded-lg">
                        <img
                            src="https://file.rendit.io/n/ZohrlxWTVRluOrWdfEKv.svg"
                            className="w-6"
                        />
                    </div>
                    <UpAndDown data={compareWeeklyRevenuePercentage(orders)} />
                </div>
                <div className="text-3xl font-semibold text-white">
                    ${calculateWeeklyRevenue(orders)}
                </div>
                <div className="text-sm font-medium text-gray-400">
                    Total Revenue
                </div>
            </div>
            <div className="bg-base/dark-bg-2-14 flex flex-col justify-center pl-4 gap-2 w-full h-[143px] items-start rounded-lg">
                <div className="flex flex-row gap-3 w-2/3 items-center">
                    <div className="bg-base/dark-bg-1-18 self-start flex flex-col w-10 shrink-0 h-10 items-center py-2 rounded-lg">
                        <div className="overflow-hidden bg-black/0 flex flex-col w-6 items-center px-1 py-px">
                            <img
                                src="https://file.rendit.io/n/MFtFrvB9uIAIqOX1sM96.svg"
                                className="w-4"
                            />
                        </div>
                    </div>
                    <UpAndDown data={compareOrderUserPercentage(orders)} />
                </div>
                <div className="text-3xl font-semibold text-white">
                    {calculateOrderUser(orders)}
                </div>
                <div className="text-sm font-medium text-gray-400">
                    Total Dish Ordered
                </div>
            </div>
            <div className="bg-[#1f1d2b] flex flex-col justify-center pl-4 gap-2 w-full h-[143px] items-start rounded-lg">
                <div className="flex flex-row gap-3 w-3/5 items-center">
                    <div className="bg-[#252836] self-start flex flex-col w-10 shrink-0 h-10 items-center py-2 rounded-lg">
                        <div className="overflow-hidden bg-black/0 flex flex-col w-6 items-center pt-1 pb-px px-px">
                            <img
                                src="https://file.rendit.io/n/kr0zJxPaY9O41LPR7TOB.svg"
                                className="w-5"
                            />
                        </div>
                    </div>
                    <UpAndDown data={compareWeeklyUsersPercentage(users)} />
                </div>
                <div className="text-3xl font-semibold text-white">
                    {calculateWeeklyUser(users)}
                </div>
                <div className="text-sm font-medium text-gray-400">
                    Total Customer
                </div>
            </div>
        </div>
    );
};

export default Stats;

export const UpAndDown = ({ data }) => {
    return (
        <div className="flex flex-row gap-1 w-16 shrink-0 items-center">
            <div
                className={`text-xs font-medium ${
                    data > 0 ? "text-green-300" : "text-red-400"
                }`}>
                {data}%
            </div>
            <div
                className={`${
                    data > 0 ? "bg-green-300/30" : "bg-red-400/30 "
                } self-start flex flex-col w-4 shrink-0 items-center p-px rounded-[20px]`}>
                <div className="overflow-hidden bg-black/0 flex flex-col w-3 items-center px-1 py-px">
                    <img
                        src={
                            data > 0
                                ? "https://file.rendit.io/n/puTwTuPjJ7TZwuURSF1c.svg"
                                : "https://file.rendit.io/n/ejEWRhGnnFQwxsZXqltP.svg"
                        }
                        className="w-2"
                    />
                </div>
            </div>
        </div>
    );
};

UpAndDown.propTypes = {
    data: PropTypes.number,
};
