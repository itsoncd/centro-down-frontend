import { LoaderCircle } from "lucide-react";
import React from "react";

type LoaderCardProps = {
  message?: string;
};

export const LoaderCard: React.FC<LoaderCardProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-xl shadow-md border w-full max-w-md">
        <LoaderCircle className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-blue-600 text-base font-medium">{message}</p>
      </div>
    </div>
  );
};
