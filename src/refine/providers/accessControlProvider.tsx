import { AccessControlProvider } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ params }) => {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");   
    const requiredAuthorities = params?.resource?.meta?.authority;
    if (!requiredAuthorities || requiredAuthorities.length === 0) {
      return { can: true };
    }
    const isAllowed = requiredAuthorities.some((role: string[]) =>
      permissions.includes(role)
    );
    return { can: isAllowed };
  },

};
