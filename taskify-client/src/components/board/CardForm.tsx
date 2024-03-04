import { Plus, X } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Task } from "@/interfaces";
import { updateActiveBoardAction } from "@/redux/actions/orgActions";

const CardForm = ({ card }) => {
  const dispatch = useDispatch();
  const activeBoard = useSelector((state: RootState) => state.org?.activeBoard);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newBoard = { ...activeBoard };
    const task: Task = {
      name: inputRef.current?.value || "Task Title",
      description: "",
      _id: "RadomString" + Math.random(),
    };

    newBoard.cardList = activeBoard.cardList.map((item) => {
      if (item._id == card._id) {
        return { ...item, tasks: [...item.tasks, task] };
      }
      return item;
    });
    if (newBoard) {
      dispatch(updateActiveBoardAction(newBoard));
    }
    disableEditing();
  };
  if (isEditing) {
    return (
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <textarea
          id="title"
          ref={inputRef}
          className="w-full"
          placeholder="Enter a title for this card..."
        />
        <input hidden id="listId" name="listId" />
        <div className="flex items-center gap-x-1">
          <Button type="submit">Add card</Button>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
};

export default CardForm;
