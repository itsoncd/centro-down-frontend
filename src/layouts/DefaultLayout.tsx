import { Outlet, useLocation } from "react-router-dom";
import FooterDev from "@/components/FooterDev";
import { NavBar } from "@/components/navigation/NavBar";
import { getRoleNav } from "@/config/navigation";
import { useSelectedRole } from "@/hooks/useSelectedRole";
import { resolveActiveNav } from "@/utils/nav.utils";

export default function DefaultLayout() {
  const role = useSelectedRole();
  const entries = getRoleNav(role);
  const { pathname } = useLocation();
  const active = resolveActiveNav(pathname, entries);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        entries={entries}
        activeGroupId={active.groupId}
        activeItemHref={active.itemHref}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterDev />
    </div>
  );
}
