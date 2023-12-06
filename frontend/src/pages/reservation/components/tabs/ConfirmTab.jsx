/** @format */
import propTypes from "prop-types";
import Button from "../../../../components/Button";
const ConfirmTab = ({ value, onConfirm, onSelectedTab }) => {
    console.log(value.date.toDate(), value.date.format("dddd, MMMM D, YYYY h:mm A"), value.date.format("dddd MMMM DD, YYYY"), value.date.format("HH:mm"));
    return (
        <div className="h-full">
            <div className="flex flex-col gap-4 dark:text-dark">
                <h2 className="text-2xl font-bold ">Xác nhận đặt bàn</h2>
                <div className="flex flex-col gap-2">
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Tên khách hàng</span>{" "}
                        <span className="flex-1 font-thin italic">
                            {value.selectedName}
                        </span>
                    </p>
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Số điện thoại</span>{" "}
                        <span className="flex-1 font-thin italic">
                            {value.selectedPhone}
                        </span>
                    </p>
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Số khách</span>{" "}
                        <span className="flex-1 font-thin italic">
                            {value.selectedGuests} người
                        </span>
                    </p>
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Ngày đặt bàn</span>{" "}
                        <span className="flex-1 font-thin italic">
                            {value?.date?.format("dddd MMMM DD, YYYY")}
                        </span>
                    </p>
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Thời gian</span>{" "}
                        <span className="flex-1 font-thin italic">
                            {value?.date?.format("HH:mm")}
                        </span>
                    </p>
                    <p className="flex border-b-1 border-gray-400 pb-3">
                        <span className="font-bold flex-1">Ghi chú</span>{" "}
                        <span className="flex-1 font-thin italic line-clamp-1">
                            {value.note}
                        </span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        btnText="Quay lại"
                        handler={() =>
                            onSelectedTab({ icon: "🥬", label: "Info" })
                        }
                        outline
                    />
                    <Button btnText="Xác nhận" handler={onConfirm} />
                </div>
            </div>
        </div>
    );
};

ConfirmTab.propTypes = {
    value: propTypes.object,
    onConfirm: propTypes.func,
    onSelectedTab: propTypes.func, 
};

export default ConfirmTab;
