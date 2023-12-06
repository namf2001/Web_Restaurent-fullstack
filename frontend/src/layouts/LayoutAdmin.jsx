/** @format */

import { Navbar, Sidebar } from "../components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ADMIN_MENU } from "../assets/data";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtlis";
import { setUser } from "../redux/features/userSlice";
import Loading from "../components/Loading";
import tableApi from "../api/tableApi";
import { setTable } from "../redux/features/tableSlice";

const LayoutAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (user && user.role === "admin") {
                dispatch(setUser(user));
                setLoading(false);
            } else {
                setLoading(false);
                navigate("/");
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    useEffect(() => {
        const fetchDesks = async () => {
            try {
                const res = await tableApi.getAll();
                dispatch(setTable(res.tables));    
            } catch (err) {
                console.log(err);
            }
        };
        fetchDesks();
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="relative dark:bg-light-bg bg-base/dark-bg-1-18">
                <Sidebar links={ADMIN_MENU} />
                <div className="ml-[100px] fixed dark:bg-light-bg w-[calc(100vw-100px)] text-white flex min-h-[100vh] justify-between">
                    <div className="flex-1 w-800">
                        {/* neu url = admin/dashboard thi an Navbar */}
                        {location.pathname === "/admin/dashboard" ? null : (
                            <Navbar />
                        )}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LayoutAdmin;
