import axiosInstance from "@/utils/axios";
import { Board, CreateWorkspaceModel, Task, Workspace } from "@/interfaces";
import { updateIsLoading, setOrgData, createNewWorkspace, createNewBoard, updateActiveWorkspace, updateActiveBoard, updateModalCardModal, deleteTask, updateTask, updateTaskOrder } from "../slices/organization";
import { Dispatch } from "redux";

export const fetchOrganizationAction = () => async (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));

    try {
        const response = await axiosInstance.get("/organization");
        const organization = response.data?.organization;
        dispatch(setOrgData({ organization }));
    } catch (error) {
        console.error("Error fetching organization:", error);
    } finally {
        dispatch(updateIsLoading({ isLoading: false }));
    }
};

export const createNewWorkspaceAction = (formValues: CreateWorkspaceModel) => async (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));

    try {
        const response = await axiosInstance.post("/organization/workspace", { ...formValues });
        const workspace = response.data?.createdWorkspace;
        dispatch(createNewWorkspace({ workspace }));
    } catch (error) {
        console.error("Error creating new workspace:", error);
    } finally {
        dispatch(updateIsLoading({ isLoading: false }));
    }
};

export const createNewBoardAction = (formValues: CreateWorkspaceModel) => async (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));

    try {
        const response = await axiosInstance.post("/organization/board", { ...formValues });
        const board = response.data?.createdBoard;
        dispatch(createNewBoard({ board }));
    } catch (error) {
        console.error("Error creating new board:", error);
    } finally {
        dispatch(updateIsLoading({ isLoading: false }));
    }
};

export const updateActiveWorkspaceAction = (workspace: Workspace) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(updateActiveWorkspace({ workspace }));
    dispatch(updateIsLoading({ isLoading: false }));
};

export const updateActiveBoardAction = (board: Board) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(updateActiveBoard({ board }));
    dispatch(updateIsLoading({ isLoading: false }));
};

export const updateModalCardModalAction = (cardModal) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(updateModalCardModal({ cardModal }));
    dispatch(updateIsLoading({ isLoading: false }));
}

export const updateTaskAction = (task: Task) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(updateTask({ task }));
    dispatch(updateIsLoading({ isLoading: false }));
}

export const deleteTaskAction = (taskId: string) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(deleteTask({ taskId }));
    dispatch(updateIsLoading({ isLoading: false }));
}

export const updateTaskOrderAction = (data) => (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));
    dispatch(updateTaskOrder({ ...data }));
    dispatch(updateIsLoading({ isLoading: false }));
}