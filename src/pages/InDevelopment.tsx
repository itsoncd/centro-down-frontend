import { Construction} from "lucide-react";

export const InDevelopment = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md space-y-6 animate-fade-in-up">
        <div className="flex justify-center">
          <Construction className="h-16 w-16 text-yellow-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">
          ¡En Desarrollo!
        </h1>
        
        <p className="text-gray-600 text-lg">
          Estamos trabajando duro para traerte esta funcionalidad. 
          ¡Vuelve pronto para descubrir las novedades!
        </p>

      </div>
    </div>
  );
};