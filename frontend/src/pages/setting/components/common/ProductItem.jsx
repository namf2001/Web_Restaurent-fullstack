/** @format */
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProductItem = ({ foodItem, setSelectedFoodItem, setModalUpdateOpen }) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <motion.div
            className="flex flex-col justify-between h-[300px] max-w-[220px]"
            key={foodItem.id}
            variants={item}>
            <div className="border-dashed border-dark dark:border-primary-color flex flex-col pt-6 gap-4 m-0 border rounded-lg h-full">
                <img
                    src={foodItem.image}
                    className="self-center rounded-full w-36 h-36"
                />
                <div className="flex flex-col gap-2 mx-10">
                    <div className="text-center text-sm font-medium leading-[18.2px]  truncate">
                        {foodItem.name}
                    </div>
                    <div className="flex flex-row justify-between items-center mx-4">
                        <div className="text-center whitespace-nowrap text-sm  text-[#abbbc2] dark:text-slate-600 w-10 shrink-0">
                            $ {foodItem.price}
                        </div>
                        <span>•</span>
                        <div className="text-center whitespace-nowrap text-sm  text-[#abbbc2] dark:text-slate-600 w-1/2">
                            {foodItem.quantity} Bowls
                        </div>
                    </div>
                </div>
                <button
                    className="flex bg-primary-color/25 mx-0 mt-auto justify-center gap-2 h-12 w-full shrink-0 items-center rounded-br-lg rounded-bl-lg"
                    id="Button1">
                    <div
                        className="overflow-hidden flex flex-col w-5 shrink-0 items-center p-1"
                        id="IconLineEdit">
                        <img
                            src="https://file.rendit.io/n/JYQOdGAHE1g25jvLytUt.svg"
                            className="w-4"
                        />
                    </div>
                    <div
                        className="whitespace-nowrap text-sm font-semibold text-primary-color shrink-0"
                        onClick={() => {
                            setSelectedFoodItem(foodItem); // Cập nhật selectedFoodItem khi nhấp vào Edit dish
                            setModalUpdateOpen(true); // Mở modal
                        }}>
                        Edit dish
                    </div>
                </button>
            </div>
        </motion.div>
    );
};

ProductItem.propTypes = {
    foodItem: PropTypes.object.isRequired,
    setSelectedFoodItem: PropTypes.func.isRequired,
    setModalUpdateOpen: PropTypes.func.isRequired,
};

export default ProductItem;
