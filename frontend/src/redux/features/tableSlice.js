import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} }; // initial state

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setTable: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTable } = tableSlice.actions;

export default tableSlice.reducer;
