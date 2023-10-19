import axiosClient from "./axiosClient";

const reviewApi = {
    create: (foodItemId, data) => {
        const url = `/review/${foodItemId}`;
        return axiosClient.post(url, data);
    },
    getReviewsByProduct: (foodItemId) => {
        const url = `/review/${foodItemId}`;
        return axiosClient.get(url);
    },
    checkPurchaseStatus: (foodItemId) => {
        const url = `/review/check/${foodItemId}`;
        return axiosClient.get(url);
    }
};

export default reviewApi;
