/** @format */
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import orderApi from "../api/orderApi";
import { Button } from "../components";
import animationData from "../assets/animations/food_delivery.json"; // Import file json chứa thông tin về animation

import lottie from "lottie-web";

const Success = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [countdown, setCountdown] = useState(5);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Khởi tạo animation
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            animationData: animationData, // Tệp Lottie bạn đã import
            loop: true, // Lặp lại animation
            autoplay: true, // Tự động phát animation
        });

        // Xóa animation khi component bị unmount
        return () => {
            anim.destroy();
        };
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderApi.getLatest();
                setOrder(res[0]);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown === 0) {
                clearInterval(timer);
                navigate("/user/order");
            } else {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [countdown, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div
                id="RootRoot"
                className="flex flex-col w-[450px] rounded-2xl overflow-hidden">
                <div className="bg-[#1e1fcd] h-56 shrink-0 flex items-center w-full justify-center">
                    <div className="w-full" ref={containerRef} />
                </div>
                <div
                    id="Container"
                    className="overflow-hidden bg-base/dark-bg-2-14 flex flex-col justify-center gap-8 px-6 py-10">
                    <div className="flex flex-col ml-1 gap-8 items-start">
                        <div className="text-center text-3xl font-black text-white w-full">
                            Thông tin đơn hàng
                        </div>
                        <div className="self-stretch flex flex-col gap-6">
                            <div className="text-center text-gray-400 self-start ml-8 w-4/5">
                                Chúng tôi rất biết ơn vì quý khách hàng đã thanh
                                toán. Cảm ơn quý khách về sự hỗ trợ và tin tưởng
                                của bạn.
                            </div>
                            <div className="overflow-y-auto scrollbar-none">
                                {order?.items.map((item) => {
                                    console.log(item);
                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-base/dark-line-1 flex flex-row justify-between h-24 shrink-0 items-center mb-px mr-1 px-6 rounded-lg">
                                            <div className="flex flex-row gap-4 items-center flex-1">
                                                <img
                                                    src={item?.foodId?.image}
                                                    className="self-start w-12 shrink-0 rounded-full"
                                                />
                                                <div className="flex flex-col shrink-0 items-center gap-1">
                                                    <div className="text-center text-sm font-bold text-white self-start">
                                                        {item?.foodId?.name}
                                                    </div>
                                                    <div className="text-center text-xs text-gray-400">
                                                        ${item?.foodId?.price} x{" "}
                                                        {item?.quantity} sản
                                                        phẩm
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center text-xs underline font-bold text-[#3829e0]">
                                                Change
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Link to="/user/order">
                                <Button btnText="Xem tiến độ" />
                            </Link>
                        </div>
                    </div>
                    {/* thong bao nguoi dung se cho ve man hinh trinh sau 5 giay */}
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-xs text-gray-400">
                            Redirecting to home page in {countdown} seconds
                        </div>
                        <button
                            id="Cancelbutton"
                            className="flex flex-col items-center  rounded-lg">
                            <div className="text-center text-sm font-bold text-[#7280a7]">
                                Cancel Order
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
