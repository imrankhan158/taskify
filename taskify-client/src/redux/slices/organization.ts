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
        },
        updateTaskOrder: (state, action) => {
            const { source: src, destination: dist, type } = action.payload;
            const destinationIndex = dist.index > src.index && src.droppableId === dist.droppableId ? dist.index - 1 : dist.index;
            let task = {};
            switch (type) {
                case "card":
                    state.activeBoard.cardList = state.activeBoard.cardList.map(card => {
                        if (card._id === src.droppableId) {
                            task = card.tasks[src.index];
                            card.tasks.splice(src.index, 1);
                        }
                        return card;
                    });
                    state.activeBoard.cardList = state.activeBoard.cardList.map(card => {
                        if (card._id === dist.droppableId) {
                            card.tasks.splice(destinationIndex, 0, task);
                        }
                        return card;
                    });
                    break;
                case "list":
                    state.activeBoard.cardList[dist.index] = state.activeBoard.cardList.splice(src.index, 1, state.activeBoard.cardList[dist.index])[0];
                    break;
                default:
                    break;
            }

        },
    }
})

export const { updateIsLoading, setOrgData, createNewWorkspace, createNewBoard, updateActiveWorkspace, updateActiveBoard, updateModalCardModal, deleteTask, updateTask, updateTaskOrder } = orgSlice.actions;

export default orgSlice.reducer;