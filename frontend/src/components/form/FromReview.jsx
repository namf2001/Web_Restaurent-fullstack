/** @format */

import { useState } from "react";
import propTypes from "prop-types";
import { useParams } from "react-router-dom";
const FromReview = ({ setModalOpen, handlerReview }) => {
    const params = useParams();
    const { id } = params;
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    return (
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg max-w-lg mx-auto">
            <div className="px-12 py-5">
                <h2 className="text-gray-800 text-3xl font-semibold">
                    Your opinion matters to us!
                </h2>
            </div>
            <div className="bg-gray-200 w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-lg text-gray-800">
                        How was quality of the call?
                    </span>
                    <div className="flex space-x-3">
                        {[...Array(5)].map((_, i) => {
                            const starRating = i + 1;
                            return (
                                <button
                                    key={starRating}
                                    onClick={() => setRating(starRating)}
                                    className="focus:outline-none">
                                    {rating >= starRating ? (
                                        <svg
                                            className="w-12 h-12 text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-12 h-12 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="w-3/4 flex flex-col">
                    <textarea
                        rows="5"
                        value={comment}
                        placeholder="Tell us more about your experience"
                        className="p-4 text-gray-500 rounded-xl resize-none"
                        onChange={(e) => setComment(e.target.value)}></textarea>
                    <button
                        className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                        onClick={() => {
                            handlerReview(id, rating, comment);
                        }}>
                        Rate now
                    </button>
                </div>
            </div>
            <div className="h-20 flex items-center justify-center">
                <button className="text-gray-600" onClick={setModalOpen}>
                    Maybe later
                </button>
            </div>
        </div>
    );
};

FromReview.propTypes = {
    setModalOpen: propTypes.func.isRequired,
    handlerReview: propTypes.func.isRequired,
};

export default FromReview;
