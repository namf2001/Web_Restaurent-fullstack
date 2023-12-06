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
    Reservation,
    Contact,
    Main,
    Calender,
    DeskManager,
} from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import foodItemApi from "./api/foodItemApi";
import { setFoodItem } from "./redux/features/foodItemSlice";
import { setCategory } from "./redux/features/categorySlice";
import CategoryApi from "./api/categoryApi";
 // You can also use <link> for styles


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
        // dark mode 
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutBasic />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/main" element={<Main />} index/>
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/discount" element={<Discount />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/reservation" element={<Reservation />} />
                    </Route>
                    <Route path="/" element={<LayoutUser />}>
                        <Route path="/user/" element={<Home />} />
                        <Route path="/user/main" element={<Main />} index />
                        <Route path="/user/contact" element={<Contact />} />
                        <Route path="/user/discount" element={<Discount />} />
                        <Route path="/user/dashboard" element={<Dashboard />} />
                        <Route path="/user/order" element={<Order />} />
                        <Route path="/user/customer" element={<Customer />} />
                        <Route path="/user/product/:id" element={<Product />} />
                        <Route
                            path="/user/reservation"
                            element={<Reservation />}
                        />
                    </Route>
                    <Route path="/" element={<LayoutAdmin />}>
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
                        <Route
                            path="/admin/calender"
                            element={<Calender />}
                        />
                        <Route
                            path="/admin/deskmanager"
                            element={<DeskManager />}
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
        </main>
    );
}

export default App;
