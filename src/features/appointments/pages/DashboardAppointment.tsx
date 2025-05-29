import { Calendar } from "@/components/Calendar";
import { AppointmentModal } from "../components/AppointmentModal";
import { DaySchedule } from "../components/DaySchedule";
import AppointmentForm from "../components/AppointmentForm";
import { useAppointmentStore } from "@/store";
import { useGetAppointments } from "../hooks/useGetAppointments";
import { LoaderCard } from "@/components/LoaderCard";

export const DashboardAppointment = () => {
  const { selectedHour, selectedDate, selectedAppointment } = useAppointmentStore();
  const { appointmentQuery } = useGetAppointments();
  console.log(appointmentQuery.data?.data);

  if (!appointmentQuery.data) return <LoaderCard message="Cargando citas."/>
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario</h2>
          <Calendar appointments={appointmentQuery.data.data} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-blue-800">
            Citas agendadas
          </h2>
          <div className="overflow-y-auto flex-1">
            <DaySchedule appointmentsData={appointmentQuery.data.data} />
          </div>
        </div>

        <AppointmentModal />
      </section>
      <section>
        { !selectedHour ? <></> : <div className="bg-white rounded-2xl shadow p-6 h-[400px] flex flex-col">
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800">Detalle de la cita  {} | Hora: {selectedHour} | {} Fecha: {selectedDate}</h2>
          </div>
          <div className="overflow-y-auto flex-1">
            {selectedAppointment && <AppointmentForm />}
          </div>
        </div> }
      </section>
    </>
  );
};
