import { useForm } from "react-hook-form";
import type { LoginFormType } from "../types";
import { ErrorMessage } from "@/components";
import { RoleSelectionModal } from "./RoleModalSelection";
import { useLogin, useRoleSelection } from "../hooks";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  //?? Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ defaultValues: initialValues });

  const { mutate: loginMutation } = useLogin();
  const {
    handleRoleSelection,
    showRoleModal,
    availableRoles,
    selectRole,
    closeModal,
  } = useRoleSelection();

  //?? Functions for login
  const handleLogin = (formData: LoginFormType) =>
    loginMutation(formData, {
      onSuccess: (response) => {
        toast.success("Inicio de Sesion exitoso.");
        handleRoleSelection(response);
      },
      onError: (error) => toast.error(error.response?.data.error),
    });

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="usuario@ejemplo.com"
            {...register("email", {
              required: "El correo electrónico es obligatorio.",
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="********"
            {...register("password", {
              required: "La contraseña es obligatoria.",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition"
        >
          Iniciar sesión
        </button>
      </form>

      {showRoleModal && (
        <RoleSelectionModal
          roles={availableRoles}
          onSelectRole={selectRole}
          onClose={closeModal}
        />
      )}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Recuperar acceso
          </a>
        </p>
      </div>
    </>
  );
};
