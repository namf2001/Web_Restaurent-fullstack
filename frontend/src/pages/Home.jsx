import { useEffect, useRef, useState } from "react";
import MenuDropDown from "../components/MenuDropDown";
import { motion } from "framer-motion";
import { Product } from "../components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

const Home = () => {
    const foodItems = useSelector((state) => state.foodItem.value);
    // console.log(foodItems)
    const ref = useRef(null);
    const typeProducts = foodItems
        .map((foodItem) => foodItem.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    typeProducts.unshift("All");
    const option = ["expensive", "average", "cheap"];
    const [currenOptions, setCurrenOptions] = useState(option[0]);
    const [selectedType, setSelectedType] = useState(typeProducts[0]);
    const [spanX, setSpanX] = useState(0);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = ref.current.scrollLeft;
            const width = ref.current.scrollWidth;
            const clientWidth = ref.current.clientWidth;
            if (scroll + clientWidth === width) {
                ref.current.scrollTo(0, 0);
            }
        };
        const interval = setInterval(handleScroll, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="px-6 flex flex-col h-full">
            <div className="relative">
                <ul className="flex gap-2 items-center text-sm mb-3">
                    {typeProducts.map((typeProduct, index) => (
                        <motion.li
                            key={typeProduct}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }} // Hiệu ứng khi di chuột qua
                            whileTap={{ scale: 0.9 }} // Hiệu ứng khi nhấp vào
                            onClick={() => {
                                setSelectedType(typeProduct);
                                setSpanX(index * 88); // Điều chỉnh khoảng cách ngang giữa các mục
                            }}
                            className={
                                selectedType === typeProduct
                                    ? "text-primary-color font-semibold w-20 text-center"
                                    : "w-20 text-center"
                            }>
                            {typeProduct}
                        </motion.li>
                    ))}
                </ul>
                <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 absolute" />
                {selectedType && (
                    <motion.span
                        className="absolute w-20 h-1 bg-primary-color rounded-md -bottom-0.5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1.5, x: spanX }} // Đặt giá trị x để di chuyển span
                        transition={{ duration: 0.5 }}></motion.span>
                )}
            </div>
            <div className="py-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Choose {selectedType}</h1>
                <div>
                    <MenuDropDown
                        option={option}
                        options={currenOptions}
                        setOptions={setCurrenOptions}
                    />
                </div>
            </div>
            <div className="h-[calc(100vh-240px)] overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full">
                <div
                    ref={ref}
                    className="flex flex-wrap justify-start items-start gap-6  z-0"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-once="true">
                    {foodItems.map((foodItem) => {
                        if (
                            foodItem.category === selectedType ||
                            selectedType === "All"
                        ) {
                            return (
                                <Product
                                    key={foodItem._id}
                                    {...foodItem}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
