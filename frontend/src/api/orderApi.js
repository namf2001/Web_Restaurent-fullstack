import axiosClient from "./axiosClient";

const orderApi = {
    getAll: () => {
        const url = "/order";
        return axiosClient.get(url);
    },
    get: (param) => {
        const url = `/order/${param}`;
        return axiosClient.get(url);
    },
    add: (data) => {
        const url = "/order";
        return axiosClient.post(url, data);
    },
    remove: (param) => {
        const url = `/order/${param}`;
        return axiosClient.delete(url);
    },
    getLatest: () => {
        const url = `/order/latest`;
        return axiosClient.get(url);
    },
};

export default orderApi;