import {
  isAxiosError,
} from "axios";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FullPageLoader } from "@/components/FullPageLoader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useUserStore } from "@/store/user.store";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { extractApiErrorMessage } from "@/utils";
import { ROLES } from "@/types";
import type { Role } from "@/types";
import type { AuthUser } from "@/features/auth/types";

interface AuthGuardProps {
  children: ReactNode;
}

const isRole = (value: string | undefined): value is Role =>
  !!value && ROLES.includes(value as Role);

// The selected role lives in localStorage (sidebar/navigation read it), so the
// session keeps it when the stored value is still one of the user's roles.
const toStoreUser = (user: AuthUser) => {
  const storedRole = localStorage.getItem("rol") ?? undefined;
  const role =
    user.roles.find((candidate) => candidate === storedRole) ?? user.roles[0];

  if (isRole(role) && role !== storedRole) localStorage.setItem("rol", role);

  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    roles: isRole(role) ? [role] : [],
  };
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { t } = useTranslation("auth");
  const setUser = useUserStore((state) => state.setUser);
  const { currentUserQuery } = useCurrentUser();

  const user = currentUserQuery.data;

  useEffect(() => {
    if (user) setUser(toStoreUser(user));
  }, [user, setUser]);

  if (currentUserQuery.isPending) {
    return <FullPageLoader message={t("session.validating")} />;
  }

  if (currentUserQuery.error) {
    const isUnauthenticated =
      isAxiosError(currentUserQuery.error) &&
      currentUserQuery.error.response?.status === 401;

    if (isUnauthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <ErrorMessage>
          {extractApiErrorMessage(currentUserQuery.error, t("session.unavailable"))}
        </ErrorMessage>
      </div>
    );
  }

  return <>{children}</>;
};
