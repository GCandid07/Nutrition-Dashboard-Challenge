export type UserRole = "ADMIN" | "NUTRITIONIST" | "STUDENT";

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  access_token: string;
  refresh_token: string;
}
