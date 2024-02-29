import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronsUpDown,
  Command,
  Plus,
  PlusCircleIcon,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { Organization, RootState, Workspace } from "@/interfaces";
import { useEffect, useState } from "react";
import { fetchOrganizationAction } from "@/redux/actions/orgActions";
import CreateWorkspace from "@/components/dashboard/CreateWorkspace";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<Map<string, boolean>>(new Map());
  const dispatch = useDispatch();
  const { org } = useSelector((state: RootState) => state.org);
  const [showCreateWDialog, setShowCreateWDialog] = React.useState(false);
  useEffect(() => {
    dispatch(fetchOrganizationAction());
  }, []);

  let userMemberships: Array<Organization> = [];
  if (org?.workspaces) {
    userMemberships = org.workspaces.map((workspace: any) => {
      return {
        name: workspace.name,
        imageUrl: workspace.avatar.url,
        id: workspace._id,
        workspaceId: workspace._id,
        boards: workspace.boards,
        isPro: false,
      };
    });
  }

  const onExpand = (id: string) => {
    const exp = expanded;
    const cur = exp.get(id);
    if (cur === true) {
      exp.set(id, false);
    } else {
      exp.set(id, true);
    }
    setExpanded(exp);
  };
  return (
    <div className="font-medium text-xs flex-[25%] justify-between items-center mb-1">
      <div>
        <Dialog open={showCreateWDialog} onOpenChange={setShowCreateWDialog}>
          <DialogTrigger className="flex justify-between items-center w-full px-4">
            <span className="pl-4">Workspaces</span>
            <Button
              asChild
              type="button"
              size="icon"
              variant="ghost"
              className="ml-auto"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <CreateWorkspace setShowCreateWDialog={setShowCreateWDialog} />
        </Dialog>
      </div>
      <Accordion type="multiple" className="space-y-2 mt-4">
        {userMemberships.map((workspace: Workspace) => (
          <NavItem
            key={workspace.workspaceId}
            isActive={false}
            isExpanded={false}
            workspace={workspace as Workspace}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default Sidebar;
