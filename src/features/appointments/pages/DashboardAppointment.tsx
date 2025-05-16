import AppointmentForm from "../components/AppointmentForm"
import { AppointmentList } from "../components/AppointmentList"

export const DashboardAppointment = () => {
  return (
    <>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Agendar Cita</h2>
        <AppointmentForm />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Agendar Cita</h2>
        <AppointmentList />
      </div>
    </section>
    </>
  )
}
