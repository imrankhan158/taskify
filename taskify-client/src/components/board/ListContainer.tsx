import React from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import { useSelector } from "react-redux";
import { RootState } from "@/interfaces";

const ListContainer = () => {
  const activeBoard = useSelector((state: RootState) => state.org.activeBoard);
  return (
    <div className="flex m-6 gap-6">
      {activeBoard?.cardList?.map((item) => (
        <ListItem card={item} key={item._id} />
      ))}
      <ListForm />
    </div>
  );
};

export default ListContainer;
