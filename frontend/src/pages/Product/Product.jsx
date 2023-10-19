/** @format */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import foodItemApi from "../../api/foodItemApi";
import CartApi from "../../api/cartApi";
import reviewApi from "../../api/reviewApi";
import { CustomerComment, CustomerReview, FeatureSection } from "./components";
import { Button } from "../../components";
import { toast } from "react-toastify";
import { setCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { FiStar } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { HiInformationCircle as FaCircleInfo, HiFire } from "react-icons/hi";
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

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
// Import các module của Swiper
const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [checkPurchaseStatus, setCheckPurchaseStatus] = useState(false);
    const [quantity, setQuantity] = useState(1); // default quantity is 1
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await foodItemApi.getOne(id);
                setProduct(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [id]);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await reviewApi.getReviewsByProduct(id);
                setReviews(res.reviews);
                console.log(res.reviews)
            } catch (error) {
                console.log(error);
            }
        };
        getReviews();
    }, [id]);

    useEffect(() => {
        const getCheckPurchaseStatus = async () => {
            try {
                const res = await reviewApi.checkPurchaseStatus(id);
                setCheckPurchaseStatus(res);
            } catch (error) {
                console.log(error);
            }
        };
        getCheckPurchaseStatus();
    }, [id]);

    useEffect(() => {
        const getRating = product.reviews?.reduce(
            (acc, item) => acc + item.rating,
            0
        );
        setRating(getRating / product.reviews?.length);
    }, [product.reviews]);

    const handleAddToCart = async (id, quality) => {
        try {
            const res = await CartApi.addToCart(id, quality);
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
        <div className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full px-6">
            <div className="flex flex-col">
                <div className="flex bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 rounded-xl shadow-xl">
                    <div className="bg-base/dark-bg-2-14 flex-1 flex flex-col gap-10 relative p-12 rounded-xl rounded-br-3xl rounded-tr-3xl">
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
                                <div className="text-5xl font-semibold text-white">
                                    {product.name}
                                </div>
                                {/* rating stat */}
                                <h4 className="sr-only">Reviews</h4>
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
                                    | {product.reviews?.length}{" "}
                                    <span className="text-xs text-gray-400 ml-1">
                                        lượt đánh giá
                                    </span>
                                </div>
                                <div className="self-stretch flex flex-col gap-6 items-start">
                                    <div className="flex items-end gap-4">
                                        {/* old price */}
                                        {product.discount > 0 && (
                                            <span className="text-3xl font-medium text-gray-400 line-through">
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
                                        {/* discount */}
                                        {product.discount > 0 && (
                                            <span className="text-sm font-medium px-3 py-1 bg-red-400 rounded-sm">
                                                GIẢM {product.discount}%
                                            </span>
                                        )}
                                    </div>
                                    {/* gioi han thanh 2 dong cho  description*/}
                                    <div className="text-gray-400 line-clamp-2">
                                        {product.description}
                                    </div>
                                    <ul className="text-sm text-white">
                                        {product.highlights?.map(
                                            (highlight) => (
                                                <li
                                                    key={highlight}
                                                    className="text-gray-400">
                                                    <span className="text-gray-400">
                                                        - {highlight}
                                                    </span>
                                                </li>
                                            )
                                        )}
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
                                                {/* discount */}
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
                                        <div className="flex items-center justify-between w-1/2 bg-base/dark-line rounded-md">
                                            <button
                                                className="w-10 h-10 rounded-s-md bg-base/dark-line-1"
                                                onClick={() => {
                                                    if (quantity > 1) {
                                                        setQuantity(
                                                            quantity - 1
                                                        );
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
                                                        product.quantity
                                                    ) {
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
                                                                progress:
                                                                    undefined,
                                                                theme: "dark",
                                                            }
                                                        );
                                                        setQuantity(
                                                            quantity + 1
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
                        <div className="absolute top-0 right-16 w-16 h-28 flex justify-center items-center bg-primary-color rounded-b-full">
                            <FiStar className="text-3xl text-white" />
                        </div>
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden">
                        <div className="flex flex-col justify-between gap-40 bg-[url('https://learnenglish.britishcouncil.org/sites/podcasts/files/2021-10/RS4905_81989918-hig_0.jpg')] h-full rounded-sm">
                            <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-slate-950 via-slate-300/20 to-slate-900 h-full rounded-sm">
                                <div>
                                    <Swiper
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        spaceBetween={10}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[
                                            FreeMode,
                                            Navigation,
                                            Thumbs,
                                            Autoplay,
                                        ]}
                                        loop={true}
                                        className="w-[500px] h-[350px]">
                                        <SwiperSlide>
                                            <img
                                                src={product.image}
                                                className="object-contain h-[350px] mx-auto rounded-full"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src="https://freepngimg.com/download/pizza/34833-1-pizza-slice-transparent-background.png"
                                                className="object-contain h-[350px] mx-auto"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src="https://th.bing.com/th/id/R.b833182f7ef05628f6c15ac7b74fbb73?rik=ZmKh59V2cFD6kg&riu=http%3a%2f%2fpngimg.com%2fuploads%2fpizza%2fpizza_PNG7143.png&ehk=tIYK0zpgeiuutcFQ28M8j11noK3Ix7OgDpB6EVNR92M%3d&risl=&pid=ImgRaw&r=0"
                                                className="object-contain h-[350px] mx-auto"
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
                </div>
                <div className="py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="text-center text-3xl font-extrabold leading-8 text-slate-500 uppercase">
                            Đánh giá của khách hàng
                        </h2>
                        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-start gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            <div className="col-span-1 w-full object-contain lg:col-span-1">
                                <CustomerReview
                                    rating={rating}
                                    reviews={product.reviews}
                                    checkPurchaseStatus={checkPurchaseStatus}
                                />
                            </div>
                            <div className="col-span-1 gir w-full object-contain lg:col-span-2">
                                <CustomerComment reviews={reviews} />
                            </div>
                        </div>
                    </div>
                </div>
                <FeatureSection />
            </div>
        </div>
    );
};

export default Product;