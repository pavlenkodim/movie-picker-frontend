import "next-auth";
import "next-auth/jwt";

interface Role {
  id: number;
  value: string;
  description: string;
  UserRoles: {
    id: number;
    roleId: number;
    userId: number;
  };
}

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    banned: boolean;
    banReason: string | null;
    roles: Role[];
    token: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      banned: boolean;
      banReason: string | null;
      roles: Role[];
    };
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    banned: boolean;
    banReason: string | null;
    roles: Role[];
    token: string;
  }
}
