import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../services/schedule.service";

export const useSchedule = () => {
  const scheduleQuery = useQuery({
    queryKey: ["schedule"],
    queryFn: getSchedule,
  });

  return { scheduleQuery };
};