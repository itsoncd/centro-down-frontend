import { DynamicForm, type FieldConfig } from "@/components/DynamicForm";
import { useUpdateUser } from "../Hooks/useUpdateUser";
import { toast } from "react-toastify";
import type { UpdateUserFormType, Datum } from "../types";
import { useGetRoles } from "@/hooks";

type Props = {
  user: Datum;
  onSuccess?: () => void;
  onCancel: () => void;
};

export const EditUserForm = ({ user, onSuccess, onCancel }: Props) => {
  const { updateUserMutation } = useUpdateUser();
  const { getQueryRole } = useGetRoles();

  if (getQueryRole.isLoading) return <p>Cargando roles...</p>;
  if (!getQueryRole.data) return <p>No hay datos de roles.</p>;

  const fields: FieldConfig<UpdateUserFormType>[] = [
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
      validation: {}, // opcional
    },
    {
      id: "password_confirmation",
      label: "Confirmar contraseña",
      type: "password",
      validation: {}, // opcional
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

  // Aquí NO usamos user.roles porque no viene
  const defaultValues: Partial<UpdateUserFormType> = {
    name: user.name,
    email: user.email,
    password: "",
    password_confirmation: "",
    roles: [], // vacío porque no hay roles en user
  };

  const handleSubmit = (data: UpdateUserFormType) => {
    const finalData = {
      ...data,
      roles: data.roles.map(Number),
    };

    updateUserMutation.mutate(
      { id: user.id, data: finalData },
      {
        onSuccess: () => {
          toast.success("Usuario actualizado correctamente");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(`Error al actualizar usuario: ${error.message}`);
        },
      }
    );
  };

  return (
    <div>
      <h2 className="text-blue-600 text-2xl font-bold mb-4">Editar usuario</h2>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
        defaultValues={defaultValues}
      />
      <button onClick={onCancel} className="mt-2 text-gray-600 hover:underline">
        Cancelar
      </button>
    </div>
  );
};
