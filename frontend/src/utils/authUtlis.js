import authApi from "../api/authApi";

const authUtils = {
    isAuthenticated: async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await authApi.verifyToken();
            return res;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

export default authUtils;