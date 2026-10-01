// Roles que pueden actuar en nombre de cualquier evaluador. El resto solo puede
// consultar y usar su propio perfil de evaluador
const EVALUATOR_MANAGER_ROLES = ["admin", "director"];

// Se evalúa sobre TODOS los roles del usuario (los que devuelve /auth/user), no sobre
// el rol elegido al iniciar sesión, que es el único que guarda el store
export const canManageEvaluators = (roles: string[] | undefined): boolean =>
    (roles ?? []).some((role) => EVALUATOR_MANAGER_ROLES.includes(role));
