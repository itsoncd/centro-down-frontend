// src/components/InputField.tsx
import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

type InputFieldProps = {
  label: string;
  id: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  id,
  registration,
  error,
  ...rest
}: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...registration}
        {...rest}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};
