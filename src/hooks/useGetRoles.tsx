import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/services";

export const useGetRoles = () => {
  const getQueryRole = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return { getQueryRole };
};
