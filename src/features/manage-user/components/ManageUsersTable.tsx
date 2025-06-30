import { useGetAllUsers } from "../Hooks"; 
import { Table } from "@/components/Table";

export const ManageUsersTable = () => {
  const { getUserQuery } = useGetAllUsers();

  if (getUserQuery.isLoading) return <p>Cargando...</p>;
  if (!getUserQuery.data) return <p>No hay datos.</p>;

  const columns = ["Nombre", "Correo"];
  const data = getUserQuery.data.data.map(user => [
    user.name,
    user.email,
  ]);

  return <Table columns={columns} data={data} />;
};
