import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll: (params) => {
        const url = "/category";
        return axiosClient.get(url, { params });
    },
    updatePosition: (data) => {
        const url = "/category";
        return axiosClient.put(url, {data});
    },
    getOne: (id) => {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/category`;
        return axiosClient.post(url, data);
    },
    update: (id, data) => {
        const url = `/category/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `/category/${id}`;
        return axiosClient.delete(url);
    }
}

export default CategoryApi;