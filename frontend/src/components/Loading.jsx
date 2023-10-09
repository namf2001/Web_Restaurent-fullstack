/** @format */

import { useRef, useEffect } from "react";
import lottie from "lottie-web"; // Import thư viện lottie-web
import animationData from '../assets/animations/success.json'; // Import file json chứa thông tin về animation

function Loading() {
    const containerRef = useRef(null);

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

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-64" ref={containerRef} />
        </div>
    );
}

export default Loading;
