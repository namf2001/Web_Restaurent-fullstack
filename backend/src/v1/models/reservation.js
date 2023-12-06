/** @format */

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    user: {
        // Thông tin người đặt bàn có thể là khách hàng hoặc liên kết với user
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    user_name: {
        type: String, // Tên người đặt bàn
        required: true,
    },
    date: {
       // Ngày va giờ đặt bàn (ví dụ: 2021-05-30T17:00:00.000Z)
        type: Date,
        required: true,
    },
    time: {
        type: String, // Khung giờ đặt bàn
        required: true,
    },
    phone: {
        type: String, // Số điện thoại người đặt bàn
        required: true,
    },
    guests: {
        type: Number, // Số lượng khách
        required: true,
    },
    note: {
        type: String, // Ghi chú
    },
    status: {
        type: String, // Trạng thái đặt bàn (ví dụ: Đã xác nhận, Chưa xác nhận, Hoàn tất)
        enum: ["Confirmed", "Unconfirmed", "Completed"],
        default: "Unconfirmed", // Trạng thái mặc định
    },
},
    {
        timestamps: true, // Ngày tạo
    }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
