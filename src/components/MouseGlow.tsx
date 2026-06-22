import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || "ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      el.style.opacity = "1";
    };
    const leave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        transition: "opacity 0.3s",
        willChange: "transform",
      }}
    />
  );
}
