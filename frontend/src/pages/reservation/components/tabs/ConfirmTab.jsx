/** @format */
import propTypes from "prop-types";
import Button from "../../../../components/Button";
const ConfirmTab = ({ value, onConfirm }) => {
    return (
        <div className="text-white">
            <h1>ConfirmTab</h1>
            {/* tao 1 form thong tin */}
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label className="text-white">Name</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value?.selectedName}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Số điện thoại</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value?.selectedPhone}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Số người</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value?.selectedGuests}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label className="text-white">Date</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value?.date?.format("YYYY-MM-DD")}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Time</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value?.date?.format("HH:mm")}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label className="text-white">People</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value.people}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Note</label>
                        <input
                            type="text"
                            className="border-2 border-white rounded-md"
                            value={value.note}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <Button btnText="Xác nhận" handler={onConfirm} />
        </div>
    );
};

ConfirmTab.propTypes = {
    value: propTypes.object,
    onConfirm: propTypes.func,
};

export default ConfirmTab;
