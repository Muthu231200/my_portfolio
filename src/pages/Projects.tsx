import { useRef, useEffect, useState } from "react";
import { Box, Typography, Container, Card, CardContent, Chip, Grid, Stack } from "@mui/material";

const PROJECTS = [
  {
    title: "CRM Platform",
    desc: "Built a comprehensive Customer Relationship Management system with client management, sales pipeline tracking, lead scoring, and analytics dashboards using React.js, Node.js, and SQL.",
    tags: ["React.js", "Node.js", "Express", "SQL", "REST API"],
    icon: "👥",
    color: "#6366f1",
  },
  {
    title: "E-Commerce Application",
    desc: "Developed a full-stack e-commerce platform with product catalog, shopping cart, secure checkout, order management, and admin dashboard using React, TypeScript, Node.js, and SQL.",
    tags: ["React", "TypeScript", "Node.js", "SQL", "Stripe"],
    icon: "🛒",
    color: "#f43f5e",
  },
  {
    title: "WhatsApp Bulk Messaging System",
    desc: "Engineered a high-performance bulk messaging platform using whatsapp-web.js and Node.js to automate outreach for 10k+ contacts with queue management.",
    tags: ["Node.js", "PHP", "WhatsApp Web.js", "SQL", "BullMQ"],
    icon: "💬",
    color: "#25d366",
  },
  {
    title: "Logistics Management Application",
    desc: "Built robust backend services for import/export logistics — shipment tracking, inventory, customs docs, and scalable RESTful APIs using .NET.",
    tags: [".NET", "CQRS", "MongoDB", "REST API"],
    icon: "🚚",
    color: "#f59e0b",
  },
  {
    title: "Aruvi Restaurant Platform",
    desc: "Developed a full restaurant management system using WordPress and WooCommerce — menu management, ordering, and customer experience features.",
    tags: ["WordPress", "WooCommerce", "PHP", "SQL"],
    icon: "🍽️",
    color: "#ef4444",
  },
  {
    title: "SQL Report Generation Engine",
    desc: "Designed and optimised SSRS reports running against crore-scale datasets — tracking attended calls, retry counts, busy/no-answer metrics with drill-down dashboards.",
    tags: ["SQL Server", "SSRS", "Stored Procs", "SSIS"],
    icon: "📊",
    color: "#38bdf8",
  },
  {
    title: "Video Ringtone Calling System",
    desc: "Implemented a system where a video plays as a caller tune using Node.js, BullMQ job queues, and Firebase push notifications.",
    tags: ["Node.js", "BullMQ", "Firebase", "FFmpeg"],
    icon: "📹",
    color: "#8b5cf6",
  },
  {
    title: "Plant & Adulteration Detection",
    desc: "Built Android applications for plant disease diagnosis and food adulteration detection powered by ML-based image classification.",
    tags: ["Android", "TensorFlow Lite", "Java"],
    icon: "🌿",
    color: "#10b981",
  },
];

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      sx={{
        perspective: { xs: "none", md: 800 },
        height: "100%",
      }}
    >
      <Card
        sx={{
          p: 0,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transform: hovering
            ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-8px)`
            : "rotateY(0) rotateX(0) translateY(0)",
          transition: hovering
            ? "box-shadow 0.3s, border-color 0.3s"
            : "all 0.5s cubic-bezier(0.23,1,0.32,1)",
          transformStyle: "preserve-3d",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at top left, ${p.color}15 0%, transparent 60%)`,
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.4s",
          },
          ...(hovering && {
            borderColor: `${p.color}55`,
            boxShadow: `0 30px 70px ${p.color}20, inset 0 0 30px ${p.color}05`,
          }),
          "& .proj-icon-box": {
            transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          },
          "& .proj-title-text": {
            transition: "color 0.3s",
          },
          "& .proj-num-text": {
            transition: "all 0.4s",
          },
          "& .proj-accent-line": {
            transition: "all 0.5s",
          },
          ...(hovering && {
            "& .proj-icon-box": {
              transform: "scale(1.15) rotate(-8deg)",
              boxShadow: `0 10px 30px ${p.color}35`,
              bgcolor: `${p.color}25`,
            },
            "& .proj-title-text": {
              color: p.color,
            },
            "& .proj-num-text": {
              color: `${p.color}90`,
              transform: "scale(1.3)",
            },
            "& .proj-accent-line": {
              height: "3px !important",
              background: `linear-gradient(90deg, ${p.color}, ${p.color}00) !important`,
            },
            "& .proj-tag-chip": {
              borderColor: `${p.color}55`,
              color: "#e2e8f0",
            },
          }),
        }}
      >
        {/* Top accent line */}
        <Box
          className="proj-accent-line"
          sx={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${p.color}, ${p.color}00)`,
          }}
        />

        {/* Hover spotlight (follows mouse) */}
        {hovering && (
          <Box
            sx={{
              position: "absolute",
              width: 200, height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${p.color}12 0%, transparent 70%)`,
              top: `calc(${((tilt.y / -12) + 0.5) * 100}% - 100px)`,
              left: `calc(${((tilt.x / 12) + 0.5) * 100}% - 100px)`,
              pointerEvents: "none",
              zIndex: 0,
              transition: "top 0.1s, left 0.1s",
            }}
          />
        )}

        <CardContent sx={{ p: { xs: 3, md: 3.5 }, position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Icon + Number */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Box
              className="proj-icon-box"
              sx={{
                width: 52, height: 52,
                borderRadius: 3.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                bgcolor: `${p.color}15`,
                border: "1px solid",
                borderColor: `${p.color}30`,
              }}
            >
              {p.icon}
            </Box>
            <Typography
              className="proj-num-text"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: 1,
                color: `${p.color}30`,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              0{i + 1}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            className="proj-title-text"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.08rem",
              fontWeight: 700,
              color: "#fff",
              mb: 1.25,
            }}
          >
            {p.title}
          </Typography>

          {/* Description */}
          <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", lineHeight: 1.7, mb: 2.5, flexGrow: 1 }}>
            {p.desc}
          </Typography>

          {/* Tags */}
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.875 }}>
            {p.tags.map((t, ti) => (
              <Chip
                key={t}
                label={t}
                size="small"
                className="proj-tag-chip"
                variant="outlined"
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  bgcolor: "rgba(255,255,255,0.04)",
                  color: "text.secondary",
                  transition: `all 0.25s ease ${ti * 0.03}s`,
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function useProjectCount() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let c = 0;
          const iv = setInterval(() => {
            c++;
            setCount(c);
            if (c >= PROJECTS.length) clearInterval(iv);
          }, 120);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { count, ref };
}

export default function Projects() {
  const { count: projCount, ref: counterRef } = useProjectCount();

  return (
    <Container id="projects" maxWidth={false} sx={{ maxWidth: 1200, py: { xs: 4, md: 7.5 }, px: { xs: 2, md: 7.5 } }}>
      <Box className="reveal" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2, mb: 4.5 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
            Work
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "clamp(2rem,4vw,3rem)" }, color: "#fff", mb: 2, mt: 1.5 }}>
            Featured Projects
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", maxWidth: 560, lineHeight: 1.7 }}>
            A selection of systems and applications built with a focus on scale, performance, and clean architecture.
          </Typography>
        </Box>
        {/* Project counter badge */}
        <Box
          ref={counterRef}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1.5,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            px: 2.5,
            py: 1.5,
            mb: 1,
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "2rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #38bdf8, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            {String(projCount).padStart(2, "0")}
          </Typography>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "text.secondary", letterSpacing: 0.5, lineHeight: 1.3 }}>
            Total<br />Projects
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {PROJECTS.map((p, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={p.title}
            className="reveal"
            sx={{ transitionDelay: `${((i % 3) + 1) * 0.12}s` }}
          >
            <ProjectCard p={p} i={i} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
