import { DynamicForm, type FieldConfig } from "@/components/DynamicForm";
import { useCreateUser } from "../Hooks";
import { toast } from "react-toastify";
import type { CreateUserFormType } from "../types";
import { useGetRoles } from "@/hooks";

export const CreateUserForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { createUserMutation } = useCreateUser();
  const { getQueryRole } = useGetRoles();

  if (getQueryRole.isLoading) return <p>Cargando roles...</p>;
  if (!getQueryRole.data) return <p>No hay datos de roles.</p>;

  const fields: FieldConfig<CreateUserFormType>[] = [
    {
      id: "name",
      label: "Nombre",
      validation: { required: "El nombre es obligatorio" },
    },
    {
      id: "email",
      label: "Correo electrónico",
      type: "email",
      validation: { required: "El correo es obligatorio" },
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      validation: { required: "La contraseña es obligatoria" },
    },
    {
      id: "password_confirmation",
      label: "Confirmar contraseña",
      type: "password",
      validation: { required: "La confirmación es obligatoria" },
    },
    {
      id: "roles",
      label: "Seleccione los roles a establecer",
      type: "checkbox-group",
      options: getQueryRole.data.map((role) => ({
        label: role.name,
        value: String(role.id),
      })),
      validation: { required: "Selecciona al menos un rol" },
    },
  ];

  const handleSubmit = (data: CreateUserFormType) => {
    const finalData = {
      ...data,
      roles: data.roles.map(Number),
    };
    createUserMutation.mutate(finalData, {
      onSuccess: () => {
        toast.success("Usuario creado correctamente");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Hubo un error al crear un usuario! Error: ${error.message}`);
      },
    });
  };

  return (
    <>
      <h1 className="text-blue-600 text-2xl font-bold">
        Registra un nuevo usuario
      </h1>
      <DynamicForm fields={fields} onSubmit={handleSubmit} submitLabel="Crear usuario" />
    </>
  );
};
