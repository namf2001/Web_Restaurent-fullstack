import config from "../config/routes";

// layouts
import LayoutBasic from "../layouts/LayoutBasic";
import LayoutUser from "../layouts/LayoutUser";

// pages
import {
    Home,
    Discount,
    Dashboard,
    Customer,
    Notification,
    Profile,
    Order,
    Product,
    Category,
} from "../pages";

//public routes
const publicRoutes = [
    {
        path: config.home,
        exact: true,
        layout: LayoutBasic,
        component: Home,
        pay: true,
    },
    {
        path: config.discount,
        exact: true,
        layout: LayoutBasic,
        component: Discount,
        pay: true,
    },
];

// private routes
const privateRoutes = [
    {
        path: config.home,
        exact: true,
        layout: LayoutBasic,
        component: Home,
        pay: true,
    },
    {
        path: config.discount,
        exact: true,
        layout: LayoutBasic,
        component: Discount,
        pay: true,
    },
    {
        path: config.dashboard,
        exact: true,
        layout: LayoutUser,
        component: Dashboard,
    },
    {
        path: config.notification,
        exact: true,
        layout: LayoutUser,
        component: Notification,
        pay: true,
    },
    {
        path: config.profile,
        exact: true,
        layout: LayoutUser,
        component: Profile,
    },
    {
        path: config.order,
        exact: true,
        layout: LayoutUser,
        component: Order,
        pay: true,
    },
    {
        path: config.customer,
        exact: true,
        layout: LayoutUser,
        component: Customer,
    },
    {
        path: config.product,
        exact: true,
        layout: LayoutUser,
        component: Product,
    },
    {
        path: config.category,
        exact: true,
        layout: LayoutUser,
        component: Category,
    },
];

export { publicRoutes, privateRoutes };
