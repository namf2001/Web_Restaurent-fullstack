/** @format */
import { useState } from "react";
import { Button } from "../../../components";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import propTypes from "prop-types";
import { HiInformationCircle as FaCircleInfo, HiFire } from "react-icons/hi";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
// import required modules
import {
    Mousewheel,
    Pagination,
    Navigation,
    Autoplay,
    FreeMode,
    Thumbs,
} from "swiper/modules";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ProductDetail = ({
    product,
    handleAddToCart,
    rating,
    handleAddToWishlist,
    isWishlist,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="flex bg-gradient-to-r from-slate-950 dark:from-[#F2EAD3] via-slate-950 dark:to-[#F2EAD3] to-slate-900 rounded-xl shadow-xl">
            <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex-1 flex flex-col gap-10 relative p-12 rounded-xl rounded-br-3xl rounded-tr-3xl shadow-inner dark:text-dark">
                <div>
                    <h2 className="text-xl font-bold">NONE@</h2>
                    <span className="text-gray-400 text-xs">
                        Lorem ipsum dolor sit amet.
                    </span>
                </div>
                <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    spaceBetween={30}
                    mousewheel={true}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        hideOnClick: true,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className} bg-primary-color"></span>`;
                        },
                    }}
                    modules={[Mousewheel, Pagination, Navigation]}
                    className="flex flex-col gap-8 items-start pl-16 max-h-[350px]">
                    <div className="top-[40%] swiper-button-prev after:contents">
                        <FaCircleInfo className="text-5xl text-primary-color" />
                    </div>
                    <div className="top-[60%] left-[10px] swiper-button-next after:contents">
                        <FaCartPlus className="text-5xl text-primary-color" />
                    </div>
                    <SwiperSlide className="self-stretch flex flex-col mr-12 gap-4 items-start">
                        <div className="text-5xl font-semibold text-white dark:text-dark">
                            {product.name}
                        </div>
                        <h4 className="sr-only">Reviews</h4>
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((star) => (
                                <HiFire
                                    key={star}
                                    className={classNames(
                                        rating > star
                                            ? "text-primary-color"
                                            : "text-gray-200 dark:text-slate-600",
                                        "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                            ))}{" "}
                            | {product.reviews?.length}{" "}
                            <span className="text-xs text-gray-400 dark:text-slate-600 ml-1">
                                lượt đánh giá
                            </span>
                        </div>
                        <div className="self-stretch flex flex-col gap-6 items-start">
                            <div className="flex items-end gap-4">
                                {product.discount > 0 && (
                                    <span className="text-3xl font-medium text-gray-400 dark:text-slate-600 line-through">
                                        {product.price}$
                                    </span>
                                )}
                                <span className="text-5xl font-extrabold text-primary-color">
                                    {product.discount > 0
                                        ? (product.price / 100) *
                                          (100 - product.discount)
                                        : product.price}
                                    $
                                </span>
                                {product.discount > 0 && (
                                    <span className="text-sm font-medium px-3 py-1 bg-red-400 rounded-sm">
                                        GIẢM {product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-400 dark:text-slate-600 line-clamp-2">
                                {product.description}
                            </div>
                            <ul className="text-sm text-white">
                                {product.highlights?.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="text-gray-400">
                                        <span className="text-gray-400">
                                            - {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex flex-col gap-8">
                        <h3 className="text-3xl font-bold line-clamp-1">
                            {product.name}
                        </h3>
                        <div className="self-stretch flex mr-12 gap-4 items-center">
                            <div className="flex-1">
                                <img
                                    src={product.image}
                                    alt=""
                                    className="object-cover w-full h-full rounded-full shadow-3xl"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-6">
                                <div>
                                    <span className="text-xl font-medium text-gray-400 line-through mr-2">
                                        {product.price * quantity}${" "}
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="text-sm font-medium px-3 py-1 bg-red-400 rounded-sm text-white">
                                            GIẢM {product.discount}%
                                        </span>
                                    )}
                                </div>
                                <div className="text-5xl font-extrabold text-primary-color">
                                    {product.discount > 0
                                        ? (product.price / 100) *
                                          (100 - product.discount) *
                                          quantity
                                        : product.price * quantity}
                                    $
                                </div>
                                <div className="flex items-center justify-between w-1/2 bg-base/dark-line dark:bg-orange-400 rounded-md">
                                    <button
                                        className="w-10 h-10 rounded-s-md bg-base/dark-line-1 dark:bg-orange-300"
                                        onClick={() => {
                                            if (quantity > 1) {
                                                setQuantity(quantity - 1);
                                            }
                                        }}>
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                        className="w-10 h-10 text-center bg-transparent block rounded-md border-0 py-1.5 text-light dark:text-slate-600 ring-0 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light dark:placeholder:text-slate-600 focus:ring-0 focus:ring-inset focus:ring-offset-gray-950 dark:focus:ring-offset-orange-200 focus:outline-none text-sm leading-6"
                                    />
                                    <button
                                        className="w-10 h-10 rounded-e-md bg-base/dark-line-1 dark:bg-orange-300"
                                        onClick={() => {
                                            if (quantity < product.quantity) {
                                                setQuantity(quantity + 1);
                                            } else {
                                                toast.error(
                                                    "Số lượng sản phẩm trong kho không đủ",
                                                    {
                                                        position: "top-center",
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
                                <p className="text-xs text-gray-400 -mt-4">
                                    {product.quantity} sản phẩn có sắn
                                </p>
                                <div className="w1/2">
                                    <Button
                                        btnText="Thêm vào giỏ hàng"
                                        handler={() =>
                                            handleAddToCart(
                                                product._id,
                                                quantity
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="absolute top-0 right-16 w-16 h-28 flex justify-center items-center bg-primary-color rounded-b-full shadow-3xl">
                    <button
                        className="w-10 h-10 rounded-full bg-primary-color/50 flex justify-center items-center"
                        onClick={() => handleAddToWishlist(product._id)}>
                        {isWishlist ? (
                            <AiFillHeart className="text-red-600 text-3xl" />
                        ) : (
                            <AiOutlineHeart className="text-white text-3xl" />
                        )}
                    </button>
                </div>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden">
                <div className="flex flex-col justify-between gap-40 bg-[url('https://learnenglish.britishcouncil.org/sites/podcasts/files/2021-10/RS4905_81989918-hig_0.jpg')] h-full rounded-sm">
                    <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-slate-950 dark:from-[#F2EAD3]/80 via-slate-300/20 dark:via-slate-300/10 dark:to-[#F2EAD3]/80 to-slate-900 h-full rounded-sm">
                        <Swiper
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={1}
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                            loop={true}
                            className="w-[600px] h-[350px]">
                            <SwiperSlide className="flex items-center">
                                <img
                                    src={product.image}
                                    className="object-contain w-[350px] m-auto rounded-full"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex items-center">
                                <img
                                    src="https://freepngimg.com/download/pizza/34833-1-pizza-slice-transparent-background.png"
                                    className="object-contain h-[350px] w-4/5 mx-auto"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex items-center">
                                <img
                                    src="https://th.bing.com/th/id/R.b833182f7ef05628f6c15ac7b74fbb73?rik=ZmKh59V2cFD6kg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fpizza%2fpizza_PNG7143.png&ehk=tIYK0zpgeiuutcFQ28M8j11noK3Ix7OgDpB6EVNR92M%3d&risl=&pid=ImgRaw&r=0"
                                    className="object-contain h-[350px] w-4/5 mx-auto"
                                />
                            </SwiperSlide>
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={30}
                            slidesPerView={3}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="max-w-[50%] mySwiper flex items-center mt-10">
                            <SwiperSlide>
                                <img
                                    src={product.image}
                                    className="object-contain rounded-full m-auto"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://freepngimg.com/download/pizza/34833-1-pizza-slice-transparent-background.png"
                                    className="object-contain m-auto"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex items-center">
                                <img
                                    src="https://th.bing.com/th/id/R.b833182f7ef05628f6c15ac7b74fbb73?rik=ZmKh59V2cFD6kg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fpizza%2fpizza_PNG7143.png&ehk=tIYK0zpgeiuutcFQ28M8j11noK3Ix7OgDpB6EVNR92M%3d&risl=&pid=ImgRaw&r=0"
                                    className="object-contain my-auto"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetail.propTypes = {
    product: propTypes.object.isRequired,
    handleAddToCart: propTypes.func.isRequired,
    rating: propTypes.number.isRequired,
    handleAddToWishlist: propTypes.func.isRequired,
    isWishlist: propTypes.bool.isRequired,
};

export default ProductDetail;
