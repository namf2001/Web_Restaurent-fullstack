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
    getUser: () => {
        const url = "/auth/user";
        return axiosClient.get(url);
    },
    updateUser: (param,data) => {
        const url = `/auth/user/${param}`;
        return axiosClient.put(url, data);
    },
    verifyToken: () => {
        const url = "/auth/verify-token";
        return axiosClient.post(url);
    },
};

export default authApi;
