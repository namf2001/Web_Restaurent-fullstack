/** @format */
import propTypes from "prop-types";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const CustomerComment = ({ reviews }) => {
    console.log(reviews);
    if (reviews.length === 0 || !reviews)
        return (
            <div className="flex flex-col gap-6 w-full h-full text-center py-6 rounded-lg shadow-lg">
                <span className="text-slate-500 text-3xl font-bold">Chưa có đánh giá nào</span>
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
                    avatar={review.userId.avatar}
                    name={review.userId.username}
                    stars={review.rating}
                    comment={review.comment}
                    likes={10}
                    dislikes={2}
                    timestamp={review.createdAt}
                />
            ))}
        </div>
    );
};

const Comment = ({
    avatar,
    name,
    stars,
    comment,
    likes,
    dislikes,
    timestamp,
}) => {
    return (
        <div className="flex flex-col gap-2 items-start px-4 py-6 rounded-lg shadow-xl">
            <div className="flex gap-4 w-full">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <span className="text-gray-300 font-bold">{name}</span>
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2">
                            {[0, 1, 2, 3, 4].map((star) => (
                                <HiFire
                                    key={star}
                                    className={classNames(
                                        stars > star
                                            ? "text-primary-color"
                                            : "text-gray-200",
                                        "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="text-gray-400 ml-auto">
                    {timestamp
                        ? formatDistanceToNow(
                              new Date(timestamp),
                              {
                                  addSuffix: true,
                              },
                              { locale: "vi" }
                          )
                        : "N/a"}
                </span>
            </div>
            <div className="flex flex-col w-full">
                <p className="text-gray-400 italic pr-3">{comment}</p>
                {/* like and dislike */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2">
                            <AiFillLike className="text-gray-400" />
                            <span className="text-gray-500">{likes}</span>
                        </button>
                        <button className="flex items-center space-x-2">
                            <AiFillDislike className="text-gray-400" />
                            <span className="text-gray-500">{dislikes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    avatar: propTypes.string,
    name: propTypes.string,
    stars: propTypes.number,
    comment: propTypes.string,
    likes: propTypes.number,
    dislikes: propTypes.number,
    timestamp: propTypes.string,
};

CustomerComment.propTypes = {
    reviews: propTypes.array,
};

export default CustomerComment;
