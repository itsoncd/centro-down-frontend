import AlertCard from "@/components/AlertCard";
import Button from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function HomePageDev() {
  const [error, setError] = useState<boolean>(false);
  
  //?? Functions para los buttons
  //** Cuando su funcion es de una sola linea, no necesitan las {} */
  const buttonSave = () => toast.success('Guardado Correctamente.'); // Asi invocamos los alert
  const buttonInfo = () => toast.info('Demostracion de info.');

  //** Pero por ejemplo aqui, que hacemos mas de una accion, utilizamos las {} */
  const buttonCancel = () => {
    toast.error('Algo salio mal.');
    return setError(!error);
  }
  return (
    <section className="max-w-4xl mx-auto py-20 px-6 text-center">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-blue-800">
          Bienvenido al Centro Down
        </h2>
        <p className="text-lg text-blue-700">
          Nuestro centro se dedica a brindar atención, educación y
          acompañamiento especializado a personas con Síndrome de Down y sus
          familias. Juntos construimos un futuro con inclusión, amor y respeto.
        </p>
      </div>

      <div className="space-x-4">
        <Button onClick={buttonSave} variant="primary">Guardar</Button>
        <Button onClick={buttonInfo} variant="secondary">Editar</Button>
        <Button onClick={buttonCancel} variant="cancel">Cancelar</Button>
      </div>
      <div className="space-x-4 text-left">
        <AlertCard
          type="info"
          title="Información"
          message="Todo va bien por aquí."
        />
        <AlertCard
          type="warning"
          title="Precaución"
          message="Este cambio es irreversible."
        />
        <AlertCard type="error" title="Error" message="No se pudo guardar." />
      </div>
      <div>
        {
          // Ejemplo de error message
          error && <ErrorMessage>Algo salio mal.</ErrorMessage>
        }
      </div>
    </section>
  );
}
