import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../services/user.actions";

export const useGetAllUsers = () => {

    const getUserQuery = useQuery({
        queryKey: ['get-users-query'],
        queryFn: getAllUser,
    })

  return { getUserQuery };
}
