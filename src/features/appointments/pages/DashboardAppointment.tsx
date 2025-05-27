import { Calendar } from "@/components/Calendar";
import AppointmentForm from "../components/AppointmentForm";
import { AppointmentList } from "../components/AppointmentList";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { AppointmentModal } from "../components/AppointmentModal";

export const DashboardAppointment = () => {
  const { appointmentMutation } = useCreateAppointment();

  const handleCreate = (data: any) => {
    const finalData = {
      ...data,
      user_id: 2, // fijo por ahora
    };
    appointmentMutation.mutate(finalData);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario</h2>
        <Calendar />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Citas agendadas</h2>
        <AppointmentList />
      </div>
      <AppointmentModal />
    </section>
  );
};
