import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import foodItemReducer from "./features/foodItemSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        foodItem: foodItemReducer,
    },
});