import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] }; // initial state

export const foodItemSlice = createSlice({
    name: "foodItem",
    initialState,
    reducers: {
        setFoodItem: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setFoodItem } = foodItemSlice.actions;

export default foodItemSlice.reducer;
