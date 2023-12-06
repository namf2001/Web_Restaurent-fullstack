/** @format */

import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";

import  meal  from "../../../assets/video/meal.mp4";
import { useRef, useState } from "react";

const Intro = () => {
    const [playVideo, setPlayVideo] = useState(false);
    const vidRef = useRef();

    return (
        <div className="h-[calc(100vh-100px])] relative">
            <video
                ref={vidRef}
                src={meal}
                type="video/mp4"
                loop
                autoPlay
                controls={false}
                muted
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <button
                    className="w-full h-full rounded-full border-orange-400 cursor-pointer flex items-center justify-center"
                    onClick={() => {
                        setPlayVideo(!playVideo);
                        if (playVideo) {
                            vidRef.current.pause();
                        } else {
                            vidRef.current.play();
                        }
                    }}> 
                    {!playVideo ? (
                        <BsPauseFill color="#fff" fontSize={30} />
                    ) : (
                        <BsFillPlayFill color="#fff" fontSize={30} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Intro;
