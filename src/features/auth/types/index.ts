//?? Types form
export type LoginFormType = {
  email: string;
  password: string;
};

export type HTTPLoginResponse = {
  message: string;
  token: string;
  user: userLoginReponse;
};

export type HTTPLoginError = {
  error: string;
};

export type userLoginReponse = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  confirmed: boolean;
  created_at: string;
};
