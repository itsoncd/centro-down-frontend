import { useEffect, useState } from "react";

// Devuelve el valor recibido después de que deja de cambiar durante `delay` milisegundos.
// Se usa para no mandar una petición al servidor por cada tecla que escribe el usuario.
export const useDebouncedValue = <T,>(value: T, delay = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
