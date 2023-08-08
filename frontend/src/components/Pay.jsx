import { useState, Fragment } from "react";
import { RiShoppingCart2Line as Cart } from "react-icons/ri";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import ProductItem from "./ProductItem";
import Button from "./Button";
import { cart } from "../assets/data";

const Pay = () => {
	const [openCart, setOpenCart] = useState(false);
	const [openPayment, setOpenPayment] = useState(false);

	const toggleCart = () => {
		setOpenCart(!openCart);
	};

	const togglePayment = () => {
		setOpenPayment(!openPayment);
	};

	const total = cart.reduce((accumulator, product) => {
		return accumulator + product.price * product.quantity;
	}, 0);
	return (
		<>
			<Transition.Root show={openCart} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={setOpenCart}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full">
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900">
														Shopping cart
													</Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button
															type="button"
															className="-m-2 p-2 text-gray-400 hover:text-gray-500"
															onClick={
																toggleCart
															}>
															<span className="sr-only">
																Close panel
															</span>
															<MdClose
																className="h-6 w-6"
																aria-hidden="true"
															/>
														</button>
													</div>
												</div>
												<div className="mt-8">
													<div className="flow-root">
														<ul
															role="list"
															className="-my-6 divide-y divide-gray-200">
															{cart.map(
																(product) => (
																	<li
																		key={
																			product.id
																		}
																		className="flex py-6">
																		<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																			<img
																				src={
																					product.imageSrc
																				}
																				alt={
																					product.imageAlt
																				}
																				className="h-full w-full object-cover object-center"
																			/>
																		</div>

																		<div className="ml-4 flex flex-1 flex-col">
																			<div>
																				<div className="flex justify-between text-base font-medium text-gray-900">
																					<h3>
																						<a
																							href={
																								product.href
																							}>
																							{
																								product.name
																							}
																						</a>
																					</h3>
																					<p className="ml-4">
																						{
																							product.price
																						}
																					</p>
																				</div>
																				<p className="mt-1 text-sm text-gray-500">
																					{
																						product.color
																					}
																				</p>
																			</div>
																			<div className="flex flex-1 items-end justify-between text-sm">
																				<p className="text-gray-500">
																					Qty{" "}
																					{
																						product.quantity
																					}
																				</p>

																				<div className="flex">
																					<button
																						type="button"
																						className="font-medium text-indigo-600 hover:text-indigo-500">
																						Remove
																					</button>
																				</div>
																			</div>
																		</div>
																	</li>
																)
															)}
														</ul>
													</div>
												</div>
											</div>

											<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
												<div className="flex justify-between text-base font-medium text-gray-900">
													<p>Subtotal</p>
													<p>$262.00</p>
												</div>
												<p className="mt-0.5 text-sm text-gray-500">
													Shipping and taxes
													calculated at checkout.
												</p>
												<div className="mt-6">
													<a
														href="#"
														className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
														Checkout
													</a>
												</div>
												<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
													<p>
														or
														<button
															type="button"
															className="font-medium text-indigo-600 hover:text-indigo-500"
															onClick={
																toggleCart
															}>
															Continue Shopping
															<span aria-hidden="true">
																{" "}
																&rarr;
															</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<div
				className={`${
					!openPayment ? "w-[80px]" : "w-[33vw]"
				} bg-base/dark-bg-2-14 py-6 px-4 transition-all duration-500`}>
				<div className={`${openPayment ? "hidden" : ""}`}>
					<Button btnText={<Cart />} handler={togglePayment} />
				</div>
				<Transition show={openPayment}>
					<div
						className={`w-full bg-base/dark-bg-2-14 px-4 flex flex-col justify-between h-screen ${
							openPayment ? "" : "hidden"
						}`}>
						<div className="flex flex-col gap-6 overflow-y-auto scrollbar-none">
							<h2 className="text-xl font-semibol">
								Orders #34562
							</h2>
							<span className="bg-primary-color rounded-md p-2 text-white max-w-min">
								Delivery
							</span>
							<div className="flex justify-between w-full gap-6 font-semibold">
								<div className="flex justify-between w-full">
									<span>Item</span>
									<span>Qty</span>
								</div>
								<span>Price</span>
							</div>
							<hr className="w-full h-[1px] bg-base/dark-line-1 border-0" />
							<div className="flow-root">
								<ul role="list" className="flex flex-col gap-6">
									{cart.map((product) => {
										return (
											<li key={product.id}>
												<ProductItem {...product} />
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="flex flex-col gap-6 bg-base/dark-bg-2-14 mb-12">
							<hr className="w-full h-[1px] bg-base/dark-line-1 border-0" />
							<div className="flex justify-between text-base font-medium ">
								<p>Discount</p>
								<p>0%</p>
							</div>
							<div className="flex justify-between text-base font-medium ">
								<p>Subtotal</p>
								<p>$ {total}</p>
							</div>
							<div className="flex gap-3 w-full">
								<Button
									btnText="Go Back"
									outline={true}
									handler={togglePayment}
								/>
								<Button
									btnText="Pay Now"
									handler={toggleCart}
								/>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</>
	);
};

export default Pay;
