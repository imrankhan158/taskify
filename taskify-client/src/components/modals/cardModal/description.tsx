import { Button } from "@/components/ui/button";
import { Task } from "@/interfaces";
import { updateTaskAction } from "@/redux/actions/orgActions";
import { AlignLeft } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface DescriptionProps {
  task: Task | undefined;
}

const Description = ({ task }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    disableEditing();
    if (event.target.elements.description.value == "") return;
    dispatch(
      updateTaskAction({
        ...task,
        description: event.target.elements.description.value,
      })
    );
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form onSubmit={onSubmit} ref={formRef} className="space-y-2">
            <textarea
              id="description"
              className="w-full mt-2, p-2"
              placeholder="Add a more detailed description"
              defaultValue={task?.description || undefined}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[82px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {task?.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
