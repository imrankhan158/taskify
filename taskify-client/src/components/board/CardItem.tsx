import React from "react";
import { useDispatch } from "react-redux";
import { Card, Task } from "@/interfaces";
import { updateModalCardModalAction } from "@/redux/actions/orgActions";

interface CardItemProps {
  card: Card;
  task: Task;
}

const CardItem = ({ card, task }: CardItemProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      updateModalCardModalAction({
        isOpen: true,
        id: task._id,
        task,
        cardName: card.name,
        cardId: card._id,
      })
    );
  };
  return (
    <>
      <div
        role="button"
        onClick={handleClick}
        className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
      >
        {task.name}
      </div>
    </>
  );
};

export default CardItem;
