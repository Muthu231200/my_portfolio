import { Box, Typography, Container, Grid, Card } from "@mui/material";
import CodeIcon from "@mui/icons-material/CodeOutlined";
import StorageIcon from "@mui/icons-material/StorageOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import ApiIcon from "@mui/icons-material/ApiOutlined";
import BrushIcon from "@mui/icons-material/BrushOutlined";

const SERVICES = [
  {
    icon: <CodeIcon />,
    title: "Full Stack Development",
    desc: "End-to-end web applications with React, TypeScript, Node.js, and SQL — from architecture to deployment.",
    color: "#38bdf8",
  },
  {
    icon: <ShoppingCartIcon />,
    title: "E-Commerce Solutions",
    desc: "Custom online stores with product catalogs, secure checkout, payment integration, and admin dashboards.",
    color: "#f43f5e",
  },
  {
    icon: <DashboardIcon />,
    title: "CRM & Admin Panels",
    desc: "Client management systems, sales pipelines, analytics dashboards, and role-based access control.",
    color: "#818cf8",
  },
  {
    icon: <ApiIcon />,
    title: "API Development",
    desc: "Scalable RESTful APIs with authentication, rate limiting, queue management, and third-party integrations.",
    color: "#34d399",
  },
  {
    icon: <StorageIcon />,
    title: "Database & Reporting",
    desc: "SQL schema design, query optimization, SSRS reports, and data pipelines for enterprise-scale datasets.",
    color: "#f59e0b",
  },
  {
    icon: <BrushIcon />,
    title: "WordPress & CMS",
    desc: "Custom WordPress themes, WooCommerce stores, plugin configuration, and content management solutions.",
    color: "#8b5cf6",
  },
];

export default function Services() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, py: { xs: 4, md: 7.5 }, px: { xs: 2, md: 7.5 } }}>
      <Box className="reveal" sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
          Services
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "clamp(2rem,4vw,3rem)" }, color: "#fff", mb: 2, mt: 1.5 }}>
          What I Can Do For You
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", maxWidth: 520, mx: "auto", lineHeight: 1.7 }}>
          Delivering tailored software solutions that drive business results — from concept to production.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {SERVICES.map((s, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={s.title}
            className="reveal"
            sx={{ transitionDelay: `${((i % 3) + 1) * 0.1}s` }}
          >
            <Card
              sx={{
                p: 3.5,
                height: "100%",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${s.color}, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.4s",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 50% 0%, ${s.color}08 0%, transparent 60%)`,
                  opacity: 0,
                  transition: "opacity 0.4s",
                },
                "&:hover": {
                  borderColor: `${s.color}40`,
                  transform: "translateY(-8px)",
                  boxShadow: `0 24px 60px ${s.color}12`,
                  "&::before, &::after": { opacity: 1 },
                  "& .svc-icon": {
                    bgcolor: `${s.color}18`,
                    borderColor: `${s.color}35`,
                    color: s.color,
                    transform: "scale(1.1)",
                    boxShadow: `0 8px 24px ${s.color}25`,
                  },
                  "& .svc-title": { color: s.color },
                },
              }}
            >
              <Box
                className="svc-icon"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  mx: "auto",
                  mb: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                  transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                  position: "relative",
                  zIndex: 1,
                  "& svg": { fontSize: "1.5rem" },
                }}
              >
                {s.icon}
              </Box>
              <Typography
                className="svc-title"
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  mb: 1.25,
                  transition: "color 0.3s",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "text.secondary",
                  lineHeight: 1.7,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
