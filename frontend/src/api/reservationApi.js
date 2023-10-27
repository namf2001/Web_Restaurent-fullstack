import axiosClient from "./axiosClient";

const reservationApi = {
    createReservation: (data) => {
        const url = `/reservations`;
        return axiosClient.post(url, data);
    },
    getOne: (id) => {
        const url = `/reservations/${id}`;
        return axiosClient.get(url);
    },  
    getAll: (params) => {
        const url = "/reservations";
        return axiosClient.get(url, { params });
    },
    update: (id, data) => {
        const url = `/reservations/${id}`;
        return axiosClient.patch(url, data);
    },
    delete: (id) => {
        const url = `/reservations/${id}`;
        return axiosClient.delete(url);
    },
}

export default reservationApi;