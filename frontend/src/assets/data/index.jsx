/** @format */

import { TbDiscount2 } from "react-icons/tb";
import { FiCalendar, FiShoppingBag, FiSettings as Setting } from "react-icons/fi";
import award01 from "../images/award01.png";
import award02 from "../images/award02.png";
import award03 from "../images/award03.png";
import award05 from "../images/award05.png";

import {
    BiUser as Customer,
    BiFoodMenu,
    BiBookmarkMinus as Order,
    BiHomeAlt2,
    BiAt,
    BiBookmarkMinus,
} from "react-icons/bi";
import { RiNotification4Line as Notification } from "react-icons/ri";
import {
    MdOutlineSpaceDashboard as Dashboard,
    MdOutlineSecurity,
    MdOutlineTableRestaurant,
} from "react-icons/md";
import Cheesecake from "../images/Cheesecake.png";
import BBQRibs from "../images/BBQRibs.png";
import Icream from "../images/icream.png";
import Pizza from "../images/pizza.png";
import Salad from "../images/Salad.png";
import CaesarSalad from "../images/Product2.png";
import { CgCreditCard } from "react-icons/cg";
import { TbBrandPaypal } from "react-icons/tb";
import { BiWalletAlt } from "react-icons/bi";
import { AiFillContacts } from "react-icons/ai";
export const links = [
    {
        id: 1,
        name: "Home",
        path: "/",
        icon: <BiHomeAlt2 />,
    },
    {
        id: 2,
        name: "Discount",
        path: "/discount",
        icon: <TbDiscount2 />,
    },
    {
        id: 3,
        name: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
    },
    {
        id: 4,
        name: "Notification",
        path: "/notification",
        icon: <Notification />,
    },
    {
        id: 5,
        name: "Order",
        path: "/order",
        icon: <Order />,
    },
    {
        id: 6,
        name: "Customer",
        path: "/customer",
        icon: <Customer />,
    },
    {
        id: 7,
        name: "Setting",
        path: "/setting",
        icon: <Setting />,
    },
    {
        id: 8,
        name: "Reservation",
        path: "/reservation",
        icon: <BiAt />,
    },
];

export const MENU_ITEMS = [
    {
        name: "Home",
        path: "/",
        icon: <BiHomeAlt2 />,
    },
    {
        name: "Discount",
        path: "/discount",
        icon: <TbDiscount2 />,
    },
    {
        name: "Reservation",
        path: "/reservation",
        icon: <BiAt />,
    },
    {
        name: "Contact",
        path: "/contact",
        icon: <AiFillContacts />,
    },
    {
        name: "Main",
        path: "/main",
        icon: <FiShoppingBag />,
    },
];

export const USER_MENU = [
    {
        name: "Home",
        path: "/",
        icon: <BiHomeAlt2 />,
    },
    {
        name: "Discount",
        path: "/user/discount",
        icon: <TbDiscount2 />,
    },
    {
        name: "Order",
        path: "/user/order",
        icon: <Order />,
    },
    {
        name: "Customer",
        path: "/user/customer",
        icon: <Customer />,
    },
    {
        name: "Reservation",
        path: "/user/reservation",
        icon: <BiAt />,
    },
    {
        name: "Contact",
        path: "/user/contact",
        icon: <AiFillContacts />,
    },
    {
        name: "Main",
        path: "/user/main",
        icon: <FiShoppingBag />,
    },
];

export const SettingOption = [
    {
        name: "Order",
        description: "Your previous orders",
        component: "Order",
        icon: <Order />,
    },
    {
        name: "Notifications",
        description: "Customize your notifications",
        component: "Notifications",
        icon: <Notification />,
    },
    {
        name: "Products Management",
        description: "Manage your product, pricing, etc",
        component: "ProductsManagement",
        icon: <BiFoodMenu />,
    },
    {
        name: "Categories Management",
        description: "Manage your categories",
        component: "CategoriesManagement",
        icon: <BiBookmarkMinus />,
    },
    {
        name: "Security",
        description: "Configure Password, PIN, etc",
        component: "Security",
        icon: <MdOutlineSecurity />,
    },
    {
        name: "About Us",
        description: "Find out more about Posly",
        component: "AboutUs",
        icon: <BiAt />,
    },
];

export const ADMIN_MENU = [
    {
        name: "Home",
        path: "/",
        icon: <BiHomeAlt2 />,
    },
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <Dashboard />,
    },
    {
        name: "Notification",
        path: "/admin/notification",
        icon: <Notification />,
    },
    {
        name: "Calender",
        path: "/admin/calender",
        icon: <FiCalendar />,
    },
    {
        name: "Desk Manager",
        path: "/admin/deskmanager",
        icon: <MdOutlineTableRestaurant />,
    },
    {
        name: "Setting",
        path: "/admin/setting",
        icon: <Setting />,
    },
];

export const highlights = [
    "Unique flavor",
    "Fresh and quality ingredients",
    "Evokes region or culture",
    "Distinctive cooking method",
    "Attractive colors and presentation",
    "Unique ingredient combinations",
    "Local market ingredients",
    "Traditional or creative preparation",
];

export const cart = [
    {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        price: 90.0,
        quantity: 1,
        imageSrc: CaesarSalad,
        imageAlt:
            "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
        id: 2,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: 32.0,
        quantity: 2,
        imageSrc: Cheesecake,
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 3,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: 32.0,
        quantity: 2,
        imageSrc: Cheesecake,
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
        id: 4,
        name: "Medium Stuff Satchel",
        href: "#",
        color: "Blue",
        price: 32.0,
        quantity: 2,
        imageSrc: Cheesecake,
        imageAlt:
            "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
];

export const paymentMethods = [
    {
        id: 1,
        name: "Credit Card",
        icon: <CgCreditCard />,
    },
    {
        id: 2,
        name: "Paypal",
        icon: <TbBrandPaypal />,
    },
    {
        id: 3,
        name: "Wallet",
        icon: <BiWalletAlt />,
    },
];

export const heroImg = [
    {
        id: 1,
        img: Cheesecake,
    },
    {
        id: 2,
        img: BBQRibs,
    },
    {
        id: 3,
        img: Icream,
    },
    {
        id: 4,
        img: Pizza,
    },
    {
        id: 5,
        img: Salad,
    },
]


export const awards = [
    {
        imgUrl: award02,
        title: "Bib Gourmond",
        subtitle: "Lorem ipsum dolor sit amet, consectetur.",
    },
    {
        imgUrl: award01,
        title: "Rising Star",
        subtitle: "Lorem ipsum dolor sit amet, consectetur.",
    },
    {
        imgUrl: award05,
        title: "AA Hospitality",
        subtitle: "Lorem ipsum dolor sit amet, consectetur.",
    },
    {
        imgUrl: award03,
        title: "Outstanding Chef",
        subtitle: "Lorem ipsum dolor sit amet, consectetur.",
    },
];