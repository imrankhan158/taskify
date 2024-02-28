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
import { CreateNewWorkspace } from "@/redux/slices/organization";
import { useDispatch, useSelector } from "react-redux";
import { CreateWorkspaceModel } from "@/interfaces";

const CreateWorkspace = ({ setShowCreateWDialog }) => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.org.org);
  const WorkSpaceSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    plan: yup.string(),
    imageUrl: yup.string(),
    orgId: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(WorkSpaceSchema),
    defaultValues: {
      name: "",
      plan: "Free",
      imageUrl: "https://github.com/shadcn.png",
      orgId: organization?._id,
    },
  });

  const onSubmit = async (data: CreateWorkspaceModel) => {
    data.orgId = organization?._id;
    dispatch(CreateNewWorkspace(data));
    setShowCreateWDialog(false);
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create workspace</DialogTitle>
        <DialogDescription>
          Add a new workspace to manage boards and team.
        </DialogDescription>
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

export default CreateWorkspace;
