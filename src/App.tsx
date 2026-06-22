import { useEffect, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import "./styles/portfolio.css";
import Navbar from "./components/Navbar";
import MouseGlow from "./components/MouseGlow";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 2000,
      r: Math.random() * 1.4 + 0.2, s: Math.random() * 0.3 + 0.04,
      o: Math.random() * 0.3 + 0.2,
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${s.o + Math.random() * 0.15})`;
        ctx.fill();
        s.y += s.s;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.4 }}
    />
  );
}

export default function App() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
        { threshold: 0.1 }
      );
      els.forEach((el) => io.observe(el));
      return io;
    };
    const io = observe();
    return () => io.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StarCanvas />
      <MouseGlow />

      {/* Animated gradient orbs */}
      <Box sx={{
        position: "fixed", width: 550, height: 550, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
        top: -120, right: -120,
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "orbDrift1 20s ease-in-out infinite",
      }} />
      <Box sx={{
        position: "fixed", width: 450, height: 450, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
        bottom: "15%", left: -120,
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "orbDrift2 25s ease-in-out infinite",
      }} />
      <Box sx={{
        position: "fixed", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)",
        top: "50%", left: "40%",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        animation: "orbDrift1 30s ease-in-out infinite reverse",
      }} />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <Contact />
      </Box>

      <ScrollToTop />
      <ChatBot />
    </ThemeProvider>
  );
}
