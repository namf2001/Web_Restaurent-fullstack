import axiosClient from "./axiosClient";

const PaymentApi = {
  confirmPayment: () => {
    const url = `/payment/`;
    return axiosClient.get(url);
  },

  createPayment: (data) => {
    const url = `/payment/confirm`;
    return axiosClient.post(url, data);
  },
};

export default PaymentApi;