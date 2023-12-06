/** @format */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// import required modules
import { EffectCoverflow, Pagination, Autoplay, } from 'swiper/modules';
const posts = [
    {
        id: 1,
        title: "Boost your conversion rate",
        href: "#",
        description:
            "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: { title: "Marketing", href: "#" },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 2,
        title: "How to use search engine optimization to drive sales",
        href: "#",
        description:
            "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
        date: "Mar 10, 2020",
        datetime: "2020-03-10",
        category: { title: "Engineering", href: "#" },
        author: {
            name: "Brenna Goyette",
            role: "Web Designer",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 3,
        title: "Improve your customer experience",
        href: "#",
        description:
            "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
        date: "Feb 12, 2020",
        datetime: "2020-02-12",
        category: { title: "Product", href: "#" },
        author: {
            name: "Daniela Metz",
            role: "Senior Designer",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 4,
        title: "Improve your customer experience",
        href: "#",
        description:
            "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
        date: "Feb 12, 2020",
        datetime: "2020-02-12",
        category: { title: "Product", href: "#" },
        author: {
            name: "Daniela Metz",
            role: "Senior Designer",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 5,
        title: "Improve your customer experience",
        href: "#",
        description:
            "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
        date: "Feb 12, 2020",
        datetime: "2020-02-12",
        category: { title: "Product", href: "#" },
        author: {
            name: "Daniela Metz",
            role: "Senior Designer",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

const CustomerReviews = () => {
    return (
        <div className="mx-auto max-w-7xl flex items-center px-4">
            {/* xoay 90 dge */}
            <div className='w-1 inline z-10'>
                <h1 className='transform -translate-x-20 -rotate-90 text-center bg-base/dark-bg-2-14 dark:bg-primary-color w-44 rounded-lg px-6 py-2 text-2xl font-bold text-slate-400 dark:text-white'>Đánh giá</h1>
            </div>
            <Swiper
                effect={'coverflow'}
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
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-4 sm:py-6 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
                {posts.map((post) => (
                    <SwiperSlide
                        key={post.id}
                        className="flex flex-col max-w-xl items-start gap-y-2 bg-base/dark-bg-2-14 dark:bg-light-bg-1  dark:text-dark px-4 py-6 rounded-xl">
                        <div className="flex gap-x-4 w-full">
                            <div className="relative flex flex-col items-center gap-x-4">
                                <img
                                    src={post.author.imageUrl}
                                    alt="user avatar"
                                    className="h-10 w-10 rounded-full bg-gray-50"
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-center justify-between gap-x-4 text-xs w-full">
                                    <p className="font-semibold">
                                        {post.author.name}
                                    </p>
                                    <time
                                        dateTime={post.datetime}
                                        className="text-gray-500">
                                        {post.date}
                                    </time>
                                </div>
                                <h3 className="line-clamp-1 mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                                    {post.title}
                                </h3>
                            </div>
                        </div>
                        <div className="group relative">
                            <p className="italic line-clamp-3 text-sm leading-6 text-gray-600">
                                {post.description}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CustomerReviews;
