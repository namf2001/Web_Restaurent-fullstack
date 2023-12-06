/** @format */

import { CartProvider } from "../context/cartContext";
import ConfirmationOrder from "../components/ConfirmationOrder/ConfirmationOrder";
import { Navbar, Sidebar, Pay } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtlis";
import { setUser } from "../redux/features/userSlice";
import Loading from "../components/Loading";
import { USER_MENU } from "../assets/data";
import CartApi from "../api/cartApi";
import { setCart } from "../redux/features/cartSlice";

const LayoutUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigate("/");
            } else if (user.role === "admin") {
                dispatch(setUser(user));
                setLoading(false);
                navigate("/admin/");
            } else {
                dispatch(setUser(user));
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch, navigate]);


    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await CartApi.getCart();
                dispatch(setCart(data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchCart();
    }, [dispatch]);

    return loading ? (
        <Loading />
    ) : (
        <div>
                <div className="relative dark:bg-light-bg bg-base/dark-bg-1-18">
                <Sidebar links={USER_MENU} />
                    <div className="ml-[100px] fixed dark:bg-light-bg w-[calc(100vw-100px)] text-white dark:text-dark flex min-h-[100vh] justify-between">
                    <div className="flex-1 w-800">
                        <Navbar />
                        <Outlet />
                    </div>
                    <CartProvider>
                        <Pay />
                        <ConfirmationOrder />
                    </CartProvider>
                </div>
            </div>
        </div>
    );
};

export default LayoutUser;
