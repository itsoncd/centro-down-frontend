import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import Button from "@/components/Button";
import {
  ManageUsersTable,
  ManageRolesTable,
  CreateUserForm,
} from "../components";

export const DashboardManageUser = () => {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">
          Gestión de usuarios y roles
        </h1>
        <p className="text-gray-600">
          Administra los usuarios y roles del sistema.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-medium ${
            activeTab === "users"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2 font-medium ${
            activeTab === "roles"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Roles
        </button>
      </div>

      {/* Search + Button */}
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder={`Buscar ${
            activeTab === "users" ? "usuarios" : "roles"
          }...`}
          onSearch={(value) => {
            console.log("Busqueda:", value);
          }}
        />
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          {activeTab === "users" ? "Agregar usuario" : "Agregar rol"}
        </Button>
      </div>

      {/* Table Section */}
      <div>
        {activeTab === "users" ? <ManageUsersTable /> : <ManageRolesTable />}
      </div>
      {/* Modal Section */}
      {isModalOpen && (
        <div
  className="fixed inset-0 flex items-center justify-center bg-black/50"
  onClick={() => setIsModalOpen(false)}
>

          <div
            className="bg-white p-6 rounded shadow w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {activeTab === "users" ? (
              <CreateUserForm onSuccess={() => setIsModalOpen(false)} />
            ) : (
              <p>Aquí iría el CreateRoleForm</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
