/** @format */

import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import propTypes from "prop-types";
import { motion } from "framer-motion";
import {
    TableFor2,
    TableFor3,
    TableFor4,
    TableFor5,
    TableFor6,
    TableFor8,
    TableFor10,
} from "../../../../assets/images/Table";

const InfoTab = ({ value, onChange, onSelectedTab }) => {
    const [selectedName, setSelectedName] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");
    const [selectedGuests, setSelectedGuests] = useState(0);
    const [selectedNote, setSelectedNote] = useState("");
    useEffect(() => {
        setSelectedName(value.selectedName);
        setSelectedPhone(value.selectedPhone);
        setSelectedGuests(value.selectedGuests);
        setSelectedNote(value.note);
    }, [value]);

    const handleInfoChange = () => {
        onChange({
            selectedName,
            selectedPhone,
            selectedGuests,
            note: selectedNote,
        });
        onSelectedTab({ icon: "🧀", label: "Confirm" });
    };
    return (
        <div className="flex gap-6 h-full">
            <div className="flex-1">
                <form className="flex flex-col gap-3 w-full">
                    <h2 className="text-white dark:text-dark text-2xl font-bold">
                        Thông tin khách hàng
                    </h2>
                    <div className="flex flex-col gap-1 w-full h-12">
                        <input
                            type="text"
                            name="selectedName"
                            value={selectedName}
                            placeholder="Tên khách hàng"
                            onChange={(e) => setSelectedName(e.target.value)}
                            className="bg-base/dark-line dark:bg-light-bg block rounded-md border-0 py-1.5 w-full pl-3 h-full text-light dark:text-slate-600 ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 dark:focus:ring-offset-orange-200 focus:outline-none text-sm leading-6"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full h-12">
                        <input
                            type="text"
                            name="selectedPhone"
                            value={selectedPhone}
                            placeholder="Số điện thoại"
                            onChange={(e) => setSelectedPhone(e.target.value)}
                            className="bg-base/dark-line dark:bg-light-bg block rounded-md border-0 py-1.5 w-full pl-3 h-full text-light dark:text-slate-600 ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 dark:focus:ring-offset-orange-200 focus:outline-none text-sm leading-6"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="block text-white dark:text-dark">
                            Số lượng khách
                        </label>
                        <div className="flex gap-6 items-end">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={selectedGuests}
                                onChange={(e) =>
                                    setSelectedGuests(e.target.value)
                                }
                                className="bg-base/dark-line dark:bg-light-bg-2 block flex-1 outline-none"
                            />
                            <span className="text-white dark:text-dark font-bold text-4xl text-center px-4">
                                {selectedGuests}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <textarea
                            name="note"
                            placeholder="Ghi chú"
                            rows="3"
                            value={selectedNote}
                            onChange={(e) => setSelectedNote(e.target.value)}
                            className="bg-base/dark-line dark:bg-light-bg block rounded-md border-0 py-1.5 w-full pl-3 h-full text-light dark:text-slate-600 ring-1 ring-inset ring-gray-700 dark:ring-orange-200 placeholder:text-light dark:placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 dark:focus:ring-offset-orange-200 focus:outline-none text-sm leading-6"
                        />
                    </div>
                    <Button
                        btnText="Quay lại"
                        outline
                        handler={() =>
                            onSelectedTab({ icon: "🍅", label: "Date" })
                        }
                    />
                </form>
            </div>
            <div className="flex justify-between items-center flex-col gap-2 flex-1 h-full">
                <ImgTable selectedGuests={selectedGuests} />
                {selectedName !== "" &&
                    selectedPhone !== "" &&
                    selectedGuests !== 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} // Trạng thái ban đầu
                            animate={{ opacity: 1, x: 0 }} // Trạng thái kết thúc
                            transition={{ duration: 0.5 }} // Thời gian của animation
                        >
                            <Button
                                btnText="Xác nhận thông tin khách hàng"
                                handler={handleInfoChange}
                            />
                        </motion.div>
                    )}
            </div>
        </div>
    );
};

InfoTab.propTypes = {
    value: propTypes.object,
    onChange: propTypes.func,
    onSelectedTab: propTypes.func,
};

export default InfoTab;

const ImgTable = ({ selectedGuests }) => {
    return (
        <motion.img
            key={selectedGuests} // Add a unique key when the selectedGuests value changes
            src={
                selectedGuests == 2
                    ? TableFor2
                    : selectedGuests == 3
                    ? TableFor3
                    : selectedGuests == 4
                    ? TableFor4
                    : selectedGuests == 5
                    ? TableFor5
                    : selectedGuests == 6
                    ? TableFor6
                    : selectedGuests == 8 || selectedGuests == 7
                    ? TableFor8
                    : TableFor10
            }
            alt="table"
            className="sm:max-h-80 2xl:max-h-[400px]  object-cover drop-shadow-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        />
    );
};

ImgTable.propTypes = {
    selectedGuests: propTypes.number,
};
