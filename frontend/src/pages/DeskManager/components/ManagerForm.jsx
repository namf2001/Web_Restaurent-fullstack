/** @format */

import propTypes from "prop-types";
import Button from "../../../components/Button";
import OrderItem from "../../../components/OrderItem";

const ManagerForm = ({
    tables,
    tableSelected,
    setTableSelected,
    handleUpdate,
}) => {
    const handleStatus = (status) => {
        return tables.filter((table) => table.status === status).length;
    };

    const styles = {
        Available: { bg: "bg-base/dark-bg-2-14" },
        Occupied: { bg: "bg-green-500" },
        Reserved: { bg: "bg-yellow-500" },
        Closed: { bg: "bg-red-500" },
        default: { bg: "bg-green-500" },
    };

    const status = tableSelected?.status ?? "default";
    const bg = styles[status]?.bg ?? styles.default.bg;
    return (
        <div className="flex-1 bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark rounded-lg p-2 h-[calc(100vh-124px)]">
            <div className="flex flex-col h-full p-4">
                <h3 className="text-center text-3xl font-bold">
                    Quản lý bàn ăn
                </h3>
                {tableSelected ? (
                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-xl">
                                Bàn số: {tableSelected.tableNumber}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="status">Trạng thái</label>
                            <select
                                className={`${bg} border-none text-white rounded-md w-full p-2 focus:outline-none text-lg`}
                                name="status"
                                value={tableSelected.status}
                                onChange={(e) =>
                                    handleUpdate(e, tableSelected._id)
                                }
                                id="status">
                                <option value="Available">Trống</option>
                                <option value="Occupied" disabled>
                                    Đang phục vụ
                                </option>
                                <option value="Reserved">Đã đặt trước</option>
                                <option value="Closed">Đang sửa chữa</option>
                            </select>
                        </div>
                        {tableSelected.status === "Occupied" && (
                            <>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="customerName">
                                        Tên khách:
                                    </label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        id="customerName"
                                        className="border-none rounded-md w-2/3 p-2 focus:outline-none text-lg bg-transparent"
                                        value={
                                            tableSelected?.order?.user_id
                                                ?.username
                                        }
                                        disabled
                                    />
                                </div>{" "}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description">
                                        Thực đơn
                                    </label>
                                    {tableSelected.status === "Occupied" ? (
                                        <div className="flex flex-col gap-2 min-h-[270px] bg-base/dark-bg-1-18 overflow-y-auto p-2 rounded-md">
                                            {tableSelected?.order?.items?.map(
                                                (item) => (
                                                    <OrderItem
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {tableSelected?.menu?.map(
                                                (item, index) => (
                                                    <div
                                                        className="flex justify-between"
                                                        key={index}>
                                                        <span
                                                            className="text-lg"
                                                            key={`name-${index}`}>
                                                            {item.name}
                                                        </span>
                                                        <span
                                                            className="text-lg"
                                                            key={`quantity-${index}`}>
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="flex justify-center gap-2">
                            <Button
                                btnText="Hủy"
                                outline
                                handler={() => setTableSelected(null)}
                            />
                            <Button btnText="Lưu" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 mt-8">
                        <h4 className="text-xl">
                            Tổng số bàn ăn: {tables.length}
                        </h4>
                        <StatusBar
                            color="bg-base/dark-line"
                            status={handleStatus("Available")}
                            tableLength={tables.length}
                        />
                        <StatusBar
                            color="bg-green-500"
                            status={handleStatus("Occupied")}
                            tableLength={tables.length}
                        />
                        <StatusBar
                            color="bg-yellow-500"
                            status={handleStatus("Reserved")}
                            tableLength={tables.length}
                        />
                        <StatusBar
                            color="bg-red-500"
                            status={handleStatus("Closed")}
                            tableLength={tables.length}
                        />
                        <span className="m-auto mt-12 text-4xl text-center">
                            Chọn một bàn để xem thông tin
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

ManagerForm.propTypes = {
    tables: propTypes.array,
    tableSelected: propTypes.object,
    setTableSelected: propTypes.func,
    handleUpdate: propTypes.func,
};

const StatusBar = ({
    color = "bg-base/dark-line",
    status = 4,
    tableLength = 14,
}) => {
    return (
        <div className="">
            <div className="flex justify-between">
                <div>Số bàn trống: {status}</div>
                <div>{((status / tableLength) * 100).toFixed(0) + "%"}</div>
            </div>
            <div className={`relative h-4 w-full bg-white rounded-md `}>
                <div
                    className={`absolute} top-0 left-0 h-full rounded-md ${color}`}
                    style={{
                        width: `${((status / tableLength) * 100).toFixed(0)}%`,
                    }}
                />
            </div>
        </div>
    );
};

StatusBar.propTypes = {
    color: propTypes.string,
    status: propTypes.number,
    tableLength: propTypes.number,
};

export default ManagerForm;
