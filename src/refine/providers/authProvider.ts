import type { AuthProvider } from "@refinedev/core";
import { httpApi } from "../api/httpApi";


export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await httpApi.post("/auth-token/", {
        username: email,
        password,
      });

      const token = response.data?.token;

      if (!token) {
        return {
          success: false,
          error: {
            name: "AuthError",
            message: "Token no recibido desde el backend",
          },
        };
      }

      localStorage.setItem(TOKEN_KEY, token);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error : any) {
      return {
        success: false,
        error: {
          name: error?.name ?? "LoginError",
          message:
            error?.response?.data?.detail ??
            "Usuario o contraseña incorrectos",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
   getPermissions: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        try {
            const res = await httpApi.get("/users/me/");
            const user = res.data;

            // Construimos permisos
            const permissions = [];

            if (user.role) permissions.push(user.role);            
            if (user.role === "ROLE_ADMIN") permissions.push("admin");
            if (user.is_superuser) permissions.push("superuser");

            localStorage.setItem("permissions", JSON.stringify(permissions));

            return permissions;

        } catch {
            return null;
        }
    },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return null;

    try {
   
      const res = await httpApi.get("/users/me/");

          // Guardar permisos en localStorage
      const roles = [];
      if (res.data.is_superuser) roles.push("superadmin");
      if (res.data.role) roles.push(res.data.role);
      if (res.data.role  === "ROLE_ADMIN") roles.push("admin");

      localStorage.setItem("permissions", JSON.stringify(roles));

      return {
        id: res.data.id,
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        is_active: res.data.is_active,
        role: res.data.role,
        is_superuser: res.data.is_superuser        
      };
    } catch {
      return null;
    }
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
};
