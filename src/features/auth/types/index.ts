import type { ApiResponseBase } from "@/types";

export type LoginFormType = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  confirmed: boolean;
  created_at: string;
};

export type HTTPLoginResponse = ApiResponseBase<{
  token: string;
  user: UserLoginResponse;
}>;
