import { Fragment, useRef } from "react";
import { Box, Button, Menu, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavItemLink } from "./NavItemLink";
import type { NavModel } from "@/config/navigation";

const CURRENT_TEXT = "var(--color-primary)";

interface NavMobileMenuProps {
  entries: NavModel;
  activeGroupId: string | null;
  activeItemHref: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavMobileMenu = ({
  entries,
  activeGroupId,
  activeItemHref,
  isOpen,
  onOpenChange,
}: NavMobileMenuProps) => {
  const { t } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const menuId = "mobile-navigation-menu";

  const close = () => onOpenChange(false);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={() => (isOpen ? close() : onOpenChange(true))}
        sx={{
          color: "var(--color-primary)",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        {t("nav.menu")}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disablePortal
        slotProps={{ paper: { sx: { width: "calc(100vw - 32px)", maxWidth: 420 } } }}
      >
        {entries.map((entry) => {
          if (entry.kind === "link") {
            return (
              <NavItemLink
                key={entry.id}
                item={{ href: entry.href, labelKey: entry.labelKey }}
                isCurrent={entry.href === activeItemHref}
                onSelect={close}
              />
            );
          }

          const isCurrentGroup = entry.id === activeGroupId;

          return (
            <Fragment key={entry.id}>
              <Box
                component="li"
                role="presentation"
                sx={{ listStyle: "none", px: 2, pt: 1.5, pb: 0.5 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: isCurrentGroup ? CURRENT_TEXT : "text.secondary",
                    fontWeight: isCurrentGroup ? 700 : 600,
                  }}
                >
                  {t(entry.labelKey)}
                </Typography>
              </Box>
              {entry.items.map((item) => (
                <NavItemLink
                  key={item.href}
                  item={item}
                  isCurrent={item.href === activeItemHref}
                  onSelect={close}
                />
              ))}
            </Fragment>
          );
        })}
      </Menu>
    </>
  );
};
