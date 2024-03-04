import React from "react";
import BoardTitleForm from "./BoardTitleForm";
import BoardOptions from "./BoardOptions";

const BoardHeader = () => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm />
      {/* <div className="ml-auto">
        <BoardOptions />
      </div> */}
    </div>
  );
};

export default BoardHeader;
