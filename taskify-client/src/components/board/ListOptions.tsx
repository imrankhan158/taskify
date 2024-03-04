import React from "react";
import { Button } from "../ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Separator } from "@radix-ui/react-select";

const ListOptions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
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
          onClick={() => {}}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form>
          <input hidden name="id" id="id" />
          <input hidden name="boardId" id="boardId" />
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </Button>
        </form>
        <Separator />
        <form>
          <input hidden name="id" id="id" />
          <input hidden name="boardId" id="boardId" />
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
