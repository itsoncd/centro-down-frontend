import { LoaderCircle } from "lucide-react";
import React from "react";

type FullPageLoaderProps = {
  message?: string;
};

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-blue-800 dark:text-blue-300 text-lg font-medium">{message}</p>
    </div>
  );
};
