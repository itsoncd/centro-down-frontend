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
      validation: { required: "El correo es obligatorio" },
    },
    {
      id: "password_confirmation",
      label: "Confirmar contraseña",
      validation: { required: "El correo es obligatorio" },
    },
    {
      id: "roles",
      label: "Seleccione los roles a establecer",
      type: "select-multiple",
      options: getQueryRole.data.map((role) => ({
        label: role.name,
        value: String(role.id),
      })),
    },
  ];

  const handleSubmit = (data: CreateUserFormType) => {
    const finalData = {
      ...data,
      roles: data.roles.map(Number), // Asegura que sean numbers
    };
    console.log(finalData);

    // createUserMutation.mutate(finalData, {
    //   onSuccess: () => {
    //     toast.success("Usuario creado correctamente");
    //     onSuccess?.();
    //   },
    // });
  };

  return (
    <>
      <h1 className="text-blue-600 text-2xl font-bold">
        Registra un nuevo usuario
      </h1>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Crear usuario"
      />
    </>
  );
};
