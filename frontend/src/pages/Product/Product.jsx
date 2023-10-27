/** @format */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import foodItemApi from "../../api/foodItemApi";
import CartApi from "../../api/cartApi";
import reviewApi from "../../api/reviewApi";
import {
    CustomerComment,
    CustomerReview,
    FeatureSection,
    ProductDetail,
} from "./components";
import { toast } from "react-toastify";
import { setCart } from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [checkPurchaseStatus, setCheckPurchaseStatus] = useState({});
    const [isWishlist, setIsWishlist] = useState(false);
    const params = useParams();
    const { id } = params;
    const user = useSelector((state) => state.user.value);

    // check wishlist
    useEffect(() => {
        if (user.wishlist?.length > 0) {
            const check = user.wishlist?.find((item) => item === id);
            if (check) {
                setIsWishlist(true);
            }
        } else {
            setIsWishlist(false);
        }
    }, [user.wishlist, id]);
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

    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await reviewApi.getReviewsByProduct(id);
                setReviews(res.reviews);
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

    const handleAddToWishlist = async (id) => {
        try {
            const res = await foodItemApi.addToWishList(id);
            dispatch(setUser(res.data));
            if (res.message === "Food item added to wishlist successfully!") {
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
            } else {
                toast.error(res.message, {
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
        } catch (error) {
            console.log(error);
            if (error.statusText === "Unauthorized") {
                toast.error("Bạn cần đăng nhập để thêm", {
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

    const handleUpdateProductAndReviews = (reviewProduct, review) => {
        let newProduct = product // Initialize newProduct to an empty array if product.reviews is falsy];
        if (reviewProduct) {
            newProduct.reviews = [...newProduct.reviews, reviewProduct];
            setProduct(newProduct);
        } else {
            newProduct.reviews = [...newProduct.reviews];
            setProduct(newProduct);
        }

        let newReviews =[...reviews] // Initialize newReviews to an empty array if reviews is falsy
        const checkReview = newReviews.find(
            (item) => item._id === review._id
        );
        if (checkReview) {
            const index = newReviews.findIndex(
                (item) => item._id === review._id
            );
            newReviews[index] = review;
            setReviews(newReviews);
        } else {
            newReviews = [review, ...newReviews];
            setReviews(newReviews);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full px-6">
            <div className="flex flex-col">
                <ProductDetail
                    product={product}
                    handleAddToCart={handleAddToCart}
                    rating={rating}
                    handleAddToWishlist={handleAddToWishlist}
                    isWishlist={isWishlist}
                />
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
                                    handleUpdateProductAndReviews={
                                        handleUpdateProductAndReviews
                                    }
                                />
                            </div>
                            <div className="col-span-1 gir w-full object-contain lg:col-span-2">
                                <CustomerComment
                                    reviews={reviews}
                                    handleUpdateProductAndReviews={
                                        handleUpdateProductAndReviews
                                    }
                                />
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
