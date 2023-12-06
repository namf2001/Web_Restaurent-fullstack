/** @format */
import MapImage from "../../../assets/images/map.png";

const Map = () => {
    return (
        <div className="relative mt-28 min-h-[450px]">
            <img
                src={MapImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <div className="p-8 relative min-h-[400px] text-gray-400 dark:text-slate-600">
                <div className="absolute right-[10%] bottom-[10%] p-8 bg-base/dark-bg-2-14 dark:bg-light-bg-1 w-full max-w-xs rounded-xl">
                    <h3 className="text-3xl font-semibold mb-4">
                        Chúng tôi ở đây
                    </h3>
                    <p className="inline-block text-xl">
                        DT428, Tri Thuong, Phu Xuyen, Ha Noi, Viet Nam
                    </p>
                    <a
                        className="inline-block underline mt-4 hover:text-primary-color transition-colors duration-200"
                        href="https://www.google.com/maps/place/DT+428,+Tr%E1%BB%8B+Thu%E1%BB%B7,+Ph%C3%BA+Xuy%C3%AAn,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@20.6837442,105.9566926,155m/data=!3m1!1e3!4m5!3m4!1s0x3135c86543197c49:0x5068c5544b2c2b88!8m2!3d20.6837111!4d105.9570022!5m1!1e4?hl=vi-VN"
                        target="_blank"
                        rel="noreferrer">
                        Open in Google Map
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Map;
