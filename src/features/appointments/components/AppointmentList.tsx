import { useGetAppointments } from "../hooks/useGetAppointments";
import { AppointmentCard } from "./AppointmentCard";


export const AppointmentList = () => {
    const { appointmentQuery } = useGetAppointments();
    const queryResponse = appointmentQuery.data;
    console.log(appointmentQuery.data);

    if (appointmentQuery.isLoading) return <p>Cargando...</p>
    if (!appointmentQuery.data) return <p>No Data.</p>
  return (
    <>
      <div className="grid gap-4">
      {queryResponse?.data.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>
    </>
  );
};
