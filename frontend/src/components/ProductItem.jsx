/* eslint-disable react/prop-types */
// import React from 'react'

import { BiTrash } from "react-icons/bi";
import Button from "./Button";

const ProductItem = (props) => {
	return (
		<div className="flex w-full gap-4">
			<div className="flex flex-col gap-2 flex-1">
				<div className="flex justify-between">
					<div className="flex gap-2">
						<a
							className="h-[40px] block mb-5 w-[40px]"
							aria-label="link-wrap-image">
							<img
								src={props.imageSrc}
								alt={props.imageAlt}
								className="object-cover w-full h-full rounded-lg"
							/>
						</a>
						<span>
							<p>{props.name}</p>
							<p>$ {props.price}</p>
						</span>
					</div>
					<span className="p-3 bg-base/dark-bg-1-18 rounded-md w-12 h-12 text-center">{props.quantity}</span>
				</div>
				<input
					type="text"
					placeholder="Enter your content"
					className="bg-base/dark-line block rounded-md border-0 p-3.5 h-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6 "
				/>
			</div>
			<div className="flex flex-col gap-2 justify-between">
				<span>$ {props.price * props.quantity}</span>
				<Button btnText={<BiTrash />} outline={true} />
			</div>
		</div>
	);
};

export default ProductItem;
