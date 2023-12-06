import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import foodItemReducer from "./features/foodItemSlice";
import categoryReducer from "./features/categorySlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import reviewReducer from "./features/reviewSlice.js";
import tableReducer from "./features/tableSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        foodItem: foodItemReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
        review: reviewReducer,
        table: tableReducer,
    },
});