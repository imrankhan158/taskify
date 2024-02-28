interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Organization {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
}

interface Board {
  _id: string;
  workspaceId: string;
  imageUrl: string;
  name: string;
}

interface Workspace {
  workspaceId: string;
  imageUrl: string;
  name: string;
  isPro: boolean;
  boards: Board[];
}

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  workspace: Workspace;
  onExpand: (id: string) => void;
}


export type { UserModel, Organization, NavItemProps, Workspace, Board }