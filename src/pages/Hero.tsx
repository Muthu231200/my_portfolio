import { Box, Typography, Chip, Button, Container, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import profileImg from "../assets/profile.jpg";
import useTypingEffect from "../hooks/useTypingEffect";

const TECH = ["React", "TypeScript", "Node.js", "SQL", "PHP", "WordPress", "Python", ".NET"];

const ROLES = [
  "Full Stack Developer",
  "React & Node.js Expert",
  "CRM & E-Commerce Builder",
  "API Architecture Specialist",
];

const fadeUp = {
  "@keyframes fadeUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

const spin = {
  "@keyframes spin": {
    to: { transform: "rotate(360deg)" },
  },
};

const pulse = {
  "@keyframes pulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.5)" },
    "50%": { boxShadow: "0 0 0 6px rgba(52,211,153,0)" },
  },
};

export default function Hero() {
  const typedRole = useTypingEffect(ROLES, 70, 40, 2200);

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 7.5 },
        pt: { xs: 9, md: 12.5 },
        pb: { xs: 4, md: 6.25 },
        position: "relative",
        overflow: "hidden",
        ...fadeUp,
        ...spin,
        ...pulse,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
          gap: { xs: 5, md: 10 },
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Left content */}
        <Box>
          {/* Tag */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              borderRadius: 100,
              px: 2,
              py: 0.75,
              mb: 3.5,
              opacity: 0,
              animation: "fadeUp 0.6s ease 0.1s forwards",
            }}
          >
            <Box
              sx={{
                width: 7, height: 7, borderRadius: "50%",
                bgcolor: "success.main",
                animation: "pulse 2s infinite",
              }}
            />
            <Typography
              variant="caption"
              sx={{ fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "primary.main" }}
            >
              Available for Hire
            </Typography>
          </Box>

          {/* Name */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "clamp(2.4rem, 10vw, 3.5rem)", md: "clamp(3rem, 6vw, 5.5rem)" },
              lineHeight: 1.0,
              color: "#fff",
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.25s forwards",
            }}
          >
            Muthu
            <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8, #34d399, #38bdf8)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Kamatchi M
            </Box>
          </Typography>

          {/* Typing role */}
          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              color: "primary.main",
              minHeight: "1.6em",
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.35s forwards",
            }}
          >
            {typedRole}
            <span className="typing-cursor" />
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              mt: 2,
              fontSize: "1rem",
              color: "text.secondary",
              lineHeight: 1.8,
              maxWidth: { md: 480 },
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.45s forwards",
            }}
          >
            3+ years of professional experience building scalable web applications,
            RESTful APIs, CRM platforms, and enterprise e-commerce solutions.
          </Typography>

          {/* Tech Chips */}
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1.25,
              mt: 3.5,
              justifyContent: { xs: "center", md: "flex-start" },
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.55s forwards",
            }}
          >
            {TECH.map((s, i) => (
              <Chip
                key={s}
                label={s}
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "background.paper",
                  transition: "all 0.3s",
                  animationDelay: `${0.6 + i * 0.05}s`,
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                    bgcolor: "rgba(56,189,248,0.06)",
                    transform: "translateY(-2px)",
                  },
                }}
              />
            ))}
          </Stack>

          {/* CTA Buttons */}
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1.25, md: 1.75 },
              mt: { xs: 3.5, md: 4.5 },
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.7s forwards",
            }}
          >
            <Button
              variant="contained"
              href="#projects"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                color: "#000",
                fontWeight: 700,
                fontSize: { xs: "0.8rem", md: "0.85rem" },
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(56,189,248,0.4)",
                },
              }}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              href="#contact"
              sx={{
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                borderColor: "divider",
                color: "text.primary",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", md: "0.85rem" },
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Get in Touch
            </Button>
          </Stack>
        </Box>

        {/* Avatar */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            opacity: 0,
            transform: "scale(0.9)",
            "@keyframes zoomIn": { to: { opacity: 1, transform: "scale(1)" } },
            animation: "zoomIn 0.7s ease 0.3s forwards",
          }}
        >
          <Box
            sx={{
              width: { xs: 170, md: 230 },
              height: { xs: 170, md: 230 },
              borderRadius: "50%",
              p: "3px",
              background: "conic-gradient(#38bdf8, #818cf8, #34d399, #38bdf8)",
              animation: "spin 8s linear infinite",
              boxShadow: "0 0 60px rgba(56,189,248,0.15)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: "background.default",
                animation: "spin 8s linear infinite reverse",
              }}
            >
              <Box
                component="img"
                src={profileImg}
                alt="MuthuKamatchi"
                sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: -10,
              right: { xs: "calc(50% - 80px)", md: -10 },
              bgcolor: "#0f1f38",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              px: 1.75,
              py: 1,
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "success.main",
              letterSpacing: "0.5px",
              animation: "float 3s ease-in-out infinite",
              boxShadow: "0 4px 20px rgba(52,211,153,0.15)",
            }}
          >
            ✦ 3+ Yrs Exp
          </Box>
        </Box>
      </Container>

    </Box>
  );
}
