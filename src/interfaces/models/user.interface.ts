export interface User {
  id:           number;
  email:        string;
  first_name:   string;
  last_name:    string;
  role:         Role;
  is_active:    boolean;
  url:          string;
  is_superuser: boolean;
}

export interface AssignedUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}


export enum Role {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  MANAGER = "ROLE_MANAGER",
  SALES = "ROLE_SALES"
}