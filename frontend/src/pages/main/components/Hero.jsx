/** @format */

import { Button } from "../../../components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import propTypes from "prop-types";
import { motion } from "framer-motion";

const Hero = ({ foodItem }) => {
    const location = useLocation();
    console.log(location.pathname);
    const [heroImg, setHeroImg] = useState([]);
    useEffect(() => {
        setHeroImg(foodItem.slice(0, 5));
    }, [foodItem]);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-center text-7xl font-['DM_Serif_Display'] dark:text-black">
                    <span className="text-primary-color">Finally,</span> the
                    dish you have been <br></br>waiting for on your table
                </h1>
                <p className="text-center max-w-lg font-['Barlow_Condensed'] text-gray-400 dark:text-slate-600">
                    Chào mừng quý khách đến với nhà hàng chúng tôi. Chúng tôi
                    rất vui mừng được phục vụ và hy vọng quý khách sẽ có một
                    trải nghiệm ẩm thực thú vị tại đây.
                </p>
                <Link
                    to={`${
                        location.pathname.includes("/user")
                            ? "/user/reservation"
                            : "/reservation"
                    }`}
                    className="w-48 relative group">
                    <Button btnText="Đặt bàn ngay" btnRounded="rounded-full" />
                    <div className="absolute w-full h-full bg-primary-color animate-ping top-0 rounded-full group-hover:animate-none -z-10"></div>
                </Link>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                loop={true}
                pagination={false}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="imgSwiper mx-auto grid items-start  max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-4 sm:py-6 lg:mx-0 lg:max-w-6xl lg:grid-cols-3">
                {heroImg.map((heroItem) => (
                    <SwiperSlide
                        key={heroItem.id}
                        className="max-w-sm items-start gap-y-2 rounded-full">
                        <Link
                            to={`${
                                location.pathname === "/user" ? "/user/" : "/"
                            }product/${heroItem.id}`}>
                            <img
                                src={heroItem.image}
                                alt="img"
                                className="rounded-full object-contain w-full"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

Hero.propTypes = {
    foodItem: propTypes.array.isRequired,
};

export default Hero;
