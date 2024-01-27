import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
};

const slice = createSlice({
    name: "auth",
    reducers: {},
    initialState
});

export default slice.reducer;