import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Zoom in={show}>
      <Fab
        size="small"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          position: "fixed",
          bottom: 96,
          right: 28,
          zIndex: 1200,
          width: 42,
          height: 42,
          bgcolor: "rgba(10,22,40,0.85)",
          border: "1px solid",
          borderColor: "divider",
          color: "primary.main",
          backdropFilter: "blur(12px)",
          "&:hover": {
            bgcolor: "rgba(56,189,248,0.1)",
            borderColor: "primary.main",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(56,189,248,0.2)",
          },
          transition: "all 0.3s",
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
