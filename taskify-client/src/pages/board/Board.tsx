import BoardHeader from "@/components/board/BoardHeader";
import ListContainer from "@/components/board/ListContainer";
import React from "react";

const Board = () => {
  return (
    <div className="flex flex-col">
      <BoardHeader />
      <div className="mt-16 h-full w-full">
        <ListContainer />
      </div>
    </div>
  );
};

export default Board;
