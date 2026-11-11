import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { NavItemView } from "@/config/navigation";

interface NavItemLinkProps {
  item: NavItemView;
  isCurrent: boolean;
  onSelect: () => void;
}

const CURRENT_BACKGROUND = "rgba(21, 101, 192, 0.08)";

export const NavItemLink = ({ item, isCurrent, onSelect }: NavItemLinkProps) => {
  const { t } = useTranslation();

  return (
    <MenuItem
      component={Link}
      to={item.href}
      onClick={onSelect}
      aria-current={isCurrent ? "page" : undefined}
      sx={{
        color: "var(--color-primary)",
        fontWeight: isCurrent ? 600 : 400,
        backgroundColor: isCurrent ? CURRENT_BACKGROUND : "transparent",
        "&:hover": { backgroundColor: CURRENT_BACKGROUND },
      }}
    >
      {t(item.labelKey)}
    </MenuItem>
  );
};
