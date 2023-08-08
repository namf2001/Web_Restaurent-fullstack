import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    },
    signup: (data) => {
        const url = "/auth/signup";
        return axiosClient.post(url, data);
    },
    verifyToken: () => {
        const url = "/auth/verify-token";
        return axiosClient.post(url);
    },
};

export default authApi;
