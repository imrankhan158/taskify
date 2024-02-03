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

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}


export type { UserModel, Organization, NavItemProps }