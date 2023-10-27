/** @format */

import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { Button } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import CartApi from "../../api/cartApi";
import { setCart } from "../../redux/features/cartSlice";
import { HiFire } from "react-icons/hi";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const FormProduct = ({ setModalOpen, foodDetail }) => {
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const getRating = foodDetail.reviews?.reduce(
            (acc, item) => acc + item.rating,
            0
        );
        setRating((getRating / foodDetail.reviews?.length).toFixed(1));
    }, [foodDetail.reviews]);

    const handleAddToCart = async (id, quantity) => {
        try {
            const res = await CartApi.addToCart(id, quantity);
            dispatch(setCart(res.data));
            toast.success(res.message, {
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
            console.log(error);
            if (error.statusText === "Unauthorized") {
                toast.error("Bạn cần đăng nhập để mua hàng", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate("/login");
            }
        }
    };

    return (
        <div className="relative flex w-full h-[600px] items-center justify-center overflow-hidden px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
                type="button"
                className="absolute z-50 font-bold  right-4 top-4 text-primary-color hover:text-gray-500 sm:right-10 sm:top-10 md:right-10 md:top-10 lg:right-40 lg:top-20"
                onClick={() => setModalOpen(false)}>
                <span className="sr-only">Close</span>
                <AiOutlineClose />
            </button>
            <div className="w-full relative flex items-center justify-center">
                <img
                    src={foodDetail.background}
                    className="w-[480px] h-[553px] rounded-3xl flex items-center absolute left-[10%] shadow-sm"
                    alt="star wars"
                />
                <div className="w-[654px] h-[479px] bg-base/dark-bg-1-18 absolute right-[10%] rounded-3xl shadow-md">
                    <img
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-1/2"
                        src={foodDetail.image}
                        alt="helmet"
                    />
                    <div className="w-[350px] h-[300px] mt-[50px] ml-[235px] text-white flex flex-col gap-4">
                        <h1 className="font-bold  text-3xl uppercase">
                            {foodDetail.name}
                        </h1>
                        <h2 className="text-5xl font-bold text-primary-color tracking-wider">
                            ${foodDetail.price}
                        </h2>
                        {/* Rating */}
                        <div className="flex items-end gap-4 mb-4 w-full">
                            <span className="text-2xl leading-4 text-gray-400">
                                <span className="text-3xl text-white">
                                    {rating === "NaN" ? 0 : rating}
                                </span>
                                /5
                            </span>
                            <div className="flex items-center gap-1 pb-1">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((star) => (
                                        <HiFire
                                            key={star}
                                            className={classNames(
                                                rating > star
                                                    ? "text-primary-color"
                                                    : "text-gray-200",
                                                "h-5 w-5 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}{" "}
                                    | {foodDetail.reviews?.length}{" "}
                                    <span className="text-xs text-gray-400 ml-1">
                                        lượt đánh giá
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-36 flex flex-col gap-2">
                            <div className="flex items-start">
                                <div className="w-1/2 float-left border-r border-solid border-red-600 flex flex-col gap-4">
                                    <h4 className="font-bold">SIZE</h4>
                                    <div className="flex gap-4">
                                        <p>S</p>
                                        <p>M</p>
                                        <p>L</p>
                                        <p>XL</p>
                                    </div>
                                </div>
                                <div className="w-1/2 float-left text-center">
                                    <h4 className="font-bold">QUANTITY</h4>
                                    <div className="flex justify-center items-center gap-4 py-4">
                                        <button
                                            className="w-10 h-10 rounded-s-md bg-base/dark-line-1"
                                            onClick={() => {
                                                if (quantity > 1) {
                                                    setQuantity(quantity - 1);
                                                }
                                            }}>
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            className="w-10 h-10 rounded-e-md bg-base/dark-line-1"
                                            onClick={() => {
                                                if (
                                                    quantity <
                                                    foodDetail.quantity
                                                ) {
                                                    setQuantity(quantity + 1);
                                                } else {
                                                    toast.error(
                                                        "Số lượng sản phẩm trong kho không đủ",
                                                        {
                                                            position:
                                                                "top-center",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "dark",
                                                        }
                                                    );
                                                }
                                            }}>
                                            +
                                        </button>{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around items-center gap-2">
                                <div className="w-40 uppercase">
                                    <Button
                                        btnText="thêm vào giỏ"
                                        handler={() =>
                                            handleAddToCart(
                                                foodDetail._id,
                                                quantity
                                            )
                                        }
                                    />
                                </div>
                                {/* icon heart */}
                                <Link
                                    to={`${location.pathname}product/${foodDetail._id}`}
                                    className="w-40">
                                    <Button btnText="xem thêm" outline={true} />
                                </Link>
                                {/* <div className="flex gap-2">
                                    <AiFillHeart className="text-xl text-red-600" />
                                    <a
                                        href="#"
                                        className="font-light text-xs text-gray-400">
                                        ADD TO WISHLIST
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* end */}
            </div>
        </div>
    );
};

FormProduct.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
    foodDetail: PropTypes.object.isRequired,
};

export default FormProduct;
