//?? Types form
export type LoginFormType = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  confirmed: boolean;
  created_at: string;
};

export type HTTPLoginError = {
  error: string;
};
