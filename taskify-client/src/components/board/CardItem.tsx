import React from "react";
import CardModal from "../modals/cardModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/interfaces";
import { updateModalCardModalAction } from "@/redux/actions/orgActions";

const CardItem = ({ card, task }) => {
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
