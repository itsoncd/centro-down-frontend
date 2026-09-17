export type Role = "admin" | "director" | "profesor" | "tutor";

export const ROLES: readonly Role[] = ["admin", "director", "profesor", "tutor"];

export type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
};
