import axiosClient from "./axiosClient";

const tableApi = {
    getAll: () => {
        const url = `/tables`;
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/tables/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/tables`;
        return axiosClient.post(url, data);
    },
    update: (id, data) => {
        const url = `/tables/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `/tables/${id}`;
        return axiosClient.delete(url);
    },
};

export default tableApi;