/** @format */

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Input = () => {
    const products = useSelector((state) => state.foodItem.value);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSuggestions = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestions = [...products] // Create a copy of the products array
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort the copy
                .filter((v) => regex.test(v.name));
        }
        setSearchTerm(value);
        setSuggestions(suggestions);
    };

    const handleSelectedSuggestion = (value) => {
        setSearchTerm(value);
        setSuggestions([]);
    };

    return (
        <motion.div
            className="relative rounded-md bg-base/dark-line h-12 min-w-[320px]"
            initial={{ opacity: 0, x: -20 }} // Initial animation values
            animate={{ opacity: 1, x: 0 }} // Animation properties
            transition={{ duration: 0.3 }} // Animation duration
        >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                <span className="text-light dark:text-slate-600">
                    <FiSearch />
                </span>
            </div>
            <input
                type="text"
                name="search"
                id="search"
                className="bg-base/dark-line dark:bg-light-bg-1 block rounded-md border-0 py-1.5 pl-10 w-full pr-3 h-full text-light dark:text-slate-600 ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 dark:focus:ring-offset-orange-200 focus:outline-none text-sm leading-6"
                value={searchTerm}
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleSuggestions}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([]);
                    }, 100);
                }}
                onFocus={handleSuggestions}
            />
            {suggestions.length > 0 && (
                <motion.ul
                    className="absolute z-10 bg-base/dark-line dark:bg-light-bg-1 w-full rounded-md mt-2 shadow-2xl dark:text-dark"
                    initial={{ opacity: 0, y: 10 }} // Initial animation values
                    animate={{ opacity: 1, y: 0 }} // Animation properties
                    transition={{ duration: 0.3 }} // Animation duration
                >
                    {suggestions.map((item, index) => (
                        <motion.li
                            key={index}
                            className="py-2 px-3.5 cursor-pointer hover:bg-primary-color/50 rounded-md transition-colors duration-200"
                            onClick={() => handleSelectedSuggestion(item.name)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 * index }} // Add staggered delay for each item
                            hover={{ backgroundColor: "#1F2937" }}>
                            <Link
                                to={`${location.pathname}product/${item._id}`}
                                className="flex gap-2 py-2 px-1">
                                <a
                                    className="h-[40px] block w-[40px]"
                                    aria-label="link-wrap-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover h-full min-w-[40px] rounded-full "
                                    />
                                </a>
                                <span>
                                    <p className="line-clamp-1">{item.name}</p>
                                    <p>$ {item.price}</p>
                                </span>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </motion.div>
    );
};

export default Input;
