import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export const Input = ({ id, registration, error, className = "", ...rest }: InputProps) => {
  return (
    <>
      <input
        id={id}
        {...registration}
        {...rest}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
};
