/** @format */

import { HiPhotograph } from "react-icons/hi";
import foodItemApi from "../../api/foodItemApi";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFoodItem } from "../../redux/features/foodItemSlice";
import { Button } from "../index";
import { resizeAndCompressImage, convertFileToBase64 } from "../../utils/image";

const FormSetting = ({ setModalOpen }) => {
    const dispatch = useDispatch();
    const foodItems = useSelector((state) => state.foodItem.value);
    const categories = useSelector((state) => state.category.value);

    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get("name");
        const price = data.get("price");
        const quantity = data.get("quantity");
        const description = data.get("description");
        const category = data.get("category");
        try {
            const res = await foodItemApi.create({
                name,
                price,
                quantity,
                image,
                description,
                category,
            });
            dispatch(setFoodItem([res, ...foodItems]));
            console.log(res);
            toast.success("🦄 Wow so easy!", {
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
            toast.error("🦄 Something wrong!", {
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
        setModalOpen(false);
    };

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                setSelectedImage(selectedFile);
                const compressedBlob = await resizeAndCompressImage(
                    selectedFile,
                    600,
                    600
                ); // Adjust maxWidth and maxHeight as needed
                const base64String = await convertFileToBase64(compressedBlob);
                console.log("Base64 encoded string:", base64String);
                setImage(base64String);
            } catch (error) {
                console.error("Error converting to Base64:", error);
            }
        }
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-base/dark-bg-1-18">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <h2 className="text-3xl font-extrabold text-white uppercase">
                        Add a new product
                    </h2>
                </div>
            </div>
            <div className="mt-10 sm:mx-auto w-full">
                <form
                    className="space-y-6 flex justify-between w-full gap-12"
                    onSubmit={handleSubmit}>
                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-white">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Add name product"
                                    required
                                    className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-white">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    className="bg-base/dark-line block rounded-md border-0 py-2 px-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6">
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
                        <div className="flex gap-6 w-full">
                            <div className="flex-1">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-white">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                        min="1" // Set the minimum value
                                        step="1" // Set the step increment
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium leading-6 text-white">
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                        min="1" // Set the minimum value
                                        step="1" // Set the step increment
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-white">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                btnText="Cancel"
                                btnType="button"
                                outline={true}
                                handler={() => setModalOpen(false)}
                            />
                            <Button
                                btnText="Add Product"
                                btnType="submit"
                                outline={false}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 mt-0">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium leading-6 text-white">
                                Product Images
                            </label>
                            {/* Input type file */}
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="text-center">
                                    {selectedImage ? (
                                        <img
                                            src={image}
                                            alt="Selected"
                                            className="mx-auto h-32 w-32 object-cover rounded-md"
                                        />
                                    ) : (
                                        <HiPhotograph
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-base/dark-bg-1-18 font-semibold text-primary-color focus-within:outline-none hover:text-primary-color/50">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="image"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) =>
                                                    handleFileUpload(e)
                                                }
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

FormSetting.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
};

export default FormSetting;
// convert file to base64
