import { CreateWorkspaceModel, OrgState, Workspace } from "@/interfaces";
import axiosInstance from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrgState = {
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
            if (state.org) {
                state.org.workspaces = [...(state.org.workspaces || []), action.payload.workspace];
            }
        },
        createNewBoard: (state, action) => {
            if (state.activeWorkspace && state.org) {
                const updatedActiveWorkspace = { ...state.activeWorkspace, boards: [...(state.activeWorkspace.boards || []), action.payload.board] };
                state.activeWorkspace = updatedActiveWorkspace;

                state.org.workspaces = state.org.workspaces.map((workspace) => {
                    if (workspace._id === action.payload.board.workspaceId) {
                        return { ...workspace, boards: [...(workspace.boards || []), action.payload.board] };
                    }
                    return workspace;
                });
            }
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


export function CreateNewWorkspace(formValues: CreateWorkspaceModel) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance.post("/organization/workspace", { ...formValues })
            .then(response => {
                console.log(response);
                const workspace = response.data?.createdWorkspace;
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

export function CreateNewBoard(formValues: CreateWorkspaceModel) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        await axiosInstance.post("/organization/board", { ...formValues })
            .then(response => {
                console.log(response.data.createdBoard);
                const board = response.data.createdBoard;
                dispatch(slice.actions.createNewBoard({ board }));
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                dispatch(slice.actions.updateIsLoading({ isLoading: false }));
            });
    };
}

export function UpdateActiveWorkspace(workspace: Workspace) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true }));
        dispatch(slice.actions.updateActiveWorkspace({ workspace }));
        dispatch(slice.actions.updateIsLoading({ isLoading: false }));
    }
}