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
import { useDispatch } from "react-redux";

const CreateWorkspace = ({ setShowCreateWDialog }) => {
  const dispatch = useDispatch();
  const WorkSpaceSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    slug: yup.string().required("Slug is required"),
    plan: yup.string(),
    imageUrl: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(WorkSpaceSchema),
    defaultValues: {
      name: "",
      slug: "",
      plan: "Freemium",
      imageUrl: "https://github.com/shadcn.png",
    },
  });

  const onSubmit = async (data: unknown) => {
    console.log(data);
    dispatch(CreateNewWorkspace(data));
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
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                type="text"
                placeholder="acme-inc"
                {...methods.register("slug", {
                  required: "Slug is required",
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
