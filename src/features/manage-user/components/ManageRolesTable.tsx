import { Table } from "@/components/Table";
import { useGetRoles } from "@/hooks";

export const ManageRolesTable = () => {

    const { getQueryRole } = useGetRoles();

    if (getQueryRole.isLoading) return <p>Cargando...</p>;
    if (!getQueryRole.data) return <p>No hay datos.</p>;

    const columns = ["Nombre"];
    const data = getQueryRole.data.map(role => [
        role.name,
    ]);
  return <Table columns={columns} data={data} />;
};
