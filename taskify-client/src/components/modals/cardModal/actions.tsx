import React from "react";
import { Button } from "@/components/ui/button";
import { CardModal } from "@/interfaces";
import {
  deleteTaskAction,
  updateModalCardModalAction,
} from "@/redux/actions/orgActions";
import { Copy, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

interface ActionsProps {
  data: CardModal | undefined;
}

const Actions = ({ data }: ActionsProps) => {
  const dispatch = useDispatch();
  const onCopy = () => {
    console.log("onCopy");
  };

  const task = data?.task;

  const onDelete = () => {
    dispatch(deleteTaskAction(task?._id));
    dispatch(
      updateModalCardModalAction({ isOpen: false, id: undefined, task: null })
    );
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      {/* <Button
        onClick={onCopy}
        className="w-full justify-start bg-neutral-200 text-sm font-medium text-neutral-700 hover:text-white"
        size="sm"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button> */}
      <Button
        onClick={onDelete}
        className="w-full justify-start bg-neutral-200 text-sm font-medium text-neutral-700 hover:text-white"
        size="sm"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default Actions;
