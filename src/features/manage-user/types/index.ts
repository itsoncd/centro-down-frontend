import type { Role } from "@/types";

export interface HTTPResponseUsers {
    status_code: number;
    message:     string;
    data:        Datum[];
}

export interface HTTPResponseUser {
    status_code: number;
    message:     string;
    data:        Datum;
}

export interface Datum {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    confirmed:         boolean;
    isActive:          boolean;
    isVerified:        boolean;
    roles?: Role[];
    created_at:        Date;
    updated_at:        Date;
}
export interface CreateUserFormType {
    name:                  string;
    email:                 string;
    password:              string;
    password_confirmation: string;
    roles:                 number[];
}

export interface UpdateUserFormType {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  roles: number[];
}

