/** @format */
import propTypes from "prop-types";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import reviewApi from "../../../api/reviewApi";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CustomerComment = ({ reviews, handleUpdateProductAndReviews }) => {
    const user = useSelector((state) => state.user.value);
    const userId = user?._id;
    // kiem tra xem user da like hay dislike chua
    const isLiked = (review) => {
        if (review.likes?.length > 0) {
            const index = review.likes.findIndex((like) => like === userId);
            if (index !== -1) return true;
        }
        return false;
    };

    const isDisliked = (review) => {
        if (review.dislikes?.length > 0) {
            const index = review.dislikes.findIndex(
                (dislike) => dislike === userId
            );
            if (index !== -1) return true;
        }
        return false;
    };

    const handleReviewReaction = async (reviewId, isLike) => {
        try {
            const res = isLike
                ? await reviewApi.likeReview(reviewId)
                : await reviewApi.dislikeReview(reviewId);
            const newReviews = [...reviews];
            const index = newReviews.findIndex(
                (review) => review._id === reviewId
            );
            newReviews[index].likes = res.review.likes;
            newReviews[index].dislikes = res.review.dislikes;
            handleUpdateProductAndReviews(null, newReviews[index]);
        } catch (error) {
            console.log(error);
        }
    };

    if (reviews.length === 0 || !reviews)
        return (
            <div className="flex flex-col gap-6 w-full h-full text-center py-6 rounded-lg shadow-lg">
                <span className="text-slate-500 text-3xl font-bold">
                    Chưa có đánh giá nào
                </span>
                <p className="text-slate-400">
                    Hãy là người đầu tiên đánh giá sản phẩm này
                </p>
            </div>
        );

    return (
        <div className="flex flex-col gap-6 w-full">
            {reviews.map((review) => (
                <Comment
                    key={review._id}
                    review={review}
                    handleReviewReaction={handleReviewReaction}
                    isLiked={isLiked(review)}
                    isDisliked={isDisliked(review)}
                />
            ))}
        </div>
    );
};

const Comment = ({
    review,
    handleReviewReaction,
    isLiked,
    isDisliked,
}) => {
    return (
        <div className="flex flex-col gap-2 items-start px-4 py-6 rounded-lg shadow-xl hover:bg-main-dark-bg dark:hover:bg-light-bg-1">
            <div className="flex gap-4 w-full">
                <img
                    src={review.userId.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                    // loading="lazy"
                />
                <div>
                    <span className="text-gray-300 dark:text-dark font-bold">
                        {review.userId.username}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2">
                            {[0, 1, 2, 3, 4].map((star) => (
                                <HiFire
                                    key={star}
                                    className={classNames(
                                        review.rating > star
                                            ? "text-primary-color"
                                            : "text-gray-200 dark:text-slate-600",
                                        "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="text-gray-400 dark:text-slate-600 ml-auto">
                    {review.createdAt
                        ? formatDistanceToNow(
                              new Date(review.createdAt),
                              {
                                  addSuffix: true,
                              },
                              { locale: "vi" }
                          )
                        : "N/a"}
                </span>
            </div>
            <div className="flex flex-col w-full">
                <p className="text-gray-400 dark:text-slate-600 italic pr-3">{review.comment}</p>
                {/* like and dislike */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2">
                            <AiFillLike
                                className={classNames(
                                    "text-gray-400",
                                    "hover:text-primary-color",
                                    "transition duration-300 ease-in-out",
                                    "cursor-pointer",
                                    isLiked && "text-primary-color"
                                )}
                                onClick={() =>
                                    handleReviewReaction(review._id, true)
                                }
                            />
                            <span className="text-gray-500">
                                {review.likes?.length || 0}
                            </span>
                        </button>
                        <button className="flex items-center space-x-2">
                            <AiFillDislike
                                className={classNames(
                                    "text-gray-400",
                                    "hover:text-primary-color",
                                    "transition duration-300 ease-in-out",
                                    "cursor-pointer",
                                    isDisliked && "text-primary-color"
                                )}
                                onClick={() =>
                                    handleReviewReaction(review._id, false)
                                }
                            />
                            <span className="text-gray-500">
                                {review.dislikes?.length || 0}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    review: propTypes.object,
    handleReviewReaction: propTypes.func,
    isLiked: propTypes.bool,
    isDisliked: propTypes.bool,
};

CustomerComment.propTypes = {
    reviews: propTypes.array,
    handleUpdateProductAndReviews: propTypes.func,
};

export default CustomerComment;
