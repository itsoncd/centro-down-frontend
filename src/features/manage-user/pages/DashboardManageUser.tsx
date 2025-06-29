import { useGetAllUsers } from "../Hooks/useGetAllUsers";

export const DashboardManageUser = () => {
  const { getUserQuery } = useGetAllUsers();
  if (getUserQuery.isLoading) return <p>Loading...</p>;
  if (!getUserQuery.data?.data) return <p>No data.</p>;
  return (
    <>
      <div>DashboardManageUser</div>
      { getUserQuery.data.data.map(element => (
        <h1>{element.name}</h1>
      ))}
    </>
  );
};
