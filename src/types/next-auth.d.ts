import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "CUSTOMER" | "ADMIN";
      isBlocked: boolean;
    };
  }

  interface User {
    role: "CUSTOMER" | "ADMIN";
    isBlocked: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "CUSTOMER" | "ADMIN";
    isBlocked: boolean;
  }
}
