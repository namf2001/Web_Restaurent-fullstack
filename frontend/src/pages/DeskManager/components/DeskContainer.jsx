/** @format */
import { SiTablecheck } from "react-icons/si";
import { BiChair } from "react-icons/bi";
import propTypes from "prop-types";
const DeskContainer = ({ tables, handleUpdate, setTableSelected }) => {
    return (
        <div className="flex-[3] min-h-[calc(100vh-100px)] pb-6">
            <div className="grid grid-cols-4 h-full gap-4">
                {tables?.map((table) => (
                    <DeskItem
                        key={table._id}
                        tableItem={table}
                        handleUpdate={handleUpdate}
                        setTableSelected={setTableSelected}
                    />
                ))}
            </div>
        </div>
    );
};

const DeskItem = ({ tableItem, handleUpdate, setTableSelected }) => {
    const styles = {
        Available: {
            bg: "bg-base/dark-bg-2-14 dark:bg-light-bg-1",
            text: "text-dark-1 dark:text-light-bg-1",
            border: "border-dark-1 opacity-70 dark:border-light-bg-1",
        },
        Occupied: {
            bg: "bg-green-500",
            text: "text-green-500",
            border: "border-green-500",
        },
        Reserved: {
            bg: "bg-yellow-500",
            text: "text-yellow-500",
            border: "border-yellow-500",
        },
        Closed: {
            bg: "bg-red-500",
            text: "text-red-500",
            border: "border-red-500",
        },
        default: {
            bg: "bg-green-500",
            text: "text-green-500",
            border: "border-green-500",
        },
    };

    const { status } = tableItem;
    const { bg, text, border } = styles[status] || styles.default;

    return (
        <div className={`${border} border-2 rounded-xl relative`}>
            <div className="flex justify-between items-center p-4">
                <div className="w-full">
                    {/* tao section de update trang thai */}
                    <select
                        className={`${bg} border-none text-white  dark:text-dark rounded-md w-full focus:outline-none`}
                        name="status"
                        value={status}
                        onChange={(e) => handleUpdate(e, tableItem._id)}
                        id="status">
                        <option value="Available">Trống</option>
                        <option value="Occupied" disabled>
                            Đang phục vụ
                        </option>
                        <option value="Reserved">Đã đặt trước</option>
                        <option value="Closed">Đang sửa chữa</option>
                    </select>
                </div>
            </div>
            <button
                className={`flex justify-center items-center relative ${text} mx-auto`}
                onClick={() => setTableSelected(tableItem)}>
                <div className="text-7xl">
                    <SiTablecheck className={text} />
                </div>
                <div className="absolute select-none">
                    {tableItem.tableNumber}
                </div>
            </button>
            <div className={`absolute bottom-1 right-2 ${text} flex gap-1 items-center`}>
                <p>{tableItem.capacity}</p> <BiChair />
            </div>
        </div>
    );
};
DeskContainer.propTypes = {
    tables: propTypes.array,
    handleUpdate: propTypes.func,
    setTableSelected: propTypes.func,
};

DeskItem.propTypes = {
    tableItem: propTypes.object,
    handleUpdate: propTypes.func,
    setTableSelected: propTypes.func,
};

export default DeskContainer;
