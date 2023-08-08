import { useEffect, useRef, useState } from "react";
import { products } from "../assets/data";
import MenuDropDown from "../components/MenuDropDown";
import { motion } from "framer-motion";
import { Product } from "../components";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
	const ref = useRef(null);
	const typeProducts = products
		.map((product) => product.productType)
		.filter((value, index, self) => self.indexOf(value) === index);
	typeProducts.unshift("All");
	const option = ["expensive", "average", "cheap"];
	const [currenOptions, setCurrenOptions] = useState(option[0]);
	const [selectedType, setSelectedType] = useState(typeProducts[0]);
	const [spanX, setSpanX] = useState(0);



	useEffect(() => {
		AOS.init();
	}, []);


	return (
		<div className="px-6 flex flex-col h-full">
			<div className="relative">
				<ul className="flex gap-2 items-center text-sm mb-3">
					{typeProducts.map((typeProduct, index) => (
						<motion.li
							key={typeProduct}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							whileHover={{ scale: 1.1 }} // Hiệu ứng khi di chuột qua
							whileTap={{ scale: 0.9 }} // Hiệu ứng khi nhấp vào
							onClick={() => {
								setSelectedType(typeProduct);
								setSpanX(index * 88); // Điều chỉnh khoảng cách ngang giữa các mục
							}}
							className={
								selectedType === typeProduct
									? "text-primary-color font-semibold w-20 text-center"
									: "w-20 text-center"
							}>
							{typeProduct}
						</motion.li>
					))}
				</ul>
				<hr className="w-full h-[1px] bg-base/dark-line-1 border-0 absolute" />
				{selectedType && (
					<motion.span
						className="absolute w-20 h-1 bg-primary-color rounded-md -bottom-0.5"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1.5, x: spanX }} // Đặt giá trị x để di chuyển span
						transition={{ duration: 0.5 }}></motion.span>
				)}
			</div>
			{console.log(selectedType)}
			<div className="py-6 flex justify-between items-center">
				<h1 className="text-xl font-bold">Choose {selectedType}</h1>
				<div>
					<MenuDropDown
						option={option}
						options={currenOptions}
						setOptions={setCurrenOptions}
					/>
				</div>
			</div>
			<div
				ref={ref}
				className="flex flex-wrap justify-start items-start gap-6 overflow-auto h-[calc(100vh-240px)] scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full z-0"
				data-aos="fade-up"
				data-aos-duration="500"
				data-aos-once="true">
				{products.map((product) => {
					if (
						product.productType === selectedType ||
						selectedType === "All"
					) {
						return <Product key={product.ObjectId} {...product} />;	
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Home;
