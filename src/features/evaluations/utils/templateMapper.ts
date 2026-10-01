import type { ApiEvaluationTemplateDetail, ApiEvaluationTemplateVersion } from "../types";

// La versión que se aplica es la marcada como `latest`; si ninguna lo está se usa la primera.
// El endpoint de detalle no garantiza el orden de `versions`, así que no se asume
export const getLatestTemplateVersion = (
    template: ApiEvaluationTemplateDetail | null | undefined
): ApiEvaluationTemplateVersion | null => {
    const versions = template?.versions ?? [];

    return versions.find((version) => version.latest) ?? versions[0] ?? null;
};
