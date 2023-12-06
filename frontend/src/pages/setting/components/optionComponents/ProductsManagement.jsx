/** @format */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FormSetting, FormUpdateSetting } from "../../../../components/form";
import Modal from "../../../../components/modal/Modal";
import { setFoodItem } from "../../../../redux/features/foodItemSlice";
import ProductItem from "../common/ProductItem";

const ProductsManagement = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);
    const foodItems = useSelector((state) => state.foodItem.value);
    const category = useSelector((state) => state.category.value);
    const [spanX, setSpanX] = useState(0);
    const [data, setData] = useState([]);
    const categories = [{ id: 0, name: "All" }, ...category];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
        setData(foodItems);
    }, [foodItems]);

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

    const onUpdateFoodItem = (foodItem) => {
        const newData = [...data];
        const index = newData.findIndex((item) => item._id === foodItem._id);
        newData[index] = foodItem;
        setData(newData);
        dispatch(setFoodItem(newData));
    };

    const deleteFoodItem = (foodItem) => {
        const newData = [...data];
        const dataDelete = newData.filter((item) => {
            return item._id !== foodItem;
        });
        setData(dataDelete);
        dispatch(setFoodItem(dataDelete));
    };

    return (
        <>
            <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark grow shrink flex flex-col  mb-6 pt-6 gap-3 rounded-lg h-[calc(100vh-134px)] relative">
                <div className="flex flex-row justify-between items-center mb-3 mx-6">
                    <div className="whitespace-nowrap text-xl font-semibold w-48 shrink-0">
                        Products Management
                    </div>
                    <button className="border-solid border-[#393c49] shadow-[0px_8px_24px_0px_rgba(146,_136,_224,_0.3)] flex flex-row justify-center gap-2 h-12 items-center px-4 py-3 border rounded-lg">
                        <div className="overflow-hidden bg-black/0 flex flex-col w-5 shrink-0 items-center p-px">
                            <img
                                src="https://file.rendit.io/n/T0XUDlAr34svxxXglgE8.svg"
                                className="w-4"
                            />
                        </div>
                        <div className="whitespace-nowrap text-sm font-semibold text-white w-32">
                            Manage Categories
                        </div>
                    </button>
                </div>
                <div className="relative">
                    <motion.ul className="flex gap-2 items-center text-sm mb-3 ml-5">
                        {categories.map((item, index) => (
                            <motion.li
                                key={item.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }} // Hiệu ứng khi di chuột qua
                                whileTap={{ scale: 0.9 }} // Hiệu ứng khi nhấp vào
                                className={`flex items-center justify-center w-24 h-12 rounded-lg cursor-pointer line-clamp-1 ${
                                    selectedCategory.id === item.id
                                        ? "text-primary-color"
                                        : ""
                                }`}
                                onClick={() => {
                                    setSelectedCategory(item);
                                    setSpanX(index * 105); // Điều chỉnh khoảng cách ngang giữa các mục
                                }}>
                                {item.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                    <hr className="w-full h-[1px] bg-base/dark-line-1 dark:bg-primary-color/30 border-0 absolute" />
                    {selectedCategory && (
                        <motion.span
                            className="absolute w-20 h-1 bg-primary-color rounded-md -bottom-0.5 ml-5"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1.5, x: spanX }} // Đặt giá trị x để di chuyển span
                            transition={{ duration: 0.5 }}></motion.span>
                    )}
                </div>
                <motion.div
                    className="flex flex-wrap gap-6 items-center mx-6 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full mb-2"
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    <motion.div className="border-dashed border-color bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex flex-col justify-center gap-2 h-[300px] max-w-[220px] items-center border rounded-lg">
                        <button
                            className="flex flex-col justify-center w-12 h-12 shrink-0 items-center rounded-lg"
                            onClick={() => {
                                setModalOpen(true);
                            }}>
                            <img
                                src="https://file.rendit.io/n/hSwN9DGOrzlFWTKVn4WD.svg"
                                className="w-5"
                            />
                        </button>
                        <div className="text-center whitespace-nowrap font-semibold leading-[22.4px] text-[#ea736d] w-2/5 mx-16">
                            Add new dish
                        </div>
                    </motion.div>
                    {foodItems.map((foodItem) => {
                        if (
                            foodItem.category === selectedCategory.id ||
                            selectedCategory.id === categories[0].id
                        ) {
                            return (
                                <ProductItem
                                    key={foodItem._id}
                                    foodItem={foodItem}
                                    setSelectedFoodItem={setSelectedFoodItem}
                                    setModalUpdateOpen={setModalUpdateOpen}
                                />
                            );
                        }
                        return null;
                    })}
                </motion.div>
            </div>
            <Modal
                modalOpen={modalUpdateOpen}
                setModalOpen={setModalUpdateOpen}>
                {selectedFoodItem && (
                    <FormUpdateSetting
                        setModalOpen={setModalUpdateOpen}
                        foodItem={selectedFoodItem} // Truyền dữ liệu foodItem
                        onUpdate={onUpdateFoodItem} // Truyền hàm onUpdateFoodItem
                        onDelete={deleteFoodItem} // Truyền hàm onDeleteFoodItem
                    />
                )}
            </Modal>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <FormSetting setModalOpen={setModalOpen} />
            </Modal>
        </>
    );
};

export default ProductsManagement;
