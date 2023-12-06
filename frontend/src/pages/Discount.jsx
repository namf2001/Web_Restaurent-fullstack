/** @format */

import { Fragment, useEffect, useState } from "react";
import MenuDropDown from "../components/MenuDropDown";
import { motion } from "framer-motion";
import { Product } from "../components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

const Discount = () => {
    const foodItems = useSelector((state) => state.foodItem.value);
    const category = useSelector((state) => state.category.value);
    const categories = [{ id: 0, name: "All" }, ...category];
    const option = ["expensive", "average", "cheap"];
    const [currenOptions, setCurrenOptions] = useState(option[0]);
    const [selectedType, setSelectedType] = useState(categories[0]);
    const [spanX, setSpanX] = useState(0);

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="px-6 flex flex-col h-full w-full">
            <div className="relative">
                <motion.ul className="flex gap-2 items-center text-sm mb-3 flex-wrap dark:text-dark">
                    {categories.map((item, index) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }} // Hiệu ứng khi di chuột qua
                            whileTap={{ scale: 0.9 }} // Hiệu ứng khi nhấp vào
                            onClick={() => {
                                setSelectedType(item);
                                setSpanX(index * 88); // Điều chỉnh khoảng cách ngang giữa các mục
                            }}
                            className={
                                selectedType.id === item.id
                                    ? "text-primary-color font-semibold w-20 text-center"
                                    : "w-20 text-center"
                            }>
                            {item.name}
                        </motion.li>
                    ))}
                </motion.ul>
                <hr className="w-full h-[2px] bg-base/dark-line-1 dark:bg-light-bg-1 border-0 absolute" />
                {selectedType && (
                    <motion.span
                        className="absolute w-20 h-1 bg-primary-color rounded-md -bottom-0.5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1.5, x: spanX }} // Đặt giá trị x để di chuyển span
                        transition={{ duration: 0.5 }}></motion.span>
                )}
            </div>
            <div className="py-6 flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-dark uppercase">
                    Choose {selectedType.name}
                </h1>
                <div>
                    <MenuDropDown
                        option={option}
                        options={currenOptions}
                        setOptions={setCurrenOptions}
                    />
                </div>
            </div>
            <div className="h-[calc(100vh-240px)] overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full">
                <motion.ul
                    className="flex flex-wrap justify-start items-start gap-6 z-0"
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    {foodItems.map((foodItem) => {
                        if (
                            (selectedType.id === 0 && foodItem.discount > 0) || // Hiển thị các món có giảm giá khi selectedType là "All"
                            (foodItem.discount > 0 &&
                                foodItem.category === selectedType.id)
                        ) {
                            return (
                                <Fragment key={foodItem._id}>
                                    <Product {...foodItem} />
                                </Fragment>
                            );
                        }
                        return null;
                    })}
                </motion.ul>
            </div>
        </div>
    );
};

export default Discount;
