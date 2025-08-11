import { api } from "@/lib/axios";

export type Role = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};


export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get("http://localhost:8000/api/roles");
  return response.data.data; // Extrae solo el array de roles
};
