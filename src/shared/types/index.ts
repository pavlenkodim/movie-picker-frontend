export type RoleValue = "ADMIN" | "USER";

export interface AuthResponce {
  token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  banned: boolean;
  banReason: string | null;
  roles: Role[];
}

interface UserRoles {
  id: number;
  roleId: number;
  userId: number;
}

export interface Role {
  id: number;
  value: RoleValue;
  description: string;
  createdAt: string;
  updatedAt: string;
  UserRoles: UserRoles;
}
