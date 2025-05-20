import type { Role } from "@/types";
import React from "react";



interface RoleSelectionModalProps {
  roles: Role[];
  onSelectRole: (role: Role) => void;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  roles,
  onSelectRole,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">
          Selecciona un rol
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Tienes más de un rol asignado, por favor elige con cuál deseas iniciar sesión.
        </p>
        <div className="flex flex-col gap-3">
          {roles.map((role) => (
            <button
              key={role}
              className="bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
              onClick={() => onSelectRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
