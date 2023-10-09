/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LayoutBasic, LayoutUser, LayoutAdmin } from "./layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Home,
    Discount,
    Dashboard,
    Notification,
    Customer,
    Login,
    Order,
    Setting,
    Product,
    Success,
} from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import foodItemApi from "./api/foodItemApi";
import { setFoodItem } from "./redux/features/foodItemSlice";
import { setCategory } from "./redux/features/categorySlice";
import CategoryApi from "./api/categoryApi";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getFoodItems = async () => {
            try {
                const res = await foodItemApi.getAll();
                dispatch(setFoodItem(res));
            } catch (error) {
                console.log(error);
            }
        };
        const getCategory = async () => {
            try {
                const res = await CategoryApi.getAll();
                dispatch(setCategory(res));
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
        getFoodItems();
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutBasic />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/discount" element={<Discount />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/product/:id" element={<Product />} />
                    </Route>
                    <Route path="/user" element={<LayoutUser />}>
                        <Route path="/user/" element={<Home />} />
                        <Route path="/user/discount" element={<Discount />} />
                        <Route path="/user/dashboard" element={<Dashboard />} />
                        <Route path="/user/order" element={<Order />} />
                        <Route path="/user/customer" element={<Customer />} />
                        <Route path="/user/product/:id" element={<Product />} />
                    </Route>
                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route path="/admin/" element={<Home />} />
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/admin/notification"
                            element={<Notification />}
                        />
                        <Route path="/admin/order" element={<Order />} />
                        <Route path="/admin/setting" element={<Setting />} />
                        <Route
                            path="/admin/product/:id"
                            element={<Product />}
                        />
                    </Route>
                    <Route path="/success" element={<Success />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
