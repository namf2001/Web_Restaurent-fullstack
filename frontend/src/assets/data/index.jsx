import { BiHomeAlt2 } from "react-icons/bi";
import { TbDiscount2 } from "react-icons/tb";
import { FiSettings as Setting } from "react-icons/fi";
import { BiUser as Customer } from "react-icons/bi";
import { BiBookmarkMinus as Order } from "react-icons/bi";
import { RiNotification4Line as Notification } from "react-icons/ri";
import { MdOutlineSpaceDashboard as Dashboard } from "react-icons/md";
import BBQRibs from "../images/BBQ Ribs.png";
import Burger from "../images/Burger.png";
import Pizza from "../images/pizza.png";
import Salad from "../images/Salad.png";
import Sushi from "../images/Sushi.png";
import Taco from "../images/Taco.png";
import Pho from "../images/Pho.png";
import Cheesecake from "../images/Cheesecake.png";
import Pasta from "../images/Pasta.png";
import Noodle from "../images/Noodle.png";
import SpringRolls from "../images/Spring Rolls.png";
import FishAndChips from "../images/Fish and Chips.png";
import FriedRice from "../images/Fried Rice.png";
import Icream from "../images/icream.png";
import Steak from "../images/Product1.png";
import CaesarSalad from "../images/Product2.png";

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
		name: "Customer",
		path: "/customer",
		icon: <Customer />,
	},
	{
		name: "Setting",
		path: "/setting",
		icon: <Setting />,
	},
]

export const USER_MENU = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: <Dashboard />,
	},
	{
		name: "Notification",
		path: "/notification",
		icon: <Notification />,
	},
	{
		name: "Order",
		path: "/order",
		icon: <Order />,
	},
]
export const products = [
	{
		ObjectId: "1",
		name: "Pizza",
		price: 100,
		quantity: 10,
		image: Pizza,
		describe: "Delicious pizza topped with fresh ingredients.",
		productType: "Hot Dishes",
		dateCreated: "12/12/2022",
	},
	{
		ObjectId: "2",
		name: "Burger",
		price: 200,
		quantity: 20,
		image: Burger,
		describe: "Juicy burger with a variety of toppings and sauces.",
		productType: "Soup",
		dateCreated: "11/11/2022",
	},
	{
		ObjectId: "3",
		name: "Sushi",
		price: 150,
		quantity: 15,
		image: Sushi,
		describe:
			"Fresh and flavorful sushi rolls made with premium ingredients.",
		productType: "Grill",
		dateCreated: "10/10/2022",
	},
	{
		ObjectId: "4",
		name: "Pasta",
		price: 120,
		quantity: 8,
		image: Pasta,
		describe: "Classic pasta dish with a rich and savory sauce.",
		productType: "Appetizer",
		dateCreated: "09/09/2022",
	},
	{
		ObjectId: "5",
		name: "Steak",
		price: 250,
		quantity: 12,
		image: Steak,
		describe: "Tender and juicy steak cooked to perfection.",
		productType: "Dessert",
		dateCreated: "08/08/2022",
	},
	{
		ObjectId: "6",
		name: "Salad",
		price: 80,
		quantity: 5,
		image: Salad,
		describe:
			"Fresh and healthy salad with a variety of vegetables and dressings.",
		productType: "Hot Dishes",
		dateCreated: "07/07/2022",
	},
	{
		ObjectId: "7",
		name: "Ice Cream",
		price: 70,
		quantity: 9,
		image: Icream,
		describe: "Creamy and delicious ice cream in various flavors.",
		productType: "Cold Dishes",
		dateCreated: "06/06/2022",
	},
	{
		ObjectId: "8",
		name: "Fried Rice",
		price: 90,
		quantity: 7,
		image: FriedRice,
		describe:
			"Flavorful fried rice with a mix of vegetables, meat, and spices.",
		productType: "Grill",
		dateCreated: "05/05/2022",
	},
	{
		ObjectId: "9",
		name: "Taco",
		price: 110,
		quantity: 15,
		image: Taco,
		describe: "Authentic Mexican tacos with various fillings and toppings.",
		productType: "Appetizer",
		dateCreated: "04/04/2022",
	},
	{
		ObjectId: "10",
		name: "Noodle",
		price: 130,
		quantity: 10,
		image: Noodle,
		describe: "Hearty noodle dish with a savory broth and toppings.",
		productType: "Dessert",
		dateCreated: "03/03/2022",
	},
	{
		ObjectId: "17",
		name: "Fish and Chips",
		price: 180,
		quantity: 10,
		image: FishAndChips,
		describe:
			"A classic British dish featuring crispy fried fish and thick-cut chips.",
		productType: "Cold Dishes",
		dateCreated: "02/02/2022",
	},
	{
		ObjectId: "18",
		name: "Pho",
		price: 120,
		quantity: 15,
		image: Pho,
		describe:
			"A traditional Vietnamese soup with tender beef or chicken, rice noodles, and aromatic herbs.",
		productType: "Soup",
		dateCreated: "01/01/2022",
	},
	{
		ObjectId: "19",
		name: "BBQ Ribs",
		price: 220,
		quantity: 8,
		image: BBQRibs,
		describe:
			"Slow-cooked, tender pork ribs slathered in tangy barbecue sauce.",
		productType: "Grill",
		dateCreated: "12/12/2021",
	},
	{
		ObjectId: "20",
		name: "Spring Rolls",
		price: 90,
		quantity: 12,
		image: SpringRolls,
		describe:
			"Light and crispy Vietnamese spring rolls filled with fresh vegetables and your choice of meat or shrimp.",
		productType: "Appetizer",
		dateCreated: "11/11/2021",
	},
	{
		ObjectId: "21",
		name: "Cheesecake",
		price: 150,
		quantity: 6,
		image: Cheesecake,
		describe:
			"Creamy and decadent New York-style cheesecake with a buttery graham cracker crust.",
		productType: "Dessert",
		dateCreated: "10/10/2021",
	},
	{
		ObjectId: "22",
		name: "Caesar Salad",
		price: 80,
		quantity: 9,
		image: CaesarSalad,
		describe:
			"Classic Caesar salad with crisp romaine lettuce, homemade dressing, croutons, and Parmesan cheese.",
		productType: "Hot Dishes",
		dateCreated: "09/09/2021",
	},
];

export const cart = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: 90.00,
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
		price: 32.00,
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
		price: 32.00,
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
		price: 32.00,
		quantity: 2,
		imageSrc: Cheesecake,
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	// More products...
];
