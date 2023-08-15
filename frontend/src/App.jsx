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
} from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import foodItemApi from "./api/foodItemApi";
import { setFoodItem } from "./redux/features/foodItemSlice";

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
                    </Route>
                    <Route path="/user" element={<LayoutUser />}>
                        <Route path="/user/" element={<Home />} />
                        <Route path="/user/discount" element={<Discount />} />
                        <Route path="/user/dashboard" element={<Dashboard />} />
                        <Route
                            path="/user/notification"
                            element={<Notification />}
                        />
                        <Route path="/user/order" element={<Order />} />
                        <Route path="/user/customer" element={<Customer />} />
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
                        <Route path="/admin/setting" element={<Setting />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
