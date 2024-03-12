import React from "react";
import { useDispatch } from "react-redux";
import { Card, Task } from "@/interfaces";
import { updateModalCardModalAction } from "@/redux/actions/orgActions";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  card: Card;
  task: Task;
  index: number;
}

const CardItem = ({ card, task, index }: CardItemProps) => {
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
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={handleClick}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {task.name}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
