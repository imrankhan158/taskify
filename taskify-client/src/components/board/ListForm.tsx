import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/interfaces";
import { updateActiveBoardAction } from "@/redux/actions/orgActions";

const ListForm = () => {
  const activeBoard = useSelector((state: RootState) => state.org?.activeBoard);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
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
    if (activeBoard) {
      let cardList = activeBoard.cardList || [];
      cardList = [
        ...cardList,
        {
          name: inputRef.current?.value || "",
          _id: "RadomString" + Math.random(),
          tasks: [],
        },
      ];
      dispatch(updateActiveBoardAction({ ...activeBoard, cardList }));
    }

    disableEditing();
  };
  if (isEditing) {
    return (
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="w-full p-3 rounded-md bg-white space-y-4 shadow-md h-fit"
      >
        <input
          ref={inputRef}
          id="title"
          className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          placeholder="Enter list title..."
        />
        <input
          hidden
          value={activeBoard?._id}
          onChange={() => {}}
          name="boardId"
        />
        <div className="flex items-center gap-x-1">
          <Button type="submit">Add list</Button>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={enableEditing}
      className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm h-fit bg-[#f1f2f4] shadow-md pb-2 min-w-[272px]"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add a list
    </button>
  );
};

export default ListForm;
