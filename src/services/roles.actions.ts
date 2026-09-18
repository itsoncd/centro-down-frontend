import { api } from "@/lib/axios";
import type { ApiEnvelope } from "@/types";

export type Role = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};


export const getRoles = async (): Promise<Role[]> => {
  const { data } = await api.get<ApiEnvelope<Role[]>>("/roles");
  return data.data;
};
