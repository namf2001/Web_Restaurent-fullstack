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
    update: (param,data) => {
        const url = `/order/${param}`;
        return axiosClient.put(url, data);
    },
};

export default orderApi;