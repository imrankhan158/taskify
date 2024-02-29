interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Organization {
  _id: string;
  slug: string;
  imageUrl: string;
  name: string;
  workspaces: Workspace[];
}

interface Board {
  _id: string;
  workspaceId: string;
  imageUrl: string;
  name: string;
}

interface Workspace {
  _id: string;
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

interface CreateWorkspaceModel {
  name: string;
  plan: string;
  imageUrl: string;
  orgId: string;
}

interface CreateBoardModel {
  name: string;
  imageUrl: string;
  workspaceId: string;
}

interface AuthState {
  isLoggedIn: boolean,
  user: null,
  isLoading: boolean,
  token: null
}

interface OrgState {
  org: Organization | null;
  activeWorkspace: Workspace | null;
  isLoading: boolean;
}

interface RootState {
  auth: AuthState;
  org: OrgState;
}

export type { UserModel, Organization, NavItemProps, Workspace, Board, CreateWorkspaceModel, CreateBoardModel, OrgState, RootState }