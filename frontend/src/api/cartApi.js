/** @format */

import axiosClient from "./axiosClient";

const CartApi = {
    addToCart: (id, quality) => {
        const url = `/cart/${id}/${quality}`;
        return axiosClient.post(url);
    },
    getCart: () => {
        const url = `/cart`;
        return axiosClient.get(url);
    },
    editCart: (id, quality) => {
        const url = `/cart/${id}/qty/${quality}`;
        return axiosClient.put(url);
    },
    editMessage: (id, message) => {
        const url = `/cart/${id}/message/`;
      return axiosClient.put(url, { message }); // message is an object
    },
    removeFromCart: (id) => {
        const url = `/cart/${id}`;
        return axiosClient.delete(url);
    },
};

export default CartApi;
