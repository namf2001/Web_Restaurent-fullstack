/** @format */

import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { Product } from "../../../components";
import { motion } from "framer-motion";
const TopProduct = ({ foodItem }) => {
    const [heroImg, setHeroImg] = useState([]);
    useEffect(() => {
        setHeroImg(foodItem.slice(0, 5));
    }, [foodItem]);

    return (
        <motion.div>
            <div className="flex flex-col items-center gap-6 mt-24">
                <h1 className="text-center text-7xl font-['DM_Serif_Display'] dark:text-black">
                    Top List is Back
                </h1>
                <p className="text-center text-xl max-w-lg font-['Barlow_Condensed'] text-gray-400 dark:text-slate-600">
                    Tất cả những bữa ăn ngon nhất của chúng tôi trong một lần
                    chụp ngon
                </p>
                <div className="flex flex-wrap gap-6 items-center justify-center xl:max-w-screen-md">
                    {heroImg.map((heroItem) => (
                        <div key={heroItem._id} className="select-none">
                            <Product {...heroItem} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

TopProduct.propTypes = {
    foodItem: propTypes.array.isRequired,
};

export default TopProduct;
