// /** @format */

// import { Dialog } from "@headlessui/react";
// import { useContext, useState } from "react";
// import { paymentMethods } from "../../assets/data";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Button } from "../index";
// import CartContext from "../../context/cartContext";
// import { motion } from "framer-motion";
// import TableImg from "../../assets/images/table.png";
// import MenuDropDown from "../MenuDropDown";

// const PaymentOrder = () => {
//     const option = ["Today", "Week", "All the time"];
//     const { toggleCart, toggleLocation, openLocation } =
//         useContext(CartContext);
//     const [orderForTable, setOrderForTable] = useState(false);
//     const [orderOption, setOrderOption] = useState(option[0]);
//     // const [selectedDate, setSelectedDate] = useState(null);
//     // const handleDateChange = (date) => {
//     //     setSelectedDate(date);
//     // };

//     return (
//         <div className="flex h-full flex-col bg-base/dark-bg-2-14 shadow-xl text-white w-[400px] border-l border-dark">
//             {/* <div className="flex-1 px-4 py-6 sm:px-6">
//                 <div className="flex items-start flex-col gap-4">
//                     <Dialog.Title className="text-lg font-medium flex justify-between w-full">
//                         <div className="mt-11">
//                             Thanh toán
//                             <p className="text-sm font-normal pt-2 text-gray-400">
//                                 3 phương thức thanh toán có sẵn
//                             </p>
//                         </div>
//                     </Dialog.Title>
//                 </div>
//                 <hr className="w-full h-[1px] bg-base/dark-line-1 border-0 my-4" />
//                 <div className="mt-8">
//                     <div className="flow-root">
//                         <div
//                             id="PaymentMethodRoot"
//                             className="flex flex-col gap-2 w-full h-[492px] items-start">
//                             <div
//                                 id="Title"
//                                 className="text-xl font-semibold mb-2">
//                                 Phương thức thanh toán
//                             </div>
//                             <div className="self-stretch w-full flex justify-between items-start mb-2 mr-10">
//                                 {paymentMethods.map((method) => {
//                                     return (
//                                         <div
//                                             className="checkbox"
//                                             key={method.id}>
//                                             <label className="checkbox-wrapper">
//                                                 <input
//                                                     type="radio"
//                                                     className="checkbox-input"
//                                                     name="checkbox"
//                                                     value="checkbox0"
//                                                 />
//                                                 <span className="checkbox-tile p-2">
//                                                     <span className="checkbox-icon">
//                                                         {method.icon}
//                                                     </span>
//                                                     <span className="checkbox-label">
//                                                         {method.name}
//                                                     </span>
//                                                 </span>
//                                             </label>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                             <div className="text-sm font-medium text-white">
//                                 Tên chủ thẻ
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 className="bg-base/dark-line block rounded-md mb-2 pl-3 h-12 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
//                             />
//                             <div className="text-sm font-medium text-white">
//                                 Số thẻ
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder="1234 1234 1234"
//                                 className="bg-base/dark-line block rounded-md mb-2 pl-3 h-12 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
//                             />
//                             <div className="self-stretch flex  mb-2 gap-3 items-start">
//                                 <div className="flex flex-col gap-3">
//                                     <label className="text-sm font-medium text-white">
//                                         Ngày hết hạn
//                                     </label>
//                                     <DatePicker
//                                         selected={selectedDate}
//                                         onChange={handleDateChange}
//                                         dateFormat="dd/MM/yyyy"
//                                         placeholderText="dd/MM/yyyy"
//                                         className="bg-base/dark-line block rounded-md mb-2 pl-3 h-12 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col gap-3">
//                                     <label className="text-sm font-medium text-white">
//                                         CVV
//                                     </label>
//                                     <input
//                                         type="text"
//                                         placeholder="***"
//                                         className="bg-base/dark-line block rounded-md mb-2 pl-3 h-12 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
//                                     />
//                                 </div>
//                             </div>
//                             <hr className="w-full h-[1px] bg-base/dark-line-1 border-0" />
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//             {!orderForTable && (
//                 <motion.div
//                     initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
//                     animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
//                     transition={{ duration: 0.5 }} // Thời gian của animation
//                     className="flex flex-1 items-center px-4 py-6 sm:px-6">
//                     <Button
//                         btnText="Thanh toán cho bàn ăn"
//                         handler={() => setOrderForTable(true)}
//                     />
//                 </motion.div>
//             )}
//             {orderForTable && (
//                 <motion.div
//                     initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
//                     animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
//                     transition={{ duration: 0.5 }} // Thời gian của animation
//                     className="flex flex-col flex-1 items-center  px-4 py-6 sm:px-6">
//                     <h2 className="text-2xl">Thanh toán cho bàn ăn</h2>
//                     <div className="mt-4 h-[150px]">
//                         <img
//                             src={TableImg}
//                             alt="table"
//                             className="h-full object-contain"
//                         />
//                     </div>
//                     <MenuDropDown />
//                 </motion.div>
//             )}
//             <div
//                 className={`flex gap-3 px-6 mb-6 h-[48px] transition-all ${
//                     orderForTable || openLocation
//                         ? "opacity-0 translate-y-20"
//                         : "opacity-100 translate-y-0"
//                 }`}>
//                 <Button
//                     btnText="Hủy Bỏ"
//                     outline={true}
//                     handler={() => {
//                         toggleCart();
//                     }}
//                 />
//                 <Button
//                     btnText=" Thanh Toán"
//                     handler={() => {
//                         toggleLocation();
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default PaymentOrder;
