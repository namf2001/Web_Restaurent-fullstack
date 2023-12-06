/** @format */
import { AiOutlinePlusCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import CategoryApi from "../../../../api/categoryApi";
import { setCategory } from "../../../../redux/features/categorySlice";
import { HiPhotograph } from "react-icons/hi";
import {
    resizeAndCompressImage,
    convertFileToBase64,
} from "../../../../utils/image";
import { BiChevronDown } from "react-icons/bi";

let timer = null;
const timeout = 500;
let base64String = "";

const CategoriesManagement = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.value);
    const [selectedCategory, setSelectedCategory] = useState(category[0]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        setName(selectedCategory !== undefined ? selectedCategory.name : "");
        setDescription(
            selectedCategory !== undefined ? selectedCategory.description : ""
        );
        setImage(selectedCategory !== undefined ? selectedCategory.image : "");
    }, [selectedCategory]);

    const createCategory = async () => {
        try {
            const res = await CategoryApi.create();
            const newCategory = [...category];
            newCategory.push(res.data);
            dispatch(setCategory(newCategory));
        } catch (error) {
            console.log(error);
        }
    };

    const updateCategory = async (e, id) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        if (name === "description") setDescription(value);
        if (name === "image") {
            setImage(image === "" ? selectedCategory.image : base64String);
        }

        if (timer) clearTimeout(timer);

        dispatch(
            setCategory(
                category.map((item) =>
                    item._id === id ? { ...item, [name]: value } : item
                )
            )
        );

        timer = setTimeout(async () => {
            CategoryApi.update(id, {
                [name]: name === "image" ? base64String : value,
            })
                .then((res) => {
                    console.log(base64String);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, timeout);
    };

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                const compressedBlob = await resizeAndCompressImage(
                    selectedFile,
                    600,
                    600
                ); // Adjust maxWidth and maxHeight as needed
                base64String = await convertFileToBase64(compressedBlob);
                setImage(base64String);
            } catch (error) {
                console.error("Error converting to Base64:", error);
            }
        }
    };

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
    const child = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark grow shrink flex gap-3 rounded-lg h-[calc(100vh-134px)] relative">
            <div className="w-60 h-full rounded-s-md border-0 border-r-4 border-dark">
                <div className="flex flex-col justify-between py-2">
                    <h3 className="text-xl font-semibold px-4 py-6 text-center">
                        Categories
                    </h3>
                    <button
                        className="flex items-center justify-between bg-primary-color hover:bg-primary-color/50 text-white py-2 px-4 border-0 border-b-4 border-dark"
                        onClick={createCategory}>
                        <span className="text-sm font-semibold">
                            Add Category
                        </span>
                        <span className="text-xl">
                            <AiOutlinePlusCircle />
                        </span>
                    </button>
                    <motion.ul
                        className="flex flex-col gap-2 py-2"
                        variants={container}
                        initial="hidden"
                        animate="visible">
                        {category.map((item) => (
                            <motion.li
                                variants={child}
                                key={item._id}
                                onClick={() => setSelectedCategory(item)}
                                className={`h-10 px-4 bg-base/dark-bg-2-14 dark:bg-light-bg-1 hover:bg-base/dark-bg-1-18 flex items-center justify-between  cursor-pointer ${
                                    selectedCategory._id === item._id &&
                                    "-mr-1 border-0 border-r-4 border-primary-color bg-base/dark-line dark:bg-light-bg-2 text-white"
                                }`}>
                                <span className="text-sm font-semibold">
                                    {item.name}
                                </span>
                                <span
                                    className={`font-semibold text-3xl transform transition duration-300 ${
                                        selectedCategory._id === item._id && "-rotate-90"
                                    }`}>
                                    <BiChevronDown />
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full flex items-center justify-between py-6 px-10">
                    <h3 className="text-xl font-semibold">
                        Tên danh mục:{" "}
                        <input
                            type="text"
                            className="bg-transparent focus:outline-none"
                            name="name"
                            value={name}
                            onChange={(e) =>
                                updateCategory(e, selectedCategory._id)
                            }
                        />
                    </h3>
                    {/* button delete */}
                    <button className="flex items-center justify-between bg-primary-color hover:bg-primary-color/50 text-white py-2 px-4 rounded-3xl">
                        <span className="text-sm font-semibold pr-2">
                            Delete Category
                        </span>
                        <span className="text-xl">
                            <FiTrash />
                        </span>
                    </button>
                </div>
                <div className="flex flex-col">
                    {/* des and image */}
                    <div className="flex flex-col gap-2 px-10">
                        <h3 className="text-lg font-semibold">
                            Mô tả:
                        </h3>
                        <textarea
                            className="w-full bg-transparent focus:outline-none"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={(e) =>
                                updateCategory(e, selectedCategory._id)
                            }
                        />
                    </div>
                    {/* image */}
                    <div className="flex flex-col gap-2 px-10">
                        <h3 className="text-lg font-semibold">
                            Ảnh:
                        </h3>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-amber-950 border-dashed rounded-md">
                            <div className="text-center">
                                {image ? (
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
                                        className="relative cursor-pointer rounded-md bg-base/dark-bg-1-18 dark:bg-light-bg-1 px-2 font-semibold text-primary-color focus-within:outline-none hover:text-primary-color/50">
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="image"
                                            type="file"
                                            className="sr-only"
                                            onChange={async (e) => {
                                                await handleFileUpload(e);
                                                updateCategory(
                                                    e,
                                                    selectedCategory._id
                                                );
                                            }}
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
            </div>
        </div>
    );
};

export default CategoriesManagement;
