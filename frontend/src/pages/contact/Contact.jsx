/** @format */

import { MdEmail, MdLocalPhone } from "react-icons/md";
import { ContactForm, ContactInfoItem, Map } from "./components";
import { Footer, ProgressBar } from "../../components";
import { useRef } from "react";
import { useScroll } from "framer-motion";

const Contact = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ container: ref });
    return (
        <div
            ref={ref}
            className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-none">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-center text-7xl font-['DM_Serif_Display'] dark:text-black">
                        Liên Hệ với chúng tôi!
                    </h1>
                    <p className="text-center max-w-lg font-['Barlow_Condensed'] text-gray-400 dark:text-slate-600">
                        Sẵn sàng phục vụ bạn 24/7
                    </p>
                </div>
                <div className="flex gap-20 mt-28 justify-between relative after:content-[''] after:absolute after:top-1/3 after:left-1/2 after:w-1 after:h-2/3 after:bg-base/dark-line dark:after:bg-light-bg-1 after:-translate-x-1/2 after:-translate-y-1/2">
                    <div className="w-full max-w-screen-sm">
                        <ContactInfoItem
                            icon={<MdLocalPhone />}
                            text="+1 (123) 456-7890"
                        />
                        <ContactInfoItem
                            icon={<MdEmail />}
                            text="namnguyen7230@gmail.com"
                        />
                        <ContactInfoItem text="DT428, Tri Thuong, Phu Xuyen, Ha Noi, Viet Nam" />
                    </div>
                    <div className="w-full max-w-screen-sm">
                        <ContactForm />
                    </div>
                </div>
            </div>{" "}
            <Map />
            <Footer />
            <ProgressBar scrollYProgress={scrollYProgress} />
        </div>
    );
};

export default Contact;
