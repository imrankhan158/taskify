import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Board } from "@/interfaces";
import { useSelector } from "react-redux";

const BoardTitleForm = () => {
  const activeBoard = useSelector((state) => state.org?.activeBoard);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(activeBoard?.name || "");
  const [isEditing, setIsEditing] = useState(false);

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
    disableEditing();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <input
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2 bg-transparent hover:bg-transparent"
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
