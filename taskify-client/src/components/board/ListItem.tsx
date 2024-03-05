import React from "react";
import ListHeader from "./ListHeader";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import { Card, Task } from "@/interfaces";

interface ListItemProps {
  card: Card;
}

const ListItem = ({ card }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none list-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2 gap-2 px-2 flex flex-col">
        <ListHeader card={card} />
        {card?.tasks?.map((task: Task) => (
          <CardItem card={card} task={task} key={task._id} />
        ))}
        <CardForm card={card} />
      </div>
    </li>
  );
};

export default ListItem;
