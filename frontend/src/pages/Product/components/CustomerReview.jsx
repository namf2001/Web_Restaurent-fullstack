/** @format */
import PropTypes from "prop-types";
import { HiFire } from "react-icons/hi";
import { Button } from "../../../components";
import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import FromReview from "../../../components/form/FromReview";
import reviewApi from "../../../api/reviewApi";

const CustomerReview = ({
    rating = 0,
    reviews,
    checkPurchaseStatus,
    handleUpdateProductAndReviews,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewValue, setReviewValue] = useState([]);

    useEffect(() => {
        setRatingValue(rating);
        setReviewValue(reviews);
    }, [rating, reviews]);

    function calculateRatingPercentage(data) {
        const ratingCount = {};
        const totalRatings = data?.length;

        // Đếm số lượng từng loại rating
        data?.forEach((item) => {
            const ratingValue = item?.rating;
            if (ratingCount[ratingValue]) {
                ratingCount[ratingValue]++;
            } else {
                ratingCount[ratingValue] = 1;
            }
        });

        // Tính phần trăm cho từng loại rating
        const ratingPercentage = [];
        for (let ratingValue = 1; ratingValue <= 5; ratingValue++) {
            const count = ratingCount[ratingValue] || 0;
            const percentage = (count / totalRatings) * 100;
            ratingPercentage.push({
                start: ratingValue,
                Percentage: `${percentage.toFixed(0)}%`,
            });
        }

        return ratingPercentage;
    }

    const ratingPercentage = calculateRatingPercentage(reviewValue);

    const handlerReview = async (foodId, rating, comment) => {
        const data = {
            rating,
            comment,
        };

        try {
            const res = await reviewApi.create(foodId, data);
            console.log(res);
            handleUpdateProductAndReviews(
                {
                    _id: res.rating.id,
                    rating: res.rating.rating,
                    id: res.rating.id,
                },
                res.rating
            );
        } catch (error) {
            console.log(error);
        } finally {
            setModalOpen();
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 py-6 px-4 rounded-lg shadow-xl shaw">
                <h2 className="text-2xl font-bold dark:text-dark">Đánh giá của khách hàng</h2>
                <div className="flex gap-1 items-center dark:text-dark">
                    {[0, 1, 2, 3, 4].map((star) => (
                        <HiFire
                            key={star}
                            className={`${
                                ratingValue > star
                                    ? "text-primary-color"
                                    : "text-gray-200 dark:text-slate-600"
                            } h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                        />
                    ))}{" "}
                    | {reviewValue?.length}{" "}
                    <span className="text-xs text-gray-400 dark:text-slate-600 ml-1">
                        lượt đánh giá
                    </span>
                </div>
                <hr className="w-full h-[1px] bg-base/dark-line-1 dark:bg-primary-color border-0 my-3" />
                {reviewValue && reviewValue?.length > 0 ? (
                    <div>
                        {ratingPercentage?.map((percentage, index) => (
                            <RatingBar
                                key={index}
                                percentage={percentage.Percentage}
                                rating={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl h-40 dark:text-dark-1">
                        Chưa có đánh giá nào{" "}
                        <p className="text-gray-400 dark:text-slate-600 text-sm">
                            Hãy là người đầu tiên đánh giá sản phẩm này
                        </p>
                    </div>
                )}
                {!checkPurchaseStatus.purchased ? (
                    <Button btnText="Bạn chưa mua sản phẩm này" outline />
                ) : checkPurchaseStatus.reviewed ? (
                    <Button btnText="Bạn đã đánh giá sản phẩm này" outline />
                ) : (
                    <Button
                        btnText="Viết đánh giá"
                        outline
                        handler={() => setModalOpen(true)}
                    />
                )}
            </div>
            <Modal
                modalOpen={modalOpen}
                setModalOpen={() => setModalOpen(false)}>
                <FromReview
                    setModalOpen={() => setModalOpen(false)}
                    handlerReview={handlerReview}
                />
            </Modal>
        </>
    );
};

const RatingBar = ({ rating, percentage }) => {
    return (
        <div className="flex items-center">
            <span className="text-xs text-gray-400 dark:text-dark mr-1">{rating + 1}</span>
            <HiFire className="text-primary-color h-5 w-5 flex-shrink-0" />
            <div className="w-[75%] px-2">
                <div className="h-2 bg-slate-500 dark:bg-primary-color/30 rounded-full">
                    <div
                        className="h-2 bg-primary-color rounded-full dark:text-dark"
                        style={{ width: `${percentage}` }}></div>
                </div>
            </div>
            <span className="text-xs text-gray-400 dark:text-dark">{percentage}</span>
        </div>
    );
};

CustomerReview.propTypes = {
    rating: PropTypes.number,
    reviews: PropTypes.array,
    checkPurchaseStatus: PropTypes.object,
    handleUpdateProductAndReviews: PropTypes.func,
};

RatingBar.propTypes = {
    rating: PropTypes.number,
    percentage: PropTypes.string,
};

export default CustomerReview;
