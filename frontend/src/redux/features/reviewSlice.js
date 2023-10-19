import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} }; // initial state

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        setReview: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setReview } = reviewSlice.actions;

export default reviewSlice.reducer;
