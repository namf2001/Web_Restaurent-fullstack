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
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

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
            <StatsItem
                title="Total Dish Ordered"
                value={calculateWeeklyRevenue(orders)}
                percentage={compareWeeklyRevenuePercentage(orders)}
                icon="https://file.rendit.io/n/ZohrlxWTVRluOrWdfEKv.svg"
            />
            <StatsItem
                title="Total Customer"
                value={calculateWeeklyUser(users)}
                percentage={compareWeeklyUsersPercentage(users)}
                icon="https://file.rendit.io/n/kr0zJxPaY9O41LPR7TOB.svg"
            />
            <StatsItem
                title="Total Revenue"
                value={calculateOrderUser(orders)}
                percentage={compareOrderUserPercentage(orders)}
                icon="https://file.rendit.io/n/MFtFrvB9uIAIqOX1sM96.svg"
            />
        </div>
    );
};

export default Stats;

const StatsItem = ({ title, value, percentage, icon }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, Math.abs(value), { duration: 4 });

        return animation.stop;
    }, [count, value]);

    return (
        <div className="bg-[#1f1d2b] dark:bg-primary-color/30 flex flex-col justify-center pl-4 gap-2 w-full h-[143px] items-start rounded-lg">
            <div className="flex flex-row gap-3 w-3/5 items-center">
                <div className="bg-[#252836] dark:bg-light-bg-1 self-start flex flex-col w-10 shrink-0 h-10 items-center py-2 rounded-lg">
                    <div className="overflow-hidden bg-black/0 flex flex-col w-6 items-center pt-1 pb-px px-px">
                        <img src={icon} className="w-4" />
                    </div>
                </div>
                <div className="flex flex-row gap-1 w-16 shrink-0 items-center">
                    <div
                        className={`text-xs font-medium ${percentage > 0 ? "text-green-300" : "text-red-400"
                            }`}>
                        <span>{percentage}</span>%
                    </div>
                    <div
                        className={`${percentage > 0 ? "bg-green-300/30" : "bg-red-400/30 "
                            } self-start flex flex-col w-4 shrink-0 items-center p-px rounded-[20px]`}>
                        <div className="overflow-hidden bg-black/0 flex flex-col w-3 items-center px-1 py-px">
                            <img
                                src={
                                    percentage > 0
                                        ? "https://file.rendit.io/n/puTwTuPjJ7TZwuURSF1c.svg"
                                        : "https://file.rendit.io/n/ejEWRhGnnFQwxsZXqltP.svg"
                                }
                                className="w-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-3xl font-semibold text-white">
                <motion.span>{rounded}</motion.span>
            </div>
            <div className="text-sm font-medium text-gray-400 dark:text-dark">{title}</div>
        </div>
    );
};

StatsItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    percentage: PropTypes.string,
    icon: PropTypes.string,
};
