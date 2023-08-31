import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { motion } from "framer-motion"; // Import motion components
import foodItemApi from "../api/foodItemApi";
import { useParams } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Product = () => {
    const [product, setProduct] = useState({});
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await foodItemApi.getOne(id);
                setProduct(res);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [id]);

    return (
        <div className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full">
        <motion.div
            initial={{ opacity: 0 }} // Initial animation properties
            animate={{ opacity: 1 }} // Animation properties when component is in view
            exit={{ opacity: 0 }} // Animation properties when component is removed
            className="min-h-max">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-6">
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-full sm:px-6">
                    <div
                        className="h-[500px] w-full block mb-5 "
                        aria-label="link-wrap-image">
                        <img
                            src={product.background}
                            alt={product.name}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {product.name}
                    </h1>
                </motion.div>

                {/* Options */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-white">
                        Price: $ {product.price}
                    </p>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <FiStar
                                        key={rating}
                                        className={classNames(
                                            product.rating > rating
                                                ? "text-white"
                                                : "text-gray-200",
                                            "h-5 w-5 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">
                                {product.average} out of 5 stars
                            </p>
                            <a
                                href={product.href}
                                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {product.totalCount} reviews
                            </a>
                        </div>
                    </div>
                    {/* Quantity */}
                    <h3 className="text-sm font-medium text-white mt-3">
                        Quantity :{" "}
                        <span className="text-base">{product.quantity}</span>
                    </h3>
                </motion.div>
                {/* Description and details */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-white">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-white">
                            Highlights
                        </h3>

                        <div className="mt-4">
                            <ul
                                role="list"
                                className="list-disc space-y-2 pl-4 text-sm">
                                {product.highlights?.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="text-gray-400">
                                        <span className="text-gray-400">
                                            {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-white">
                            Category:
                        </h2>
                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-400">
                                {product.category}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
        </div>
    );
};

export default Product;
