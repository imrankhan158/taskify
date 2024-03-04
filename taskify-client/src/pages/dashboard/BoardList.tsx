import { Board, RootState } from "@/interfaces";
import { updateActiveBoardAction } from "@/redux/actions/orgActions";
import { User2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BoardList = () => {
  const workspace = useSelector(
    (state: RootState) => state.org.activeWorkspace
  );
  const dispatch = useDispatch();
  const updateActiveBoard = (board: Board) => {
    dispatch(updateActiveBoardAction(board));
  };
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {workspace?.boards?.map((board: Board) => (
          <Link
            key={board?._id}
            to={`/board?boardId=${board?._id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageUrl})` }}
            onClick={() => updateActiveBoard(board)}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
