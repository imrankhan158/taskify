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

interface Task {
  _id: string;
  name: string;
  description: string;
}

interface Card {
  _id: string;
  name: string;
  tasks: Task[];
}

interface Board {
  _id: string;
  workspaceId: string;
  imageUrl: string;
  name: string;
  cardList: Card[];
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

interface CardModal {
  id?: string;
  task: Task;
  isOpen: boolean;
  card: Card;
}

interface OrgState {
  org: Organization | null;
  activeWorkspace: Workspace | null;
  isLoading: boolean;
  activeBoard: Board | null;
  modalData: { cardModal: CardModal | null }
}

interface RootState {
  auth: AuthState;
  org: OrgState;
}

interface AuditLog {
  id: string;
  action: string;
  entityTitle: string;
  entityType: string;
  userName: string;
  userImage: string;
  createdAt: Date;
}

export type { UserModel, Organization, NavItemProps, Workspace, Board, CreateWorkspaceModel, CreateBoardModel, OrgState, RootState, Card, Task, AuditLog, CardModal }