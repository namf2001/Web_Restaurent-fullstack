/** @format */

import axiosClient from "./axiosClient";

const adminApi = {
    getMostOrderedFoodsTodayAdmin: () => {
        const url = "/cart/most-ordered-today-admin";
        return axiosClient.get(url);
    },
    getMostOrderedFoodsThisWeekAdmin: () => {
        const url = "/cart/most-ordered-this-week-admin";
        return axiosClient.get(url);
    },
    getMostOrderedFoodsAllTimeAdmin: () => {
        const url = "/cart/most-ordered-all-time-admin";
        return axiosClient.get(url);
    },
    getAllUsers: () => {
        const url = "/auth/users";
        return axiosClient.get(url);
    },
    getAllAdmin: () => {
        const url = "/order/admin";
        return axiosClient.get(url);
    },
    updateStatus: (param, data) => {
        const url = `/order/${param}`;
        return axiosClient.put(url, data);
    },
    getTopCustomersLastWeek: () => {
        const url = "/order/top-customers";
        return axiosClient.get(url);
    },
    getOrderCountsByStatusThisWeek: () => {
        const url = "/order/counts-by-status";
        return axiosClient.get(url);
    },
};

export default adminApi;
