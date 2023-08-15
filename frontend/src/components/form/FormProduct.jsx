import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { Button } from "../index";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
const FormProduct = ({ setModalOpen, foodDetail }) => {
    const {
        name,
        price,
        category,
        image,
        quantity,
        discount,
        rating,
        reviews,
    } = foodDetail;
    console.log(foodDetail);
    return (
        <>
            <div className="relative flex w-full items-center overflow-hidden bg-base/dark-bg-1-18 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setModalOpen(false)}>
                    <span className="sr-only">Close</span>
                    {/* react icon x */}
                    <AiOutlineClose />
                </button>
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                            src={image}
                            alt={name}
                            className="object-cover object-center rounded-full"
                        />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7 flex flex-col h-full">
                        <h2 className="text-2xl font-bold text-white sm:pr-12 uppercase">
                            {name}
                        </h2>
                        <p className="text-white mt-2">Category: {category}</p>
                        {/* Discount */}
                        <p className="text-white mt-2">Discount: {discount}%</p>
                        {/* Quantity */}
                        <p className="text-white mt-2">Quantity: {quantity}</p>
                        <section
                            aria-labelledby="information-heading"
                            className="mt-2">
                            <h3 id="information-heading" className="sr-only">
                                Product information
                            </h3>
                            <p className="text-2xl text-white">$ {price}</p>
                            {/* Reviews */}
                            <div className="mt-6">
                                <h4 className="sr-only">Reviews</h4>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <AiFillStar
                                                key={index}
                                                className={classNames(
                                                    rating > index
                                                        ? "text-gray-900"
                                                        : "text-gray-200",
                                                    "h-5 w-5 flex-shrink-0"
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">
                                        {rating} out of 5 stars
                                    </p>
                                    <a
                                        href="#"
                                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.length} reviews
                                    </a>
                                </div>
                            </div>
                        </section>
                        {/* button order now */}
                        <div className="mt-auto align-bottom">
                            <Button btnText="Order Now" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

FormProduct.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
    foodDetail: PropTypes.object.isRequired,
};

export default FormProduct;
