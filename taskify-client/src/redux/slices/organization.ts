import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    org: null,
    workspace: null
}

const slice = createSlice({
    name: "org",
    initialState,
    reducers: {}
})

export default slice.reducer;