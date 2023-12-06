/** @format */

import FooterCol from "./FooterCol";

const Footer = () => {
    return (
        <div className="pt-40 bg-base/dark-bg-2-14 dark:bg-light-bg-1">
            <div className="max-w-screen-lg mx-auto flex gap-12">
                <div className="flex-[2] text-gray-400 dark:text-slate-600">
                    <h1 className="text-5xl mb-4 font-semibold">Restaurant</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam
                        voluptate. Quisquam, quibusdam voluptate. Quisquam, quibusdam voluptate.
                    </p>
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Important Links"
                        links={[
                            {
                                type: "link",
                                text: "Home",
                                path: "/home",
                            },
                            {
                                type: "link",
                                text: "About",
                                path: "/about",
                            },
                            {
                                type: "link",
                                text: "Projects",
                                path: "/projects",
                            },
                            {
                                type: "link",
                                text: "Contact",
                                path: "/contact",
                            },
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Contact Info"
                        links={[
                            {
                                text: "+84 987 654 321",
                                path: "tel:+84 987 654 321",
                            },
                            {
                                text: "namnguyen7230@gmail.com",
                                path: "mailto: Namnguyen7230@gmail.com",
                            },
                            {
                                text: "Minh Tan, Phu Xuyen, Ha Noi",
                                path: "https://www.google.com/maps/place/Minh+Tan,+Phu+Xuyen,+",
                            },
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <FooterCol
                        heading="Social Links"
                        links={[
                            {
                                text: "Facebook",
                                path: "https://www.facebook.com/namnguyen7230",
                            },
                            {
                                text: "Instagram",
                                path: "https://www.instagram.com/namnguyen7230",
                            },
                            {
                                text: "Github",
                                path: "namhoai2k1.github.io",
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="bg-base/dark-line dark:bg-light-bg-2 text-center py-4 mt-20">
                <p className="text-gray-400 font-semibold">2020 &copy; Nam Nguyen. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
