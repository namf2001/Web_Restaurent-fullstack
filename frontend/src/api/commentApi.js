import axiosClient from "./axiosClient";

const commentApi = {
    create: (data) => {
        const url = `/comment`;
        return axiosClient.post(url, data);
    },

};

export default commentApi;
