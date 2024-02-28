import { Workspace } from "@/interfaces";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    org: null,
    activeWorkspace: null,
    isLoading: false
}

const slice = createSlice({
    name: "org",
    initialState,
    reducers: {
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        setOrgData: (state, action) => {
            state.org = action.payload.organization;
        },
        createNewWorkspace: (state, action) => {
            state.org.workspaces = [...state.org.workspaces, action.payload.workspace];
        },
        updateActiveWorkspace: (state, action) => {
            state.activeWorkspace = action.payload.workspace;
        }
    }
})

export default slice.reducer;


export function FetchOrganization() {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance.get("/organization")
            .then(response => {
                const organization = response.data?.organization;
                dispatch(slice.actions.setOrgData({ organization }))
                console.log(response.data);
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


export function CreateNewWorkspace(formValues: any) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance.post("/organization", { ...formValues, orgId: getState().org._id })
            .then(response => {
                const workspace = response.data?.createdWorkspace;
                console.log(response.data);
                dispatch(slice.actions.createNewWorkspace({ workspace }))
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

export function UpdateActiveWorkspace(workspace: Workspace) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        dispatch(slice.actions.updateActiveWorkspace({ workspace }));
        dispatch(slice.actions.updateIsLoading({ isLoading: false }));
    }
}