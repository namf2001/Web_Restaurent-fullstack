import axiosClient from "./axiosClient";

const foodItemApi = {
    getAll: (params) => {
        const url = "/food-items";
        return axiosClient.get(url, { params });
    },
    getOne: (id) => {
        const url = `/food-items/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/food-items`;
        return axiosClient.post(url, data);
    },
    update: (id, data) => {
        const url = `/food-items/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `/food-items/${id}`;
        return axiosClient.delete(url);
    },
    addToWishList: (id) => {
        const url = `/food-items/${id}/wishlist`;
        return axiosClient.post(url);
    },
}

export default foodItemApi;