import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import foodItemApi from "../../api/foodItemApi";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../index";

let timer;
const timeout = 500;

const FormUpdateSetting = ({ foodItem, setModalOpen, onUpdate }) => {
    const foodId = foodItem._id;
    const [foodSelected, setFoodSelected] = useState(foodItem);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodDescription, setFoodDescription] = useState("");
    const [foodImage, setFoodImage] = useState("");
    const [foodQuantity, setFoodQuantity] = useState(0);
    const [foodCategory, setFoodCategory] = useState("");
    const [foodStatus, setFoodStatus] = useState("");
    const [foodDiscount, setFoodDiscount] = useState(0);

    useEffect(() => {
        setFoodSelected(foodItem);
        setFoodName(foodItem !== undefined ? foodItem.name : "");
        setFoodPrice(foodItem !== undefined ? foodItem.price : 0);
        setFoodDescription(foodItem !== undefined ? foodItem.description : "");
        setFoodImage(foodItem !== undefined ? foodItem.image : "");
        setFoodQuantity(foodItem !== undefined ? foodItem.quantity : 0);
        setFoodCategory(foodItem !== undefined ? foodItem.category : "");
        setFoodStatus(foodItem !== undefined ? foodItem.status : "");
        setFoodDiscount(foodItem !== undefined ? foodItem.discount : 0);
    }, [foodItem]);

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        clearTimeout(timeout);

        if (name === "name") {
            setFoodName(value);
        } else if (name === "description") {
            setFoodDescription(value);
        } else if (name === "price") {
            setFoodPrice(value);
        } else if (name === "quantity") {
            setFoodQuantity(value);
        } else if (name === "category") {
            setFoodCategory(value);
        } else if (name === "status") {
            setFoodStatus(value);
        } else if (name === "discount") {
            setFoodDiscount(value);
        }

        const updateFood = {
            ...foodSelected,
            [name]: value,
        };
        onUpdate(updateFood);

        clearTimeout(timeout);
        setTimeout(async () => {
            try {
                await foodItemApi.update(foodId, { [name]: value });
            } catch (error) {
                console.log(error);
            }
        }, timeout);
    };

    return (
        <div className="relative flex w-full items-center overflow-hidden bg-neutral-800 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={() => setModalOpen(false)}>
                <span className="sr-only">Close</span>
                {/* react icon x */}
                <AiOutlineClose />
            </button>
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img
                        src={foodImage}
                        alt={foodName}
                        className="object-cover object-center rounded-full"
                    />
                </div>
                <div className="sm:col-span-8 lg:col-span-7 flex flex-col h-full gap-4">
                    <div className="bg-base/dark-line-1 p-4 rounded-lg justify-start items-center gap-1 inline-flex font-semibold">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-400">
                            Name:
                        </label>
                        <div className="w-full">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Add name product"
                                required
                                value={foodName}
                                onChange={handleUpdate}
                                className="bg-base/dark-line-1 block rounded-md border-0 py-1.5 pl-3 w-full text-white text-xl focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <input
                        className="text-white mt-2 bg-base/dark-bg-1-18"
                        value={foodDescription}
                        onChange={handleUpdate}
                        name="description"
                    />
                    {/* Category */}
                    <select
                        className="text-white mt-2 bg-base/dark-bg-1-18"
                        value={foodCategory}
                        onChange={handleUpdate}>
                        <option value="pizza">Pizza</option>
                        <option value="burger">Burger</option>
                        <option value="drink">Drink</option>
                        <option value="dessert">Dessert</option>
                    </select>
                    {/* Status */}
                    <select
                        className="text-white mt-2 bg-base/dark-bg-1-18"
                        value={foodStatus}
                        onChange={handleUpdate}>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                    {/* Discount */}
                    <input
                        className="text-white mt-2 bg-base/dark-bg-1-18"
                        value={foodDiscount}
                        onChange={handleUpdate}
                        name="discount"
                    />
                    {/* Quantity */}
                    <input
                        className="text-white mt-2 bg-base/dark-bg-1-18"
                        value={foodQuantity}
                        onChange={handleUpdate}
                        name="quantity"
                    />
                    {/* Price */}
                    <div className="w-1/2 h-24 p-4 bg-base/dark-line-1 rounded-lg flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-white text-3xl font-semibold leading-10 flex items-center gap-1">
                                <span className="text-gray-400 text-sm">
                                    Price:$
                                </span>
                                <input
                                    value={foodPrice}
                                    name="price"
                                    className="text-white bg-base/dark-line-1  inline w-full focus:outline-none"
                                    onChange={handleUpdate}
                                />
                            </div>
                        </div>
                    </div>
                    {/* button order now */}
                    <div className="mt-auto align-bottom">
                        <Button btnText="Order Now" />
                    </div>
                </div>
            </div>
        </div>
    );
};

FormUpdateSetting.propTypes = {
    foodItem: PropTypes.object,
    setModalOpen: PropTypes.func,
    onUpdate: PropTypes.func,
};

export default FormUpdateSetting;
