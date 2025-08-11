import { useState } from "react";
import { useGetAllUsers } from "../Hooks/useGetAllUsers";
import { useDesactivateUser } from "../Hooks/useDesactivateUser";
import { useActivateUser } from "../Hooks/useActivateUser";
import { toast } from "react-toastify";
import { EditUserForm } from "./EditUseForm";
import type { Datum } from "../types";
import { CheckCircle, XCircle, Edit2 } from "lucide-react";

export const ManageUsersTable = () => {
  const { getUserQuery } = useGetAllUsers();
  const { desactivateUserMutation } = useDesactivateUser();
  const { activateUserMutation } = useActivateUser();

  const [editingUser, setEditingUser] = useState<Datum | null>(null);

  if (getUserQuery.isLoading) return <p>Cargando...</p>;
  if (!getUserQuery.data || getUserQuery.data.data.length === 0)
    return <p>No hay datos.</p>;

  const handleToggleActive = (user: Datum) => {
    if (user.isActive) {
      if (!confirm(`¿Seguro que quieres desactivar a ${user.name}?`)) return;
      desactivateUserMutation.mutate(user.id, {
        onSuccess: () => toast.success("Usuario desactivado"),
        onError: (e: any) => toast.error(`Error al desactivar: ${e.message}`),
      });
    } else {
      if (!confirm(`¿Seguro que quieres activar a ${user.name}?`)) return;
      activateUserMutation.mutate(user.id, {
        onSuccess: () => toast.success("Usuario activado"),
        onError: (e: any) => toast.error(`Error al activar: ${e.message}`),
      });
    }
  };

  return (
    <div>
      {!editingUser ? (
        <table className="min-w-full table-auto border border-gray-300 overflow-x-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-700">Nombre</th>
              <th className="px-4 py-2 text-left text-gray-700">Correo</th>
              <th className="px-4 py-2 text-left text-gray-700">Estado</th>
              <th className="px-4 py-2 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {getUserQuery.data.data.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex items-center space-x-1">
                  {user.isActive ? (
                    <>
                      <CheckCircle className="text-green-600" />
                      <span>Activo</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-600" />
                      <span>Inactivo</span>
                    </>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleActive(user)}
                    className={`flex items-center gap-1 ${
                      user.isActive ? "text-red-600" : "text-green-600"
                    } hover:underline`}
                  >
                    {user.isActive ? (
                      <>
                        <XCircle size={16} />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Activar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EditUserForm
          user={editingUser}
          onCancel={() => setEditingUser(null)}
          onSuccess={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};
