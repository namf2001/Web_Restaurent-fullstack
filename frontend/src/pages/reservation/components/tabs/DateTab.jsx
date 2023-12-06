/** @format */

import { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import propTypes from "prop-types";
import { FiTablet } from "react-icons/fi";
import { TbClock2 } from "react-icons/tb";
import Button from "../../../../components/Button";
import { motion } from "framer-motion";

const DateTab = ({ label, value, onChange, onSelectedTab }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <div className="flex gap-6 p-4 transition-colors">
            <div>
                <label className="block text-white dark:text-dark text-center text-2xl mb-4 transition-colors">
                    {label}
                </label>
                <Datetime
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputProps={{ placeholder: "Select date and time" }}
                    open={true}
                    input={false}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-950 bg-white"
                />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="h-14 w-full pb-2 border-b-1">
                    <img
                        src="https://i.pinimg.com/originals/d9/7e/49/d97e497f82c76a0449d8992ed9d29118.png"
                        alt="icon"
                        className="h-full mx-auto object-cover"
                    />
                </div>
                <p className="font-bold text-gray-400 dark:text-slate-600">easyTableBooking</p>
                <h2 className="font-extrabold text-3xl dark:text-slate-600">
                    Demo of easyTableBooking
                </h2>
                <span className="dark:text-slate-600">
                    {/* icon clock */}
                    <FiTablet className="inline-block mr-2 text-gray-400 dark:text-slate-600" />{" "}
                    10:00 - 22:00
                    <TbClock2 className="inline-block ml-4 mr-2 text-gray-400 dark:text-slate-600" />{" "}
                    10:00 - 22:00
                </span>
                <p className="text-gray-200 dark:text-slate-600">
                    <span className="font-bold">Address:</span> 1234 Main St,
                    City, State 12345
                </p>
                <p className="text-gray-200 dark:text-slate-600">
                    <span className="font-bold">Phone:</span> (123) 456-7890
                </p>
                {value !== null && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                        animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                        transition={{ duration: 0.5 }} // Thời gian của animation
                    >
                        <Button
                            btnText="Đặt một bàn"
                            handler={() =>
                                onSelectedTab({ icon: "🥬", label: "Info" })
                            }>
                            Book a table
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

DateTab.propTypes = {
    label: propTypes.string.isRequired,
    value: propTypes.object.isRequired,
    onChange: propTypes.func.isRequired,
    onSelectedTab: propTypes.func.isRequired,
};

export default DateTab;
