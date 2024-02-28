import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { Organization, Workspace } from "@/interfaces";
import { useEffect, useState } from "react";
import { FetchOrganization } from "@/redux/slices/organization";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<Map<string, boolean>>(new Map());
  const dispatch = useDispatch();
  const { org } = useSelector((state) => state.org);
  useEffect(() => {
    dispatch(FetchOrganization());
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
      <div className="flex justify-between items-center">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link to="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
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
