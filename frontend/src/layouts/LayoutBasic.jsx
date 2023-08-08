import PropTypes from "prop-types";
import { Navbar, Sidebar, Pay } from "../components";

const LayoutBasic = ({ children }) => {
    return (
        <div>
            <div className="relative dark:bg-main-dark-bg bg-base/dark-bg-1-18">
                <Sidebar />
                <div className="ml-[100px] fixed dark:bg-main-dark-bg w-[calc(100vw-100px)] text-white flex min-h-[100vh] justify-between">
                    <div className="flex-1">
                        <Navbar />
                        {children}
                    </div>
                    <Pay />
                </div>
            </div>
        </div>
    );
};

LayoutBasic.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutBasic;
