/* eslint-disable react/prop-types */
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button";
import Cover from "../assets/images/toping.png";

const Product = ({
	name = "name",
	price = 100,
	quantity = 10,
	image = null,
}) => {
	useEffect(() => {
		AOS.init({ once: true });
	}, []);

	return (
		<div className="flex flex-col justify-between items-center bg-base/dark-bg-2-14 rounded-2xl w-[192px] h-[273px] mt-[34px] lg:mt-[55px] p-4 lg:w-[230px] lg:h-[327px] z-10 relative product-hover hover:scale-95 transition-transform">
			<div className="mt-[-34px] lg:mt-[-50px] relative overflow-visible">
				{/* Sản phẩm */}
				<img
					src={image}
					alt={name}
					className="product-img-1 left-50% w-[132px] h-[132px] lg:w-[160px] lg:h-[160px] object-cover sticky z-50"
				/>
				{/* Toping */}
				<img
					src={Cover}
					alt="/"
					className="product-img-2 object-cover w-[132px] h-[132px] lg:w-[160px] lg:h-[160px] scale-75 absolute top-0 -z-10"
				/>
			</div>
			<div className="flex flex-col justify-center items-center gap-2">
				<h3 className="text-sm font-semibold">{name}</h3>
				<p className="text-sm font-light">$ {price}</p>
				<p className="text-sm font-extralight text-light">
					{quantity} Bowls available
				</p>
			</div>
			<div className="w-full">
				<Button btnText="Order Now" />
			</div>
		</div>
	);
};

export default Product;
