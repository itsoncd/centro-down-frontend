import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { LogoBlack } from "@/components/LogoBlack";
import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  label: string;
  icon?: ReactNode;
  items: NavItem[];
}

interface NavbarProps {
  navGroups: NavGroup[];
  logo?: ReactNode;
}

export const Navbar = ({ navGroups, logo }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    clearCloseTimer();
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleClose = () => {
    clearCloseTimer();
    setAnchorEl(null);
    setOpenIndex(null);
  };

  const handleDelayedClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setAnchorEl(null);
      setOpenIndex(null);
    }, 200);
  };

  const handleMenuPaperEnter = () => {
    clearCloseTimer();
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 100 }}>
          {logo ?? <LogoBlack />}
        </Box>

        {/* Spacer */}
        {/* <Box sx={{ flexGrow: 1 }} /> */}

        {/* Dropdown menus */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {navGroups.map((group, index) => (
            <Box
              key={group.label}
              onMouseEnter={(e) => handleOpen(e, index)}
              onMouseLeave={handleDelayedClose}
              sx={{ position: "relative" }}
            >
              <Button
                aria-controls={openIndex === index ? `menu-${index}` : undefined}
                aria-haspopup="true"
                aria-expanded={openIndex === index ? "true" : undefined}
                sx={{
                  color: "var(--color-primary)",
                  textTransform: "none",
                  fontWeight: openIndex === index ? 600 : 400,
                  fontSize: "0.95rem",
                  "&:hover": {
                    backgroundColor: "rgba(21, 101, 192, 0.08)",
                  },
                }}
                startIcon={group.icon}
              >
                {group.label}
              </Button>
              <Menu
                id={`menu-${index}`}
                anchorEl={anchorEl && openIndex === index ? anchorEl : null}
                open={openIndex === index}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                disableAutoFocusItem
                disablePortal
                slotProps={{
                  paper: {
                    onMouseEnter: handleMenuPaperEnter,
                    onMouseLeave: handleDelayedClose,
                  },
                }}
              >
                {group.items.map((item) => (
                  <MenuItem
                    key={item.to}
                    onClick={handleClose}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: "var(--color-primary)",
                      "&:hover": {
                        backgroundColor: "rgba(21, 101, 192, 0.08)",
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
