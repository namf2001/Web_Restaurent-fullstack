import { Navbar, Sidebar } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { ADMIN_MENU } from "../assets/data";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtlis";
import { setUser } from "../redux/features/userSlice";
import Loading from "../components/Loading";

const LayoutAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="relative dark:bg-main-dark-bg bg-base/dark-bg-1-18">
                <Sidebar links={ADMIN_MENU} />
                <div className="ml-[100px] fixed dark:bg-main-dark-bg w-[calc(100vw-100px)] text-white flex min-h-[100vh] justify-between">
                    <div className="flex-1">
                        <Navbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LayoutAdmin;