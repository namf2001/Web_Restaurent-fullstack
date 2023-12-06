/** @format */
import PropTypes from "prop-types";

const OrderItem = ({item}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between dark:text-dark">
                <div className="flex gap-2">
                    <div
                        className="h-[40px] block w-[40px]"
                        aria-label="link-wrap-image">
                        <img
                            src={item.foodId.image}
                            alt={item.foodId.name}
                            className="object-cover h-full min-w-[40px] rounded-full "
                        />
                    </div>
                    <span>
                        <p className="line-clamp-1">{item.foodId.name}</p>
                        <p>{item.foodId.price}</p>
                    </span>
                </div>
                <div className="flex gap-6 items-center">
                    <span className="bg-base/dark-bg-1-18 dark:bg-light-bg rounded-md w-12 h-12 py-3.5 text-center">
                        <p className="m-auto h-full">{item.quantity}</p>
                    </span>
                    {/* total */}
                    <span className="px-2">
                        $ {item.foodId.price * item.quantity}
                    </span>
                </div>
            </div>
            <input
                type="text"
                value={item.message}
                disabled
                placeholder="Note for chef"
                className="bg-base/dark-line dark:bg-light-bg block rounded-md border-0 p-3.5 h-full text-light ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6 "
            />
        </div>
    );
};

OrderItem.propTypes = {
    item: PropTypes.object,
};

export default OrderItem;
