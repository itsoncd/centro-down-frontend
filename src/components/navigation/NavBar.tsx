import { useEffect, useState } from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogoBlack } from "@/components/LogoBlack";
import { NavGroupMenu } from "./NavGroupMenu";
import { NavMobileMenu } from "./NavMobileMenu";
import type { NavModel } from "@/config/navigation";
import type { ReactNode } from "react";

const MOBILE_MENU_KEY = "mobile-menu";
const CURRENT_BACKGROUND = "rgba(21, 101, 192, 0.08)";

interface NavBarProps {
  entries: NavModel;
  activeGroupId: string | null;
  activeItemHref: string | null;
  logo?: ReactNode;
}

export const NavBar = ({
  entries,
  activeGroupId,
  activeItemHref,
  logo,
}: NavBarProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [openEntryId, setOpenEntryId] = useState<string | null>(null);

  useEffect(() => {
    setOpenEntryId(null);
  }, [pathname]);

  const handleOpenChange = (entryId: string) => (open: boolean) => {
    setOpenEntryId(open ? entryId : null);
  };

  return (
    <AppBar
      component="nav"
      aria-label={t("nav.ariaLabel")}
      position="static"
      color="inherit"
      elevation={1}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: { xs: 0, md: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 100 }}>
          {logo ?? <LogoBlack />}
        </Box>

        <Box className="hidden lg:flex" sx={{ gap: 1 }}>
          {entries.map((entry) => {
            if (entry.kind === "link") {
              const isCurrent = entry.href === activeItemHref;

              return (
                <Button
                  key={entry.id}
                  component={Link}
                  to={entry.href}
                  aria-current={isCurrent ? "page" : undefined}
                  sx={{
                    color: "var(--color-primary)",
                    textTransform: "none",
                    fontWeight: isCurrent ? 600 : 400,
                    fontSize: "0.95rem",
                    backgroundColor: isCurrent ? CURRENT_BACKGROUND : "transparent",
                    "&:hover": { backgroundColor: CURRENT_BACKGROUND },
                  }}
                >
                  {t(entry.labelKey)}
                </Button>
              );
            }

            return (
              <NavGroupMenu
                key={entry.id}
                group={entry}
                isOpen={openEntryId === entry.id}
                onOpenChange={handleOpenChange(entry.id)}
                isActive={activeGroupId === entry.id}
                activeItemHref={activeItemHref}
              />
            );
          })}
        </Box>

        <Box className="lg:hidden">
          <NavMobileMenu
            entries={entries}
            activeGroupId={activeGroupId}
            activeItemHref={activeItemHref}
            isOpen={openEntryId === MOBILE_MENU_KEY}
            onOpenChange={handleOpenChange(MOBILE_MENU_KEY)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
