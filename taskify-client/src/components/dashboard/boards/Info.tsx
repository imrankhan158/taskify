import React from "react";
import { CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/interfaces";

const Info = () => {
  const workspace = useSelector(
    (state: RootState) => state.org.activeWorkspace
  );
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <img
          src={workspace?.imageUrl}
          alt="Organization"
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{workspace?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {workspace?.isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export default Info;
