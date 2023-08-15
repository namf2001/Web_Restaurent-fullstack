import { Navbar, Sidebar, Pay } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtlis";
import { setUser } from "../redux/features/userSlice";
import Loading from "../components/Loading";
import { USER_MENU } from "../assets/data";

const LayoutUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            console.log(user);
            if (!user) {
                navigate("/");
            } else if (user.role === "admin") {
                dispatch(setUser(user));
                setLoading(false);
                navigate("/admin");
            } else {
                dispatch(setUser(user));
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    return loading ? (
        <Loading />
    ) : (
        <div>
            <div className="relative dark:bg-main-dark-bg bg-base/dark-bg-1-18">
                <Sidebar links={USER_MENU} />
                <div className="ml-[100px] fixed dark:bg-main-dark-bg w-[calc(100vw-100px)] text-white flex min-h-[100vh] justify-between">
                    <div className="flex-1">
                        <Navbar />
                        <Outlet />
                    </div>
                    <Pay />
                </div>
            </div>
        </div>
    );
};

export default LayoutUser;
