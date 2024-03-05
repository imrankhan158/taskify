import { CardModal } from "@/interfaces";
import { updateTaskAction } from "@/redux/actions/orgActions";
import { Layout } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface HeaderProps {
  data: CardModal | undefined;
}

const Header = ({ data }: HeaderProps) => {
  const task = data?.task;
  const [title, setTitle] = useState(task?.name);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
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

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateTaskAction({ ...task, name: event.target.elements.title.value })
    );
    disableEditing();
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        {isEditing ? (
          <form onSubmit={onSubmit} ref={formRef}>
            <input
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              defaultValue={title}
              className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            />
          </form>
        ) : (
          <h2 className="text-lg text-neutral-700" onClick={enableEditing}>
            {task?.name}
          </h2>
        )}
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data?.cardName}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
