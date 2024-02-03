import Header from "@/components/landing/Header";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import NavItem from "./NavItem";
import { Organization } from "@/interfaces";
import { useState } from "react";

const OrganizationLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { orgId } = useParams();
  console.log("orgId" + orgId);
  const [expanded, setExpanded] = useState<Map<string, boolean>>(new Map());

  const userMemberships: Array<Organization> = [
    {
      id: "dbfc4157-3513-4dcd-a959-f02ef89ecf9f",
      slug: "workspaces",
      name: "my workspace",
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      id: "54c7baa6-943a-4cf3-959a-e21f0f66b5eb",
      slug: "workspaces",
      name: "Sec workspace",
      imageUrl: "https://github.com/shadcn.png",
    },
  ];

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

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div>
      <Header isUserLoggedIn={true} />
      <div className="flex mt-24 mx-12">
        {/* Sidebar */}
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
            {userMemberships.map((organization) => (
              <NavItem
                key={organization.id}
                isActive={false}
                isExpanded={false}
                organization={organization as Organization}
                onExpand={onExpand}
              />
            ))}
          </Accordion>
        </div>
        <div className="flex bg-black w-full h-full"></div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
