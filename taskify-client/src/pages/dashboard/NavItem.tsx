import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavItemProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { UpdateActiveWorkspace } from "@/redux/slices/organization";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const NavItem = ({
  isExpanded,
  isActive,
  workspace,
  onExpand,
}: NavItemProps) => {
  const { workspaceId } = workspace;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization?workspaceId=${workspaceId}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/activity?workspaceId=${workspaceId}`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/settings?workspaceId=${workspaceId}`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/billing?workspaceId=${workspaceId}`,
    },
  ];

  const onClick = (href: string) => {
    dispatch(UpdateActiveWorkspace(workspace));
    navigate(href);
  };
  return (
    <AccordionItem value={workspace.workspaceId} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(workspace.workspaceId)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <img
              src={workspace.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{workspace.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1"
              //   pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;
