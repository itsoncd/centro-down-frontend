export type Role = "admin" | "director" | "profesor" | "tutor";

export type ApiResponseBase<T> = {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export type ApiError = {
  statusCode: number;
  error: string | Record<string, string[]>;
  timestamp: string;
}
