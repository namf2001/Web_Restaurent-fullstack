/** @format */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import foodItemApi from "../../api/foodItemApi";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { Button } from "../index";
import { FiDatabase, FiEdit } from "react-icons/fi";
import { TbDiscount } from "react-icons/tb";
import { MdDeleteOutline, MdOutlinePriceChange } from "react-icons/md";
import { toast } from "react-toastify";
import { RiImageEditFill } from "react-icons/ri";
import { resizeAndCompressImage, convertFileToBase64 } from "../../utils/image";
import { highlights } from "../../assets/data";
import { useSelector } from "react-redux";

let timer;
const timeout = 500;
let base64String = "";
let base64StringBackground = "";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const FormUpdateSetting = ({ foodItem, setModalOpen, onUpdate, onDelete }) => {
    const foodId = foodItem._id;
    const [foodSelected, setFoodSelected] = useState(foodItem);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodDescription, setFoodDescription] = useState("");
    const [foodImage, setFoodImage] = useState("");
    const [foodQuantity, setFoodQuantity] = useState(0);
    const [foodCategory, setFoodCategory] = useState("");
    const [foodDiscount, setFoodDiscount] = useState(0);
    const [foodBackground, setFoodBackground] = useState([]);
    const [selectedHighlights, setSelectedHighlights] = useState([]);
    const categories = useSelector((state) => state.category.value);
    // select image
    useEffect(() => {
        setFoodSelected(foodItem);
        setFoodName(foodItem !== undefined ? foodItem.name : "");
        setFoodPrice(foodItem !== undefined ? foodItem.price : 0);
        setFoodDescription(foodItem !== undefined ? foodItem.description : "");
        setFoodImage(foodItem !== undefined ? foodItem.image : "");
        setFoodQuantity(foodItem !== undefined ? foodItem.quantity : 0);
        setFoodCategory(foodItem !== undefined ? foodItem.category : "");
        setFoodDiscount(foodItem !== undefined ? foodItem.discount : 0);
        setFoodBackground(foodItem !== undefined ? foodItem.background : "");
        setSelectedHighlights(
            foodItem !== undefined ? foodItem.highlights : []
        );
    }, [foodItem]);

    const handleUpdate = async (e) => {
        const { name, value, } = e.target;
        clearTimeout(timer);
        // Định nghĩa một hàm ánh xạ giá trị vào thuộc tính
        function mapValueToProperty(name, value) {
            switch (name) {
                case "image":
                    return base64String || foodSelected.image;
                case "background":
                    return base64StringBackground || foodSelected.background;
                default:
                    return value;
            }
        }
        // Cập nhật state dựa trên tên thuộc tính
        switch (name) {
            case "name":
                setFoodName(value);
                break;
            case "description":
                setFoodDescription(value);
                break;
            case "price":
                setFoodPrice(value);
                break;
            case "quantity":
                setFoodQuantity(value);
                break;
            case "discount":
                setFoodDiscount(value);
                break;
            case "category":
                setFoodCategory(value);
                break;
            case "image":
                setFoodImage(mapValueToProperty(name, value));
                break;
            case "background":
                setFoodBackground(mapValueToProperty(name, value));
                break;
            default:
                break;
        }
        const updateFood = {
            ...foodSelected,
            [name]: mapValueToProperty(name, value),
        };

        onUpdate(updateFood);

        timer = setTimeout(async () => {
            const updateData = {
                image: base64String,
                background: base64StringBackground,
                highlights: selectedHighlights,
                // Thêm các thuộc tính khác nếu cần
            };
            // Xác định giá trị cần cập nhật dựa trên tên thuộc tính
            const updateValue = name in updateData ? updateData[name] : value;
            try {
                await foodItemApi.update(foodId, { [name]: updateValue });
            } catch (error) {
                console.log(error);
            }
        }, timeout);
    };

    const handleDelete = async () => {
        try {
            await foodItemApi.delete(foodId);
            toast.success("🦄 Delete success!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            toast.error("🦄 Delete fail!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        onDelete(foodId);
        setModalOpen(false);
    };

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        const name = e.target.name;
        if (selectedFile) {
            try {
                const compressedBlob = await resizeAndCompressImage(
                    selectedFile,
                    600,
                    600
                ); // Adjust maxWidth and maxHeight as needed
                if (name === "image") {
                    base64String = await convertFileToBase64(compressedBlob);
                    setFoodImage(base64String);
                } else if (name === "background") {
                    base64StringBackground = await convertFileToBase64(
                        compressedBlob
                    );
                    setFoodBackground(base64StringBackground);
                }
            } catch (error) {
                console.error("Error converting to Base64:", error);
            }
        }
    };

    const handleHighlightChange = async (event) => {
        const { value } = event.target;
        // Tạo một phiên bản mới của selectedHighlights để tránh ảnh hưởng đến state cũ trong closures
        const updatedHighlights = selectedHighlights.includes(value)
            ? selectedHighlights.filter((highlight) => highlight !== value)
            : [...selectedHighlights, value];
        try {
            // Cập nhật trạng thái React
            setSelectedHighlights(updatedHighlights);
            // Tạo object dữ liệu cần cập nhật
            const updateFood = {
                ...foodSelected,
                highlights: updatedHighlights,
            };
            // Gọi API để cập nhật dữ liệu
            await foodItemApi.update(foodId, { highlights: updatedHighlights });
            // Cập nhật thành công trên giao diện
            onUpdate(updateFood);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative flex flex-col items-center bg-neutral-800">
            <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-500 sm:right-1 sm:top-1 md:right-2 md:top-2 lg:right-3 lg:top-3"
                onClick={() => setModalOpen(false)}>
                <span className="sr-only">Close</span>
                {/* react icon x */}
                <AiOutlineClose />
            </button>
            <div className="flex mt-4 animate-pulse text-primary-color">
                <h2 className="text-2xl font-bold  pr-2 uppercase">
                    Edit Product
                </h2>
                {/* icon */}
                <div className="flex justify-center items-center">
                    <FiEdit className=" text-xl" />
                </div>
            </div>
            <div className="flex w-full items-center overflow-hidden  px-2 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="w-full overflow-hidden rounded-lg bg-base/dark-line-1 sm:col-span-4 lg:col-span-5 ">
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="flex flex-col gap-2 p-4">
                                    <span className="text-white p-2 font-medium text-center block">
                                        Backgrounds
                                    </span>
                                    <div className="w-40 mx-auto">
                                        <img
                                            src={foodImage}
                                            alt={foodName}
                                            className="object-cover object-center w-full rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* input image */}
                                <div className="absolute top-1 right-1">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden"
                                        onChange={async (e) => {
                                            await handleFileUpload(e);
                                            handleUpdate(e);
                                        }}
                                    />
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer flex justify-center items-center w-10 h-10 rounded-full bg-primary-color text-white hover:bg-primary-color-dark transition duration-300 ease-in-out">
                                        <RiImageEditFill />
                                    </label>
                                </div>
                            </div>
                            <hr />
                            {/* backgrounds image */}
                            <div className="relative">
                                <div className="flex flex-col gap-2 p-4">
                                    <span className="text-white p-2 font-medium text-center block">
                                        Backgrounds
                                    </span>
                                    <div className="w-40 mx-auto">
                                        <img
                                            src={foodBackground}
                                            alt={foodName}
                                            className="object-cover object-center w-full rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-1 right-1">
                                    <input
                                        type="file"
                                        name="background"
                                        id="background"
                                        className="hidden"
                                        onChange={async (e) => {
                                            await handleFileUpload(e);
                                            handleUpdate(e);
                                        }}
                                    />
                                    <label
                                        htmlFor="background"
                                        className="cursor-pointer flex justify-center items-center w-10 h-10 rounded-full bg-primary-color text-white hover:bg-primary-color-dark transition duration-300 ease-in-out">
                                        <AiFillStar />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7 flex flex-col h-full gap-4">
                        <div className="bg-base/dark-line-1 p-4 rounded-lg justify-start items-center gap-1 inline-flex">
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
                                    className="bg-base/dark-line-1 block rounded-md border-0 py-1.5 pl-3 w-full text-white text-xl focus:outline-none "
                                />
                            </div>
                        </div>
                        {/* Description */}
                        <div className="bg-base/dark-line-1 p-4 rounded-lg justify-start items-start gap-1 inline-flex col-span-ful">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-400">
                                Description:
                            </label>
                            <div className="w-full">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    placeholder="Add description product"
                                    defaultValue={foodDescription}
                                    className="bg-base/dark-line-1 block -mt-1 rounded-md border-0 py-1.5 pl-3 w-full text-light placeholder:text-light text-sm overflow-hidden hover:overflow-y-auto  leading-6 focus:outline-none scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full"
                                    onChange={handleUpdate}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            {/* Category */}
                            <div className="sm:col-span-3 flex-1 bg-base/dark-line-1 p-4 rounded-lg justify-start items-start gap-1 inline-flex">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium leading-6 text-gray-400">
                                    Category:
                                </label>
                                <div className="w-full">
                                    <select
                                        id="category"
                                        name="category"
                                        value={foodCategory}
                                        onChange={handleUpdate}
                                        className="bg-base/dark-line-1 -mt-1.5 block rounded-md border-none outline-none py-2 px-3 w-full text-white  focus:outline-none text-sm leading-6">
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Ratting */}
                            <div className="sm:col-span-3 flex-2 bg-base/dark-line-1 p-4 rounded-lg justify-start items-center gap-1 inline-flex h-full">
                                <h4 className="block text-sm font-medium leading-6 text-gray-400">
                                    Reviews:
                                </h4>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <AiFillStar
                                                key={index}
                                                className={classNames(
                                                    foodItem.rating > index
                                                        ? "text-gray-900"
                                                        : "text-gray-200",
                                                    "h-5 w-5 flex-shrink-0"
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">
                                        {foodItem.rating} out of 5 stars
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            {/* Discount */}
                            <div className="flex-1 bg-base/dark-line-1 p-4 rounded-lg">
                                <label
                                    htmlFor="discount"
                                    className="block text-sm font-medium leading-6 text-gray-400">
                                    Discount:
                                </label>
                                <div className="mt-2 flex items-center">
                                    <span className="text-xl font-semibold text-gray-400">
                                        <TbDiscount />
                                    </span>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        placeholder="Discount"
                                        value={foodDiscount}
                                        onChange={handleUpdate}
                                        className="bg-base/dark-line-1 block rounded-md border-0 py-1.5 pl-3 w-full text-white placeholder:text-light focus:outline-none text-xl leading-6 font-semibold"
                                        min="1" // Set the minimum value
                                        step="1" // Set the step increment
                                    />
                                </div>
                            </div>
                            {/* Quantity */}
                            <div className="flex-1 bg-base/dark-line-1 p-4 rounded-lg">
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium leading-6 text-gray-400">
                                    Quantity:
                                </label>
                                <div className="mt-2 flex items-center">
                                    <span className="text-xl font-semibold text-gray-400">
                                        <FiDatabase />
                                    </span>
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        value={foodQuantity}
                                        onChange={handleUpdate}
                                        className="bg-base/dark-line-1 block rounded-md border-0 py-1.5 pl-3 w-full text-white placeholder:text-light focus:outline-none text-xl leading-6 font-semibold"
                                        min="1" // Set the minimum value
                                        step="1" // Set the step increment
                                    />
                                </div>
                            </div>
                            {/* Price */}
                            <div className="flex-1 bg-base/dark-line-1 p-4 rounded-lg">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-400">
                                    Price:
                                </label>
                                <div className="mt-2 flex items-center">
                                    <span className="text-xl font-semibold text-gray-400">
                                        <MdOutlinePriceChange />
                                    </span>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        value={foodPrice}
                                        onChange={handleUpdate}
                                        className="bg-base/dark-line-1 block rounded-md border-0 py-1.5 pl-3 w-full text-white placeholder:text-light focus:outline-none text-xl leading-6 font-semibold"
                                        min="1" // Set the minimum value
                                        step="1" // Set the step increment
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Highlights */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="highlights"
                                className="block text-sm font-medium leading-6 text-gray-400">
                                Highlights:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {highlights.map((highlight) => (
                                    <button
                                        key={highlight}
                                        type="button"
                                        name="highlights"
                                        className={classNames(
                                            selectedHighlights.includes(
                                                highlight
                                            )
                                                ? "bg-primary-color"
                                                : "bg-base/dark-line-1",
                                            "inline-flex items-center px-3 py-1.5 rounded-full font-medium text-xs text-white focus:outline-none"
                                        )}
                                        onClick={handleHighlightChange}
                                        value={highlight}>
                                        {highlight}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* button order now */}
                        <div className="mt-auto ml-auto align-bottom w-16">
                            <Button
                                handler={handleDelete}
                                color="bg-red-500"
                                btnText={
                                    <MdDeleteOutline className="text-2xl" />
                                }
                            />
                        </div>
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
    onDelete: PropTypes.func,
};

export default FormUpdateSetting;
