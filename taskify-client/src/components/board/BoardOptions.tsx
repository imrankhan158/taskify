import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@radix-ui/react-popover";
import { MoreHorizontal, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const BoardOptions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 bg-transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-neutral-600"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
