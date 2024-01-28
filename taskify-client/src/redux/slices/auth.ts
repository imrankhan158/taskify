import { UserModel } from "@/interfaces";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
    token: null
};

const slice = createSlice({
    name: "auth",
    reducers: {
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        logIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOut: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        },
    },
    initialState
});

export function RegiterUser(formValues: UserModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance
            .post("/auth/register", { ...formValues })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                dispatch(
                    slice.actions.updateIsLoading({ isLoading: false })
                );
            });
    }
}

export function LoginUser(formValues: UserModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance
            .post("/auth/login", { ...formValues })
            .then(response => {
                window.localStorage.setItem("user_id", response.data?.data?.user._id);
                dispatch(
                    slice.actions.logIn({
                        isLoggedIn: true,
                        user: response.data?.data?.user,
                        token: response.data?.data?.accessToken,
                    })
                );
                console.log(response);
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                dispatch(
                    slice.actions.updateIsLoading({ isLoading: false })
                );
            });
    }
}

export function LogoutUser() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance
            .post("/auth/logout")
            .then(response => {
                console.log(response);
                dispatch(
                    slice.actions.logOut({})
                );
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                dispatch(
                    slice.actions.updateIsLoading({ isLoading: false })
                );
            });
    }
}

export default slice.reducer;