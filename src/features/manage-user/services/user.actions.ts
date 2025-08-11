import { api } from "@/lib/axios";
import type { HTTPResponseUsers, HTTPResponseUser, CreateUserFormType, UpdateUserFormType } from "../types";

export const getAllUser = async () => {
  const { data } = await api.get<HTTPResponseUsers>('/users');
  return data;
};

export const createUser = async (user: CreateUserFormType) => {
  const { data } = await api.post<HTTPResponseUser>('/users', user);
  return data;
};

export const updateUser = async (id: number, user: UpdateUserFormType) => {
  const { data } = await api.put<HTTPResponseUser>(`/users/${id}`, user);
  return data;
};

export const desactivateUser = async (id: number) => {
  const { data } = await api.patch<HTTPResponseUser>(`/users/${id}/desactivate`);
  return data;
};

export const activateUser = async (id: number) => {
  const { data } = await api.patch<HTTPResponseUser>(`/users/${id}/activate`);
  return data;
};