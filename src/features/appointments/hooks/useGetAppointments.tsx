import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../services/appointment.action";

export const useGetAppointments = () => {

    const appointmentQuery = useQuery({
        queryKey: ["appointments"],
        queryFn: getAllAppointments,
    });

  return { appointmentQuery, }
}
