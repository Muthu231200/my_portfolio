import { useEffect, useRef } from "react";
import "./styles/portfolio.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 2000,
      r: Math.random() * 1.2 + 0.2, s: Math.random() * 0.3 + 0.05,
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${0.3 + Math.random() * 0.2})`;
        ctx.fill();
        s.y += s.s;
        if (s.y > H) s.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} id="bg-canvas" />;
}

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <StarCanvas />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="page-wrap">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
