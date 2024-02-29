import { OrgState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrgState = {
    org: null,
    activeWorkspace: null,
    isLoading: false
}

const orgSlice = createSlice({
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

export const { updateIsLoading, setOrgData, createNewWorkspace, createNewBoard, updateActiveWorkspace } = orgSlice.actions;

export default orgSlice.reducer;