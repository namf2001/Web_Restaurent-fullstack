/** @format */

import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../index";
import CartContext from "../../context/cartContext";
import { motion } from "framer-motion";
import TableImg from "../../assets/images/table.png";
import MenuDropDown from "../MenuDropDown";
import tableApi from "../../api/tableApi";
import handleCheckout from "../../utils/checkOutUtils";
import { useSelector } from "react-redux";

const PaymentOrder = () => {
    const cart = useSelector((state) => state.cart.value);
    const { toggleCart, toggleLocation, openLocation } =
        useContext(CartContext);
    const [option, setOption] = useState([]);
    let options = option.map((item) => `Bàn ${item.tableNumber}`);
    const [orderForTable, setOrderForTable] = useState(false);
    const [note, setNote] = useState("");
    const [tableId, setTableId] = useState(null);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await tableApi.getAll();
                setOption(response.tables);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTable();
    }, []);

    
    const [tableOption, setTableOption] = useState("Bàn 1");
    
        useEffect(() => {
            const index = options.indexOf(tableOption);
            setTableId(option[index]?._id);
            console.log(tableId)
        }, [option, options, tableId, tableOption]);
    
    return (
        <div className="flex h-full flex-col bg-base/dark-bg-2-14 shadow-xl text-white w-[400px] border-l border-dark">
            {!orderForTable && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                    animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                    transition={{ duration: 0.5 }} // Thời gian của animation
                    className="flex flex-1 items-center px-4 py-6 sm:px-6">
                    <Button
                        btnText="Thanh toán cho bàn ăn"
                        handler={() => setOrderForTable(true)}
                    />
                </motion.div>
            )}
            {orderForTable && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                    animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                    transition={{ duration: 0.5 }} // Thời gian của animation
                    className="flex flex-col flex-1 items-center  px-4 py-6 sm:px-6">
                    <h2 className="text-2xl">Thanh toán cho bàn ăn</h2>
                    <div className="mt-4 h-[150px]">
                        <img
                            src={TableImg}
                            alt="table"
                            className="h-full object-contain"
                        />
                    </div>
                    <MenuDropDown
                        option={options}
                        options={tableOption}
                        setOptions={setTableOption}
                    />
                    {/* note */}
                    <div className="mt-4 w-full">
                        <label className="block mb-2 text-sm">Ghi chú</label>
                        <textarea
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Nhập ghi chú của bạn"
                            className="bg-base/dark-line block rounded-md mb-2 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none leading-6"
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex gap-3 px-6 mb-6 h-[48px]">
                        <Button
                            btnText="Hủy Bỏ"
                            outline={true}
                            handler={() => {
                                toggleLocation();
                            }}
                        />
                        <Button
                            btnText=" Thanh Toán"
                            handler={() => {
                                handleCheckout(cart, note, null, tableId);
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
            <div
                className={`flex gap-3 px-6 mb-6 h-[48px] transition-all ${
                    orderForTable || openLocation
                        ? "opacity-0 translate-y-20"
                        : "opacity-100 translate-y-0"
                }`}>
                <Button
                    btnText="Hủy Bỏ"
                    outline={true}
                    handler={() => {
                        toggleCart();
                    }}
                />
                <Button
                    btnText=" Thanh Toán"
                    handler={() => {
                        toggleLocation();
                    }}
                />
            </div>
        </div>
    );
};

export default PaymentOrder;
