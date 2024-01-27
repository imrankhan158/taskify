import { configureStore } from "@reduxjs/toolkit";
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from "react-redux";

import authReducer from "./slices/auth"

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };