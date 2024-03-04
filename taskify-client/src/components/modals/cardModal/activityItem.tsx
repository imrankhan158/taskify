import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/utils/generate-log-message";
import React from "react";

const ActivityItem = ({ data }) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
