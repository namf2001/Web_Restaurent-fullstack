import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import foodItemReducer from "./features/foodItemSlice";
import categoryReducer from "./features/categorySlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        foodItem: foodItemReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});