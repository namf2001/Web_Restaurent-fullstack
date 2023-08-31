import { useEffect, useState } from "react";
import { Button } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FormUpdateSetting } from "../../../../components/form";
import Modal from "../../../../components/modal/Modal";
import { setFoodItem } from "../../../../redux/features/foodItemSlice";

// eslint-disable-next-line react/prop-types
const ProductsManagement = ({ setModalOpen }) => {
    const dispatch = useDispatch();
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);
    const foodItems = useSelector((state) => state.foodItem.value);
    const typeProducts = foodItems
        .map((foodItem) => foodItem.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    typeProducts.unshift("All");
    const [spanX, setSpanX] = useState(0);
    const [selectedType, setSelectedType] = useState(typeProducts[0]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(foodItems);
    }, [foodItems]);

    const onUpdateFoodItem = (foodItem) => {
        const newData = [...data];
        const index = newData.findIndex((item) => item._id === foodItem._id);
        newData[index] = foodItem;
        setData(newData);
        dispatch(setFoodItem(newData));
    };

    const deleteFoodItem = (foodItem) => {
        const newData = [...data];
        const dataDelete = newData.filter((item) =>{
            return item._id !== foodItem
        });
        setData(dataDelete);
        dispatch(setFoodItem(dataDelete));
    };
    return (
        <>
            <div className="bg-base/dark-bg-2-14 grow shrink flex flex-col  mb-6 pt-6 gap-3 rounded-lg h-[calc(100vh-134px)] relative">
                <div className="flex flex-row justify-between items-center mb-3 mx-6">
                    <div className="whitespace-nowrap text-xl font-semibold text-white w-48 shrink-0">
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
                    <ul className="flex gap-2 items-center text-sm mb-3 ml-2">
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
                            className="absolute left-2  w-20 h-1 bg-primary-color rounded-md -bottom-0.5"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1.2, x: spanX }} // Đặt giá trị x để di chuyển span
                            transition={{ duration: 0.5 }}></motion.span>
                    )}
                </div>
                <div className="flex flex-wrap gap-6 items-center mx-6 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full mb-20">
                    <div className="border-dashed border-color bg-base/dark-bg-2-14 flex flex-col justify-center gap-2 h-[300px] max-w-[220px] items-center border rounded-lg">
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
                    </div>
                    {foodItems.map((foodItem) => {
                        if (
                            foodItem.category === selectedType ||
                            selectedType === "All"
                        ) {
                            return (
                                <div
                                    className="flex flex-col justify-between h-[300px] max-w-[220px]"
                                    key={foodItem.id}>
                                    <div className="border-dashed border-dark flex flex-col pt-6 gap-4 m-0 border rounded-lg h-full">
                                        <img
                                            src={foodItem.image}
                                            className="self-center rounded-full w-36 h-36"
                                        />
                                        <div className="flex flex-col gap-2 mx-10">
                                            <div className="text-center text-sm font-medium leading-[18.2px] text-white truncate">
                                                {foodItem.name}
                                            </div>
                                            <div className="flex flex-row justify-between items-center mx-4">
                                                <div className="text-center whitespace-nowrap text-sm  text-[#abbbc2] w-10 shrink-0">
                                                    $ {foodItem.price}
                                                </div>
                                                <span>•</span>
                                                <div className="text-center whitespace-nowrap text-sm  text-[#abbbc2] w-1/2">
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
                                                    setSelectedFoodItem(
                                                        foodItem
                                                    ); // Cập nhật selectedFoodItem khi nhấp vào Edit dish
                                                    setModalUpdateOpen(true); // Mở modal
                                                }}>
                                                Edit dish
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="absolute h-[80px] -bottom-1 left-0 w-full flex items-center p-6 border-t-1 border-dark bg-base/dark-bg-2-14">
                    <div className="flex gap-3 w-3/5 ">
                        <Button
                            btnText="Discard Changes"
                            outline={true}
                            // handler={togglePayment}
                        />
                        <Button btnText="Save Changes" />
                    </div>
                </div>
            </div>
            <Modal
                modalOpen={modalUpdateOpen}
                setModalOpen={setModalUpdateOpen}>
                {selectedFoodItem && (
                    <FormUpdateSetting
                        setModalOpen={setModalUpdateOpen}
                        foodItem={selectedFoodItem} // Truyền dữ liệu foodItem
                        onUpdate={onUpdateFoodItem}
                        onDelete={deleteFoodItem}
                    />
                )}
            </Modal>
        </>
    );
};

export default ProductsManagement;
