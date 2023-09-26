/** @format */

import { useState } from "react"; 
import SettingOption from "./components/SettingOption";
import { SettingOption as options } from "../../assets/data/index";
import {
    AboutUs,
    ProductsManagement,
    Order,
    Notifications,
    Security,
    CategoriesManagement,
} from "./components/optionComponents";

const Setting = () => {
    const [optionComponent, setOptionComponent] = useState(
        options[0].component
    );

    const handleOption = (component) => {
        setOptionComponent(component);
    };

    // Define the component based on the optionComponent value
    let componentToRender;
    if (optionComponent === "AboutUs") {
        componentToRender = <AboutUs />;
    } else if (optionComponent === "ProductsManagement") {
        componentToRender = <ProductsManagement />;
    } else if (optionComponent === "Order") {
        componentToRender = <Order />;
    } else if (optionComponent === "Notifications") {
        componentToRender = <Notifications />;
    } else if (optionComponent === "Security") {
        componentToRender = <Security />;
    } else if (optionComponent === "CategoriesManagement") {
        componentToRender = <CategoriesManagement />;
    }

    return (
        <>
            <div className="flex w-[calc(100%-3rem)] mx-auto gap-6">
                <SettingOption
                    handleOption={(component) => handleOption(component)}
                    optionComponent={optionComponent}
                />

                {componentToRender}
            </div>
        </>
    );
};

export default Setting;
