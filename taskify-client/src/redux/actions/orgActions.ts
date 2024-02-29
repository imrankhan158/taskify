import axiosInstance from "@/utils/axios";
import { CreateWorkspaceModel, Workspace } from "@/interfaces";
import { updateIsLoading, setOrgData, createNewWorkspace, createNewBoard, updateActiveWorkspace } from "../slices/organization";
import { Dispatch } from "redux";

export const fetchOrganizationAction = () => async (dispatch: Dispatch<any>) => {
    dispatch(updateIsLoading({ isLoading: true }));

    try {
        const response = await axiosInstance.get("/organization");
        const organization = response.data?.organization;
        dispatch(setOrgData({ organization }));
        console.log(response.data);
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
        console.log(response);
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
        console.log(response.data.createdBoard);
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
