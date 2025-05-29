import { Calendar } from "@/components/Calendar";
import { AppointmentModal } from "../components/AppointmentModal";
import { DaySchedule } from "../components/DaySchedule";
import { AppointmentList } from "../components/AppointmentList";
import AppointmentForm from "../components/AppointmentForm";
import { useAppointmentStore } from "@/store";

export const DashboardAppointment = () => {
  const { selectedHour, selectedDate } =
      useAppointmentStore();
      console.log(selectedHour);
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario</h2>
          <Calendar />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-blue-800">
            Citas agendadas
          </h2>
          <div className="overflow-y-auto flex-1">
            <DaySchedule />
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
            <AppointmentForm />
          </div>
        </div> }
        
      </section>
    </>
  );
};
