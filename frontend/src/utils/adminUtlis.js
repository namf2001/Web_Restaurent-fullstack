/** @format */

import { startOfWeek, endOfWeek, subWeeks } from "date-fns";

// lấy ngày bắt đầu và kết thúc của tuần hiện tại
const today = new Date();
const startOfThisWeek = startOfWeek(today);
const endOfThisWeek = endOfWeek(today);

function calculateWeeklyRevenue(orders, weekOffset = 0) {
    const startOfLastWeek = subWeeks(startOfThisWeek, weekOffset);

    const weeklyOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfLastWeek && orderDate <= endOfThisWeek;
    });
    // Tính tổng doanh thu từ các đơn hàng trong tuần
    const weeklyRevenue = weeklyOrders.reduce(
        (total, order) => total + order.total,
        0
    );

    return weeklyRevenue;
}

function compareWeeklyRevenuePercentage(orders) {
    // Tính tổng doanh thu của tuần này
    const thisWeekRevenue = calculateWeeklyRevenue(orders);
    // Tính tổng doanh thu của tuần trước
    const lastWeekRevenue = calculateWeeklyRevenue(orders, 1);
    // Tính phần trăm tăng hoặc giảm
    const percentageChange =
        ((thisWeekRevenue - lastWeekRevenue) / Math.abs(lastWeekRevenue)) * 100;
    // Chuyển đổi số thành chuỗi và giữ lại 2 chữ số thập phân
    return percentageChange.toFixed(2);
}

function calculateWeeklyUser(users, weekOffset = 0) {
    // Lấy ngày bắt đầu và kết thúc của tuần trước bằng cách sử dụng subWeeks từ thư viện date-fns
    const startOfLastWeek = subWeeks(startOfThisWeek, weekOffset);

    // Lọc các đơn hàng nằm trong khoảng thời gian của tuần
    const weeklyUsers = users.filter((user) => {
        // bỏ qua các user có role là admin
        if (user.role === "admin") return false;
        const userDate = new Date(user.createdAt);
        return userDate >= startOfLastWeek && userDate <= endOfThisWeek;
    });

    // Tính tổng doanh thu từ các đơn hàng trong tuần
    const weeklyUser = weeklyUsers.length;

    return weeklyUser;
}

function compareWeeklyUsersPercentage(users) {
    // Tính tổng doanh thu của tuần này
    const thisWeekUser = calculateWeeklyUser(users);
    // Tính tổng doanh thu của tuần trước
    const lastWeekUser = calculateWeeklyUser(users, 1);
    // Tính phần trăm tăng hoặc giảm
    const percentageChange =
        ((thisWeekUser - lastWeekUser) / Math.abs(lastWeekUser)) * 100;
    // Chuyển đổi số thành chuỗi và giữ lại 2 chữ số thập phân
    return percentageChange.toFixed(2);
}

function calculateOrderUser(orders, weekOffset = 0) {
    const startOfLastWeek = subWeeks(startOfThisWeek, weekOffset);

    const weeklyOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfLastWeek && orderDate <= endOfThisWeek;
    });
    // Tính tổng doanh thu từ các đơn hàng trong tuần
    let totalQuantity = 0;

    // Lặp qua từng món trong đơn hàng và cộng dồn số lượng vào totalQuantity
    for (const item of weeklyOrders) {
        for (const quantity of item.items) {
            totalQuantity += quantity.quantity;
        }
    }

    return totalQuantity;
}

function compareOrderUserPercentage(orders) {
    // Tính tổng doanh thu của tuần này
    const thisWeekOrder = calculateOrderUser(orders);
    // Tính tổng doanh thu của tuần trước
    const lastWeekOrder = calculateOrderUser(orders, 1);
    // Tính phần trăm tăng hoặc giảm
    const percentageChange =
        ((thisWeekOrder - lastWeekOrder) / Math.abs(lastWeekOrder)) * 100;
    // Chuyển đổi số thành chuỗi và giữ lại 2 chữ số thập phân
    return percentageChange.toFixed(2);
}

export {
    calculateWeeklyRevenue,
    compareWeeklyRevenuePercentage,
    calculateWeeklyUser,
    compareWeeklyUsersPercentage,
    calculateOrderUser,
    compareOrderUserPercentage,
};
