import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { createNewBoardAction } from "@/redux/actions/orgActions";
import { useDispatch, useSelector } from "react-redux";
import { CreateBoardModel, RootState } from "@/interfaces";

const CreateBoard = ({ setShowCreateWDialog }) => {
  const dispatch = useDispatch();
  const workspace = useSelector(
    (state: RootState) => state.org.activeWorkspace
  );
  const BoardSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    imageUrl: yup.string(),
    workspaceId: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(BoardSchema),
    defaultValues: {
      name: "",
      imageUrl: "https://github.com/shadcn.png",
      workspaceId: workspace?.workspaceId,
    },
  });

  const onSubmit = async (data: CreateBoardModel) => {
    data.workspaceId = workspace?.workspaceId;
    dispatch(createNewBoardAction(data));
    setShowCreateWDialog(false);
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Board</DialogTitle>
        <DialogDescription>Add a new boards to manage team.</DialogDescription>
      </DialogHeader>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 py-2 pb-4">
          <div className="flex flex-col md:items-center gap-4 sm:gap-6 justify-between sm:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Acme Inc."
                {...methods.register("name", {
                  required: "Name is required",
                })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCreateWDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateBoard;
