import { LogoBlack } from "@/components";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-24 mb-4">
            <LogoBlack />
          </div>
          <h1 className="text-2xl font-bold text-blue-800">Iniciar sesión</h1>
          <p className="text-sm text-blue-700">
            Bienvenido al sistema de gestión del Centro Down A.C.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
