import { isAxiosError } from "axios";

// Extrae el mensaje que devuelve la API (ApiResponse::error / ValidationException).
// Los errores de validación llegan como { errors: { campo: ["mensaje"] } } y los
// demás como { error: "mensaje" }; si no hay ninguno se usa el texto recibido
export const extractApiErrorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError(error)) {
        const payload = error.response?.data as
            | { error?: unknown; errors?: Record<string, unknown> }
            | undefined;

        const validationErrors = payload?.errors;
        if (validationErrors && typeof validationErrors === "object") {
            for (const messages of Object.values(validationErrors)) {
                if (Array.isArray(messages) && messages.length > 0) {
                    return String(messages[0]);
                }
                if (typeof messages === "string" && messages.length > 0) {
                    return messages;
                }
            }
        }

        if (typeof payload?.error === "string" && payload.error.length > 0) {
            return payload.error;
        }
    }

    return fallback;
};
