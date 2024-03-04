import React, { ElementRef, useRef, useState } from "react";
import ListOptions from "./ListOptions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/interfaces";
import { updateActiveBoardAction } from "@/redux/actions/orgActions";

const ListHeader = ({ card }) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(card?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const activeBoard = useSelector((state: RootState) => state.org.activeBoard);
  const dispatch = useDispatch();
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTitle(inputRef.current?.value || title);
    const newBoard = { ...activeBoard };

    newBoard.cardList = activeBoard.cardList.map((item) => {
      if (item._id == card._id) {
        return { ...item, name: inputRef.current?.value || "" };
      }
      return item;
    });
    if (newBoard) {
      dispatch(updateActiveBoardAction(newBoard));
    }
    disableEditing();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-[2px]" onSubmit={onSubmit} ref={formRef}>
          <input
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            placeholder="Enter list title.."
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {card.name}
        </div>
      )}
      <ListOptions />
    </div>
  );
};

export default ListHeader;
