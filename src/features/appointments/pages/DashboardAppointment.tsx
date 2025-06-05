import { Calendar } from "@/components/Calendar";
import { AppointmentModal } from "../components/AppointmentModal";
import { DaySchedule } from "../components/DaySchedule";
import { useAppointmentStore } from "@/store";
import { useGetAppointments } from "../hooks/useGetAppointments";
import { LoaderCard } from "@/components/LoaderCard";
import { AppointmentDetailsForm } from "../components/AppointmentDetailsForm";
import { formatHour } from "@/utils";

export const DashboardAppointment = () => {
  const { selectedDate, selectedAppointment } =
    useAppointmentStore();
  const { appointmentQuery } = useGetAppointments();
  console.log(appointmentQuery.data?.data);
  console.log(selectedAppointment);

  if (!appointmentQuery.data) return <LoaderCard message="Cargando citas." />;
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario</h2>
          <Calendar appointments={appointmentQuery.data.data} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-blue-800">
            Horarios
          </h2>
          <div className="overflow-y-auto flex-1">
            <DaySchedule appointmentsData={appointmentQuery.data.data} />
          </div>
        </div>

        <AppointmentModal />
      </section>
      <section>
        {selectedAppointment && (
          <div className="bg-white rounded-2xl shadow p-6 pb-10 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-800">
                Detalle de la cita
              </h2>
              <p className="text-sm text-gray-600">
                Hora de inicio: <span className="font-extrabold">{formatHour(selectedAppointment.hora_inicio)}</span> |
                Hora de fin: <span className="font-extrabold">{formatHour(selectedAppointment.hora_fin)}</span> |
                Fecha: <span className="font-extrabold">{selectedDate}</span>
              </p>
            </div>
            <div className="overflow-y-auto flex-1">
              <AppointmentDetailsForm />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
