import { OrgState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrgState = {
    org: null,
    activeWorkspace: null,
    isLoading: false,
    activeBoard: null,
    modalData: { cardModal: null }
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
        },
        updateActiveBoard: (state, action) => {
            state.activeBoard = action.payload.board || {};
        },
        updateTask: (state, action) => {
            if (state.activeBoard) {
                state.activeBoard.cardList = state.activeBoard.cardList.map(card => {
                    card.tasks = card.tasks.map(task => {
                        if (task._id === action.payload.task._id) {
                            return { ...action.payload.task };
                        }
                        return task;
                    });
                    return card;
                });
                if (state.modalData.cardModal) {
                    state.modalData.cardModal.task = { ...state.modalData.cardModal?.task, ...action.payload.task }
                }
            }
        },
        deleteTask: (state, action) => {
            if (state.activeBoard) {
                state.activeBoard.cardList = state.activeBoard.cardList.map(card => {
                    card.tasks = card.tasks.filter(task => task._id !== action.payload.taskId);
                    return card;
                });
            }
        },
        updateModalCardModal: (state, action) => {
            state.modalData.cardModal = {
                ...action.payload.cardModal
            };
        }
    }
})

export const { updateIsLoading, setOrgData, createNewWorkspace, createNewBoard, updateActiveWorkspace, updateActiveBoard, updateModalCardModal, deleteTask, updateTask } = orgSlice.actions;

export default orgSlice.reducer;