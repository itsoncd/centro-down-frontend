import { useRef } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { Box, Button, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavItemLink } from "./NavItemLink";
import type { NavGroupEntry } from "@/config/navigation";

// Provisional grace so a pointer crossing the gap does not close the menu (spec OQ-7).
const CLOSE_GRACE_MS = 150;
const CURRENT_BACKGROUND = "rgba(21, 101, 192, 0.08)";

interface NavGroupMenuProps {
  group: NavGroupEntry;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isActive: boolean;
  activeItemHref: string | null;
}

export const NavGroupMenu = ({
  group,
  isOpen,
  onOpenChange,
  isActive,
  activeItemHref,
}: NavGroupMenuProps) => {
  const { t } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByKeyboardRef = useRef(false);

  const clearCloseTimer = () => {
    if (closeTimerRef.current === null) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const open = (byKeyboard: boolean) => {
    clearCloseTimer();
    openedByKeyboardRef.current = byKeyboard;
    onOpenChange(true);
  };

  const close = () => {
    clearCloseTimer();
    onOpenChange(false);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      onOpenChange(false);
    }, CLOSE_GRACE_MS);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    open(false);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) return;
    if (isOpen) close();
    else open(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (isOpen) close();
    else open(true);
  };

  const menuId = `${group.id}-menu`;

  return (
    <Box
      onPointerEnter={handlePointerEnter}
      onPointerLeave={scheduleClose}
      sx={{ position: "relative" }}
    >
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        sx={{
          color: "var(--color-primary)",
          textTransform: "none",
          fontWeight: isActive ? 600 : 400,
          fontSize: "0.95rem",
          backgroundColor: isActive ? CURRENT_BACKGROUND : "transparent",
          "&:hover": { backgroundColor: CURRENT_BACKGROUND },
        }}
      >
        {t(group.labelKey)}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem={!openedByKeyboardRef.current}
        disablePortal
        slotProps={{
          paper: {
            onPointerEnter: clearCloseTimer,
            onPointerLeave: scheduleClose,
          },
        }}
      >
        {group.items.map((item) => (
          <NavItemLink
            key={item.href}
            item={item}
            isCurrent={item.href === activeItemHref}
            onSelect={close}
          />
        ))}
      </Menu>
    </Box>
  );
};
