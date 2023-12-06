/** @format */

import { BiSupport, BiTimer } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";

const FeatureSection = () => {
    return (
        <div className="pb-16 sm:pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-3xl font-extrabold leading-8 text-slate-500 dark:text-dark uppercase">
                    Điều gì làm cho chúng tôi khác biệt
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <div className="col-span-2 w-full object-contain lg:col-span-1 icon__cloud-item dark:hover:bg-light-bg-1">
                        <BiTimer className="text-8xl text-slate-500 dark:text-dark hover:text-primary-color" />
                        <span className="text-slate-400 font-bold">
                            Fast Shopping Cart
                        </span>
                        <p className="text-slate-500 mt-2">
                            Look at the cart in that icon, there`s never been a
                            faster cart. What does this mean for the actual
                            checkout experience? I don`t know.
                        </p>
                    </div>
                    <div className="col-span-2 w-full object-contain lg:col-span-1 icon__cloud-item dark:hover:bg-light-bg-1">
                        <TbTruckDelivery className="text-8xl text-slate-500 dark:text-dark hover:text-primary-color text-center" />
                        <span className="text-slate-400 font-bold">
                            Free delivery all year long
                        </span>
                        <p className="text-slate-500 mt-2">
                            Name another place that offers year long free
                            delivery? We’ll be waiting. Order now and you’ll get
                            delivery absolutely free.
                        </p>
                    </div>
                    <div className="col-span-2 w-full object-contain lg:col-span-1 icon__cloud-item  dark:hover:bg-light-bg-1">
                        <BiSupport className="text-8xl text-slate-500 dark:text-dark hover:text-primary-color" />
                        <span className="text-slate-400 font-bold">
                            24/7 Customer Support
                        </span>
                        <p className="text-slate-500 mt-2">
                            Or so we want you to believe. In reality our chat
                            widget is powered by a naive series of if/else
                            statements that churn out canned responses.
                            Guaranteed to irritate
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
