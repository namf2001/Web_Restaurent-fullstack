/** @format */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../context/cartContext";
import Button from "../Button";
import { motion } from "framer-motion";
import getAddressDetails from "../../utils/locationUtils";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
import { useDispatch, useSelector } from "react-redux";
import orderApi from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCart } from "../../redux/features/cartSlice";
import PaymentApi from "../../api/paymentApi";
defineElement(lottie.loadAnimation);

const LocationOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const handleCreateOrder = async () => {
        try {
            const total = cart.reduce((total, item) => {
                return total + item.quantity * item.foodId.price;
            }, 0);
            const order = {
                address: locationData,
                items: cart.map((item) => item._id), // Sử dụng _id của mỗi mục Cart
                total: total,
                node: note,
            };
            const response = await orderApi.add(order);
            if (response.success) {
                toast.success("Đặt hàng thành công");
                dispatch(setCart([]));
                navigate("/user/order");
            } else {
                toast.error("ban chua câp nhat thong tin của mình");
            }
        } catch (error) {
            console.log(error);
            toast.error("ban chua câp nhat thong tin của mình");
        }
    };

    const handleCheckout = async () => {
        const total = cart.reduce((total, item) => {
            return total + item.quantity * item.foodId.price;
        }, 0);
        const order = {
            address: locationData,
            items: cart.map((item) => item._id), // Sử dụng _id của mỗi mục Cart
            total: total,
            note: note,
        };

        await PaymentApi.createCheckoutSession(order)
            .then((result) => {
                console.log(result)
                if (result.url) {
                    window.location.href = result.url;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            <div className="flex h-full flex-col bg-base/dark-bg-2-14 shadow-xl text-white w-[400px] border-l border-dark">
                <div className="flex-1 px-4 py-6 sm:px-6">
                    <div className="flex items-start flex-col gap-4">
                        <Dialog.Title className="text-lg font-medium flex justify-between w-full">
                            <div className="mt-11">
                                Vị trí
                                <p className="text-sm font-normal pt-2 text-gray-400">
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
                                    className="text-xl font-semibold text-white mb-2">
                                    Chọn địa chỉ
                                </div>
                                <div
                                    id="Content"
                                    onClick={getLocation}
                                    className="border-dark hover:border-color transition-all duration-300 border-2 self-stretch flex flex-col mb-5 gap-px h-[68px] shrink-0 items-center justify-center  rounded-lg">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/zzcjjxew.json"
                                        trigger="loop"
                                        colors="primary:#ffffff,secondary:#ffffff"
                                        state="loop-spin"></lord-icon>
                                    <div className="text-center text-sm font-medium text-white">
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
                                <div className="text-sm font-medium text-white mb-2">
                                    Được nhập thủ công địa chỉ
                                </div>
                                <div className="text-sm font-medium text-gray-400 w-full">
                                    Please note that we only offer delivery
                                    within a 4-mile radius of our{" "}
                                    <div className="underline text-primary-color contents">
                                        restaurant location.
                                    </div>
                                </div>
                                <textarea
                                    className={`border-solid bg-base/dark-line self-stretch flex flex-col justify-center mb-2 pl-3 pt-2  h-16 shrink-0 items-start border rounded-lg ${
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
                                <div className="text-sm font-medium text-white mb-px">
                                    Ghi chú
                                </div>
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Nhập ghi chú của bạn"
                                    className="bg-base/dark-line block rounded-md mb-2 pl-3 h-12 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
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
                            handleCheckout();
                        }}
                    />
                </motion.div>
            </div>
        </Transition>
    );
};

export default LocationOrder;
