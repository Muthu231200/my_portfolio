import { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Grid, Card } from "@mui/material";

const SKILLS = [
  { name: "React / TypeScript", pct: 88, color: "#38bdf8" },
  { name: "Node.js / Express", pct: 85, color: "#34d399" },
  { name: "SQL / Database", pct: 88, color: "#818cf8" },
  { name: "WordPress & PHP", pct: 90, color: "#f59e0b" },
  { name: "Python / Django", pct: 70, color: "#f43f5e" },
  { name: ".NET Framework", pct: 72, color: "#8b5cf6" },
];

const STATS = [
  { end: 3, suffix: "+", label: "Years Exp" },
  { end: 8, suffix: "+", label: "Projects" },
  { end: 2, suffix: "", label: "Companies" },
  { end: 12, suffix: "+", label: "Tech Stack" },
];

const MARQUEE_ITEMS = [
  "React", "TypeScript", "Node.js", "Express", "SQL Server", "MySQL", "MongoDB",
  "PHP", "WordPress", "Python", "Django", ".NET", "REST APIs", "Git", "Firebase",
  "BullMQ", "Docker", "SSRS", "SSIS", "WooCommerce", "JavaScript", "HTML/CSS",
];

const TECH_STACK = [
  { category: "Frontend", icon: "◈", color: "#38bdf8", items: ["React", "TypeScript", "JavaScript", "HTML/CSS", "WordPress"] },
  { category: "Backend", icon: "⚙", color: "#34d399", items: ["Node.js", "Express", "PHP", "Python", ".NET", "REST APIs"] },
  { category: "Database", icon: "⛁", color: "#818cf8", items: ["SQL Server", "MySQL", "MongoDB", "SSRS", "SSIS"] },
  { category: "Tools", icon: "⚡", color: "#f59e0b", items: ["Git", "Firebase", "BullMQ", "Docker", "VS Code", "Postman"] },
];

function CountUpStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 1200, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <Card
      ref={ref}
      sx={{
        textAlign: "center",
        py: { xs: 2, md: 2.5 },
        px: 1,
        animation: "glowPulse 4s ease-in-out infinite",
        "&:hover": { borderColor: "primary.main", transform: "translateY(-4px)" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: { xs: "1.5rem", md: "1.8rem" },
          fontWeight: 800,
          background: "linear-gradient(135deg, #38bdf8, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}{suffix}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.5px" }}>
        {label}
      </Typography>
    </Card>
  );
}

function CircularSkill({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const [animPct, setAnimPct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const size = 100;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / 1400, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setAnimPct(Math.round(eased * pct));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pct, delay]);

  const offset = circumference - (animPct / 100) * circumference;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          "& .skill-ring": { filter: `drop-shadow(0 0 12px ${color}60)` },
        },
      }}
    >
      <Box sx={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke}
          />
          <circle
            className="skill-ring"
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear, filter 0.3s" }}
          />
        </svg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              color,
            }}
          >
            {animPct}%
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "text.secondary",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default function About() {
  return (
    <Container id="about" maxWidth={false} sx={{ maxWidth: 1200, py: { xs: 4, md: 7.5 }, px: { xs: 2, md: 7.5 } }}>
      <Grid container spacing={{ xs: 5, md: 7.5 }} sx={{ alignItems: "flex-start" }}>
        {/* Left: About text */}
        <Grid size={{ xs: 12, md: 6 }} className="reveal">
          <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
            Profile
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "clamp(2rem,4vw,3rem)" }, color: "#fff", mb: 2, mt: 1.5 }}>
            Building Things<br />That Actually Work
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2, fontSize: "0.95rem" }}>
            Full Stack Developer with 3+ years of professional experience across two companies,
            specializing in building scalable web applications, enterprise CRM systems, and e-commerce platforms.
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2, fontSize: "0.95rem" }}>
            Proficient in React, TypeScript, Node.js, and SQL — delivering impactful solutions
            including CRM platforms, e-commerce applications, complex SSRS reports, and bulk messaging systems.
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4, fontSize: "0.95rem" }}>
            M.Sc Mathematics (2022) — SBK College, Aruppukottai. Strong analytical foundation
            applied to architecting robust software solutions.
          </Typography>

          <Grid container spacing={2}>
            {STATS.map((s) => (
              <Grid size={{ xs: 6, sm: 3 }} key={s.label}>
                <CountUpStat end={s.end} suffix={s.suffix} label={s.label} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right: Circular skills */}
        <Grid size={{ xs: 12, md: 6 }} className="reveal" sx={{ transitionDelay: "0.2s" }}>
          <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem", mb: 1, display: "block" }}>
            Proficiency
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.2rem", color: "#fff", mb: 4 }}>
            Core Skill Set
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, 1fr)" },
              gap: { xs: 3, md: 4 },
              justifyItems: "center",
            }}
          >
            {SKILLS.map((s, i) => (
              <CircularSkill key={s.name} name={s.name} pct={s.pct} color={s.color} delay={i * 150} />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Tech Stack Grid */}
      <Box className="reveal" sx={{ mt: 7.5 }}>
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
          Tech Stack
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "1.3rem", color: "#fff", mb: 3.5, mt: 0.5 }}>
          Technologies I Work With
        </Typography>
        <Grid container spacing={2.5}>
          {TECH_STACK.map((cat, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={cat.category} className="reveal" sx={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${cat.color}, ${cat.color}00)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  },
                  "&:hover": {
                    borderColor: `${cat.color}40`,
                    transform: "translateY(-6px)",
                    boxShadow: `0 20px 50px ${cat.color}10`,
                    "&::before": { opacity: 1 },
                    "& .tech-cat-icon": {
                      bgcolor: `${cat.color}18`,
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                    },
                    "& .tech-item-box": {
                      borderColor: `${cat.color}30`,
                      color: "text.primary",
                    },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2 }}>
                  <Box
                    className="tech-cat-icon"
                    sx={{
                      width: 36, height: 36, borderRadius: 2,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      bgcolor: "rgba(255,255,255,0.04)", border: "1px solid", borderColor: "divider",
                      fontSize: "1.1rem", color: "text.secondary", transition: "all 0.3s",
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
                    {cat.category}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {cat.items.map((item) => (
                    <Box
                      key={item}
                      className="tech-item-box"
                      sx={{
                        px: 1.5, py: 0.625, borderRadius: 1.5,
                        fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.3px",
                        color: "text.secondary", border: "1px solid", borderColor: "divider",
                        bgcolor: "rgba(255,255,255,0.02)", transition: "all 0.3s",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tech Marquee */}
      <Box className="reveal" sx={{ mt: 6 }}>
        <Box className="marquee-wrap" sx={{ py: 3 }}>
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="marquee-item" key={i}>
                <span className="marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </Box>
      </Box>
    </Container>
  );
}
