import Input from "./Input";
import { useContext } from 'react';
import { ThemeContext } from '../context/modeContext';
import { BiMap } from 'react-icons/bi';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import { motion } from 'framer-motion';

const Navbar = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const currentDate = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	const getday = currentDate.toLocaleDateString("vi-VN", options);

	return (
        <div className="p-6 flex justify-between items-center">
            <div className="dark:text-dark">
                <h1 className="text-3xl font-bold flex gap-2">
                    <BiMap />
                    Restaurant St, Delicious City, Ha Noi, B428PX
                </h1>
                <span className="flex items-center gap-2">
                    <AiOutlineCalendar /> {getday} <AiOutlineMore /> <AiOutlineClockCircle /> mở cửa từ 10:00 - 22:00
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Input />
                <div>
                    {theme === "dark" ? (
                        <button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="text-primary-color border-2 border-primary-color hover:bg-orange-200 transition duration-300  shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer">
                            <motion.svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </motion.svg>
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="text-gray-400 border-2 border-gray-400 hover:bg-base/dark-bg-2-14 transition duration-300 focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
