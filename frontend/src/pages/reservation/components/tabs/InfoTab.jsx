/** @format */

import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import propTypes from "prop-types";

import { motion } from "framer-motion";
import VideoIntro from "../../video.mp4";

const InfoTab = ({ label, value, onChange, onSelectedTab }) => {
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
        <div className="flex gap-6">
            <div className="min-w-[40%]">
                <h1>{label}</h1>
                {/* tao form info gom name phone gu */}
                <form className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full h-20">
                        <label className="block text-white">
                            Tên khách hàng
                        </label>
                        <input
                            type="text"
                            name="selectedName"
                            value={selectedName}
                            placeholder="Tên khách hàng"
                            onChange={(e) => setSelectedName(e.target.value)}
                            className="bg-base/dark-line block rounded-md border-0 pl-2 w-full h-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full h-20">
                        <label className="block text-white">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            name="selectedPhone"
                            value={selectedPhone}
                            placeholder="Số điện thoại"
                            onChange={(e) => setSelectedPhone(e.target.value)}
                            className="bg-base/dark-line block rounded-md border-0 pl-2 w-full h-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="block text-white">
                            Số lượng khách
                        </label>
                        <div className="flex gap-6">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={selectedGuests}
                                onChange={(e) =>
                                    setSelectedGuests(e.target.value)
                                }
                                className="bg-base/dark-line block flex-1"
                            />
                            <span className="text-white text-center px-4">
                                {selectedGuests}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full mb-10">
                        <label className="block text-white">Ghi chú</label>
                        <textarea
                            name="note"
                            placeholder="Ghi chú"
                            rows="3"
                            value={selectedNote}
                            onChange={(e) => setSelectedNote(e.target.value)}
                            className="bg-base/dark-line block rounded-md border-0 pl-2 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
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
            <div className="flex flex-col gap-2 w-3/5">
                <video
                    className="w-full h-[180px] object-cover"
                    loop
                    autoPlay
                    muted>
                    <source src={VideoIntro} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
    label: propTypes.string,
    value: propTypes.object,
    onChange: propTypes.func,
    onSelectedTab: propTypes.func,
};

export default InfoTab;
