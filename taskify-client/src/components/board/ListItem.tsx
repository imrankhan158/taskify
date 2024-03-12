import React from "react";
import ListHeader from "./ListHeader";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import { Card, Task } from "@/interfaces";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  card: Card;
  index: number;
}

const ListItem = ({ card, index }: ListItemProps) => {
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <li
          className="shrink-0 h-full w-[272px] select-none list-none"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2 gap-2 px-2 flex flex-col"
            {...provided.dragHandleProps}
          >
            <ListHeader card={card} />
            <Droppable droppableId={card._id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full rounded-md bg-[#f1f2f4] pb-2 gap-2 px-2 flex flex-col"
                >
                  {card?.tasks?.map((task: Task, index) => (
                    <CardItem
                      card={card}
                      task={task}
                      key={task._id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm card={card} />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
