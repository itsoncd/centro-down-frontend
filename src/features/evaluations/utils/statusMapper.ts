// utils/statusMapper.ts
export const translateStatus = (status: string): string => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "Pendiente";
    case "CLOSED":
      return "Completado";
    case "CANCELLED":
      return "Cancelado";
    default:
      return status; // fallback: muestra tal cual
  }
};
