import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "../services/schedule.service";

export const useGetHolidays = () => {
  const holidaysQuery = useQuery({
    queryKey: ["holidays"],
    queryFn: getHolidays,
  });

  return { holidaysQuery };
};
