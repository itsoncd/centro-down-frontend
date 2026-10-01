import React from "react";
import { Spinner } from "./Spinner";

type LoaderCardProps = {
  message?: string;
};

export const LoaderCard: React.FC<LoaderCardProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-xl shadow-md border w-full max-w-md">
        <Spinner size="lg" />
        <p className="text-blue-600 text-base font-medium">{message}</p>
      </div>
    </div>
  );
};
