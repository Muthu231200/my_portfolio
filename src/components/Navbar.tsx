import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Drawer,
  List, ListItemButton, ListItemText, useMediaQuery, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_ITEMS = ["Home", "About", "Experience", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((n) => n.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled ? "rgba(4,8,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid" : "none",
        borderColor: "divider",
        transition: "all 0.3s",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2.5, md: 7.5 }, py: 1 }}>
        <Typography
          component="a"
          href="#home"
          variant="h6"
          sx={{
            fontSize: "1.4rem",
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            textDecoration: "none",
            animation: "gradientShift 4s ease infinite",
          }}
        >
          MK.
        </Typography>

        {mobile ? (
          <>
            <IconButton onClick={() => setOpen(true)} sx={{ color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              slotProps={{
                paper: {
                  sx: {
                    width: 260,
                    background: "rgba(4,8,16,0.97)",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2.5, py: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  MK.
                </Typography>
                <IconButton onClick={() => setOpen(false)} sx={{ color: "text.primary" }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)" }} />
              <List>
                {NAV_ITEMS.map((item) => (
                  <ListItemButton
                    key={item}
                    component="a"
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    sx={{
                      px: 3, py: 1.5,
                      borderLeft: active === item.toLowerCase() ? "2px solid #38bdf8" : "2px solid transparent",
                      bgcolor: active === item.toLowerCase() ? "rgba(56,189,248,0.05)" : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={item}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: "0.82rem",
                            fontWeight: active === item.toLowerCase() ? 700 : 500,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: active === item.toLowerCase() ? "primary.main" : "text.secondary",
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 4.5 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.toLowerCase();
              return (
                <Box
                  key={item}
                  component="a"
                  href={`#${item.toLowerCase()}`}
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: isActive ? "primary.main" : "text.secondary",
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.2s",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: "2px",
                      borderRadius: 1,
                      background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
                    },
                    "&:hover": {
                      color: "primary.main",
                      "&::after": { transform: "scaleX(1)" },
                    },
                  }}
                >
                  {item}
                </Box>
              );
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
