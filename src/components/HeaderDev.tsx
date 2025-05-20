export default function HeaderDev() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Centro Down</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Nosotros</a>
          <a href="#" className="hover:underline">Contacto</a>
          <a href="/login" className="hover:underline">Iniciar Sesion</a>
        </nav>
      </div>
    </header>
  );
}
