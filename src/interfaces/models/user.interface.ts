export interface User {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar?: string;
  role:       string;
  is_active:  boolean;
  url:        string;
}


export interface AssignedUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}
