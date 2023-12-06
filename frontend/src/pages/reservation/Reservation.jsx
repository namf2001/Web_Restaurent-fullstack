/** @format */
import { useState } from "react";
import { initialTabs as tabs } from "./ingredients.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { DateTab, InfoTab, ConfirmTab } from "./components/tabs";
import Advertisement from "./components/Advertisement.jsx";
import { useSelector } from "react-redux";
import reservationApi from "../../api/reservationApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomerReviews from "./components/CustomerReviews.jsx";

const Reservation = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState({
        selectedName: user.username || "",
        selectedPhone: user.phone || "",
        selectedGuests: 0,
        note: "",
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleInfoChange = (info) => {
        setSelectedInfo(info);
    };

    const handleSelectedTab = (tab) => {
        setSelectedTab(tab);
    };

    const handleConfirm = () => {
        const createReservation = async () => {
            try {
                const res = await reservationApi.createReservation({
                    user: user._id,
                    date: selectedDate.format("dddd, MMMM D, YYYY h:mm A"), 
                    time: selectedDate.format("HH:mm"),
                    user_name: selectedInfo.selectedName,
                    phone: selectedInfo.selectedPhone,
                    guests: selectedInfo.selectedGuests,
                    note: selectedInfo.note,
                });
                if (res.success) {
                    toast.success(res.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        theme: "dark",
                    });
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        };
        createReservation();
    };

    return (
        <div className="w-full px-4">
            <div className="flex flex-wrap h-[60vh]">
                <div className="flex-1 rounded-xl bg-base/dark-bg-2-14 dark:bg-light-bg-1 overflow-hidden shadow-md flex flex-col">
                    <nav className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 pb-0 rounded-xl rounded-bl-none rounded-br-none border-b-1 border-gray-800 h-12">
                        <ul className="flex w-full">
                            {tabs.map((item) => (
                                <li
                                    key={item.label}
                                    className={`relative flex justify-center items-center flex-1 min-w-0 select-none h-12 cursor-pointer  transition-colors
                                       ${item.label === selectedTab.label
                                        ? "bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark rounded-md rounded-bl-none rounded-br-none"
                                            : "bg-half-transparent dark:bg-light-bg-2"
                                        } 
                                    `}>
                                    {`${item.icon} ${item.label}`}
                                    {item.label === selectedTab.label ? (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary-color"
                                        />
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <main className="flex flex-grow select-none w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab ? selectedTab.label : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 overflow-y-auto p-4 w-full">
                                {selectedTab && (
                                    <>
                                        {selectedTab.label === "Date" && (
                                            <DateTab
                                                label="Chọn thời gian đặt bàn"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                onSelectedTab={
                                                    handleSelectedTab
                                                }
                                            />
                                        )}
                                        {selectedTab.label === "Info" && (
                                            <InfoTab
                                                value={selectedInfo}
                                                onChange={handleInfoChange}
                                                onSelectedTab={
                                                    handleSelectedTab
                                                }
                                            />
                                        )}
                                        {selectedTab.label === "Confirm" && (
                                            <ConfirmTab
                                                value={{
                                                    ...selectedInfo,
                                                    date: selectedDate,
                                                }}
                                                onConfirm={handleConfirm}
                                                onSelectedTab={
                                                    handleSelectedTab
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
                <div className="max-w-md min-w-[500px]">
                    <Advertisement />
                </div>
            </div>
            <CustomerReviews />
        </div>
    );
};

export default Reservation;
