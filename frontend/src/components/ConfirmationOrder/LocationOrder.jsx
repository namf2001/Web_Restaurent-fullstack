/** @format */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../context/cartContext";
import Button from "../Button";
import { motion } from "framer-motion";
import getAddressDetails from "../../utils/locationUtils";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
import { useSelector } from "react-redux";
import handleCheckout from "../../utils/checkOutUtils";
defineElement(lottie.loadAnimation);

const LocationOrder = () => {
    const cart = useSelector((state) => state.cart.value);
    const { openLocation, toggleLocation } = useContext(CartContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [error, setError] = useState(null);
    const [note, setNote] = useState("");

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not available.");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getAddressDetails(latitude, longitude)
                .then((result) => {
                    setLocationData(
                        `${result.street}, ${result.state}, ${result.city}`
                    );
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [latitude, longitude]);

    return (
        <Transition
            show={openLocation}
            as={Fragment}
            enter="ease-in-out duration-150"
            enterFrom="w-0"
            enterTo="w-[400px]"
            leave="ease-in-out duration-150"
            leaveFrom="w-[400px]"
            leaveTo="w-0">
            <div className="flex h-full flex-col bg-base/dark-bg-2-14 dark:bg-light-bg-1 shadow-xl text-white dark:text-dark w-[400px] border-l border-dark">
                <div className="flex-1 px-4 py-6 sm:px-6">
                    <div className="flex items-start flex-col gap-4">
                        <Dialog.Title className="text-lg font-medium flex justify-between w-full">
                            <div className="mt-11">
                                Vị trí
                                <p className="text-sm font-normal pt-2 text-gray-400 dark:text-slate-600">
                                    Hãy cho chúng tôi biết bạn đang ở đâu!
                                </p>
                            </div>
                        </Dialog.Title>
                    </div>
                    <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 my-4" />
                    <div className="mt-8">
                        <div className="flow-root">
                            <div className="flex flex-col gap-2 w-full h-[488px] items-start">
                                <div
                                    id="Title"
                                    className="text-xl font-semibold mb-2">
                                    Chọn địa chỉ
                                </div>
                                <div
                                    id="Content"
                                    onClick={getLocation}
                                    className="border-dark hover:border-color transition-all duration-300 border-2 self-stretch flex flex-col mb-5 gap-px h-[68px] shrink-0 items-center justify-center  rounded-lg">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/zzcjjxew.json"
                                        trigger="loop"
                                        colors="primary:red,secondary:red"
                                        state="loop-spin"></lord-icon>
                                    <div className="text-center text-sm font-medium">
                                        Sử dụng GPS
                                    </div>
                                </div>
                                <div className="self-stretch flex justify-between mb-5 items-center gap-2">
                                    <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 my-4" />
                                    <div className="text-sm font-medium text-gray-400">
                                        or
                                    </div>
                                    <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 my-4" />
                                </div>
                                <div className="text-sm font-medium mb-2">
                                    Được nhập thủ công địa chỉ
                                </div>
                                <div className="text-sm font-medium text-gray-400 dark:text-slate-600 w-full">
                                    Please note that we only offer delivery
                                    within a 4-mile radius of our{" "}
                                    <div className="underline text-primary-color contents">
                                        restaurant location.
                                    </div>
                                </div>
                                <textarea
                                    className={`border-solid bg-base/dark-line dark:bg-light-bg self-stretch flex flex-col justify-center mb-2 pl-3 pt-2  h-16 shrink-0 items-start border rounded-lg ${
                                        error ? "border-red-500" : "border-dark"
                                    }`}
                                    placeholder="Nhập địa chỉ của bạn"
                                    value={locationData}
                                    onChange={(e) =>
                                        setLocationData(e.target.value)
                                    }
                                />
                                {error && (
                                    <div className="text-sm font-medium text-red-500 mb-2">
                                        {error}
                                    </div>
                                )}
                                <div className="text-sm font-medium mb-px">
                                    Ghi chú
                                </div>
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Nhập ghi chú của bạn"
                                    className="bg-base/dark-line dark:bg-light-bg block rounded-md mb-2 pl-3 h-12 w-full ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-3 px-6 mb-6 h-[48px]">
                    <Button
                        btnText="Hủy Bỏ"
                        outline={true}
                        handler={() => {
                            toggleLocation();
                        }}
                    />
                    <Button
                        btnText=" Thanh Toán"
                        handler={() => {
                            handleCheckout(cart, note, null, locationData);
                        }}
                    />
                </motion.div>
            </div>
        </Transition>
    );
};

export default LocationOrder;
