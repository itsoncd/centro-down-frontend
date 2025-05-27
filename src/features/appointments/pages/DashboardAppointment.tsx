import { Calendar } from "@/components/Calendar";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { AppointmentModal } from "../components/AppointmentModal";
import { DaySchedule } from "../components/DaySchedule";

export const DashboardAppointment = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario</h2>
        <Calendar />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Citas agendadas</h2>
        <DaySchedule />
      </div>
      <AppointmentModal />
    </section>
  );
};
