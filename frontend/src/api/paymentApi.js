import axiosClient from "./axiosClient";

const PaymentApi = {
  createCheckoutSession: (data) => {
    const url = `/payment/create-checkout-session`;
    return axiosClient.post(url, data);
  },

  createPayment: (data) => {
    const url = `/payment/webhook`;
    return axiosClient.post(url, data);
  },
};

export default PaymentApi;