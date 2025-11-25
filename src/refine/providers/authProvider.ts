import type { AuthProvider } from "@refinedev/core";
import { httpApi } from "../api/httpApi";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  // login: async ({ username, email, password }) => {
  //    if ((username || email) && password) {

  //       localStorage.setItem(TOKEN_KEY, username); 

  //       return {
  //        success: true,
  //         redirectTo: "/", 
  //       }; 
  //   } 
  //     return { 
  //       success: false,
  //        error: { 
  //         name: "LoginError",
  //          message: "Invalid username or password",
  //          }, 
  //       }; 
  //   },
  
  login: async ({ email, password }) => {
    try {
      const response = await httpApi.post(
        "/auth-token/",
        new URLSearchParams({
          username:email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

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
    } catch (error: any) {
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
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
