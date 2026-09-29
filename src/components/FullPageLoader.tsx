import React from "react";
import { Spinner } from "./Spinner";

type FullPageLoaderProps = {
  message?: string;
};

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <Spinner size="lg" />
      <p className="mt-4 text-blue-800 dark:text-blue-300 text-lg font-medium">{message}</p>
    </div>
  );
};
