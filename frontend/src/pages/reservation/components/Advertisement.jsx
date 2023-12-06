/** @format */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/zoom';

// import required modules
import { EffectCards, Zoom, Autoplay } from 'swiper/modules';

import posters from '../../../assets/images/Adv';

const Advertisement = () => {

    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-xl font-bold dark:text-dark uppercase animate-bounce'>Các ưu đãi cho hôm nay</h2>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                zoom={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[EffectCards, Zoom, Autoplay]}
                className="w-2/3"
            >
                {posters.map((poster) => (
                    <SwiperSlide key={poster} className='rounded-2xl shadow-lg swiper-zoom-container'>
                        <img src={poster} alt="poster" loading='lazy'/>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* {imagesLoaded ? null : <div className='w-2/3 h-[50vh] bg-base/dark-line-1 shadow-xl animate-pulse rounded-2xl p-4 flex flex-col justify-around items-center gap-6'>
                <div className='w-full h-full flex justify-center items-center'>
                    <p className='w-16 h-16 rounded-full bg-slate-400'></p>
                </div>
                <p className='w-full h-6 bg-slate-400 animate-pulse rounded-full'></p>
                <p className='w-2/3 h-6 bg-slate-400 animate-pulse rounded-full'></p>
                <p className='w-full h-6 bg-slate-400 animate-pulse rounded-full'></p>
            </div>} */}
        </div>
    );
};

export default Advertisement;
