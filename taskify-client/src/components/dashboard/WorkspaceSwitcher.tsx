import * as React from "react";
import { CheckIcon, ChevronsUpDown, PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import CreateWorkspace from "./CreateWorkspace";
import { updateActiveWorkspaceAction } from "@/redux/actions/orgActions";
import { RootState, Workspace } from "@/interfaces";
import { useSearchParams } from "react-router-dom";

export default function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [showCreateWDialog, setShowCreateWDialog] = React.useState(false);
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const { org } = useSelector((state: RootState) => state.org);
  const group = {
    name: "Manage Workspaces",
    workspaces: [{}] as Workspace[],
  };
  if (org?.workspaces) {
    group.workspaces = org?.workspaces.map((workspace: any) => {
      return {
        name: workspace.name,
        imageUrl: workspace.avatar.url,
        workspaceId: workspace._id,
        boards: workspace.boards,
        isPro: false,
      };
    });
  }
  const activeWorkspace = workspaceId
    ? group.workspaces.find((item) => {
        return workspaceId ? item.workspaceId === workspaceId : true;
      })
    : group.workspaces[0];
  const [selectedTeam, setSelectedTeam] = React.useState<Workspace>(
    activeWorkspace as Workspace
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateActiveWorkspaceAction(selectedTeam));
  }, [selectedTeam]);

  return (
    <Dialog open={showCreateWDialog} onOpenChange={setShowCreateWDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a workspace"
            className={cn("w-[200px] justify-between", "className")}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={selectedTeam?.imageUrl}
                alt={selectedTeam?.name}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam?.name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search workspace..." />
              <CommandEmpty>No workspace found.</CommandEmpty>
              <CommandGroup key={group.name} heading={group.name}>
                {group.workspaces.map((workspace: Workspace) => (
                  <CommandItem
                    key={workspace.workspaceId}
                    onSelect={() => {
                      setSelectedTeam(workspace);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={workspace.imageUrl}
                        alt={workspace.name}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {workspace.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam?.workspaceId === workspace.workspaceId
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowCreateWDialog(true);
                    }}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Create Workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateWorkspace setShowCreateWDialog={setShowCreateWDialog} />
    </Dialog>
  );
}
