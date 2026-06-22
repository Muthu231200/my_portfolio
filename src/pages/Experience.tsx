import { Box, Typography, Container, Card, CardContent, Chip, Stack } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlined";

const EXPERIENCES = [
  {
    company: "IT Malar Private Limited",
    role: "Full Stack Developer",
    period: "2025 – Present",
    items: [
      "Developed a full-featured CRM platform using React.js, Node.js, and SQL for client management and sales tracking.",
      "Built an end-to-end e-commerce application with React, TypeScript, Node.js, and SQL — including product catalog, cart, checkout, and order management.",
      "Designed and optimized database schemas for high-performance queries and data integrity.",
      "Implemented secure authentication, role-based access control, and RESTful API architectures.",
      "Collaborated with cross-functional teams to deliver projects on schedule with clean, maintainable code.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "SQL", "REST APIs"],
    color: "#38bdf8",
  },
  {
    company: "Yeejai Technologies",
    role: "Software Developer",
    period: "2023 – 2025",
    items: [
      "Developed programs to automate processes and improve user experience across multiple client platforms.",
      "Installed, configured and updated WordPress core, plugins and themes — maintaining security and compatibility.",
      "Validated user input forms via regular expressions before database submission.",
      "Designed complex SSRS reports handling crore-scale datasets for call centre analytics.",
      "Built and maintained secure RESTful APIs for internal modules and external partner integrations.",
      "Provided technical support and troubleshooting for live software systems.",
    ],
    tech: ["WordPress", "PHP", "Node.js", "SQL Server", "SSRS", ".NET"],
    color: "#818cf8",
  },
];

export default function Experience() {
  return (
    <Container id="experience" maxWidth={false} sx={{ maxWidth: 1200, py: { xs: 4, md: 7.5 }, px: { xs: 2, md: 7.5 } }}>
      <Box className="reveal">
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
          Career
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "clamp(2rem,4vw,3rem)" }, color: "#fff", mb: 2, mt: 1.5 }}>
          Work Experience
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", maxWidth: 560, lineHeight: 1.7, mb: 4.5 }}>
          3+ years of professional development delivering scalable, real-world solutions across multiple domains.
        </Typography>
      </Box>

      {/* Timeline */}
      <Box
        sx={{
          position: "relative",
          pl: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: { xs: "5px", md: "7px" },
            width: 2,
            background: "linear-gradient(180deg, #38bdf8, #818cf8, #34d399)",
            borderRadius: 1,
          },
        }}
      >
        {EXPERIENCES.map((exp, i) => (
          <Card
            key={exp.company}
            className="reveal"
            sx={{
              position: "relative",
              overflow: "visible",
              transitionDelay: `${(i + 1) * 0.15}s`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${exp.color}, #34d399)`,
                borderRadius: "20px 20px 0 0",
              },
              "&:hover": {
                borderColor: `${exp.color}55`,
                boxShadow: `0 20px 60px ${exp.color}12`,
                transform: "translateY(-4px)",
              },
            }}
          >
            {/* Timeline dot */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: -35, md: -47 },
                top: 36,
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: "background.default",
                border: "3px solid",
                borderColor: exp.color,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 12px ${exp.color}40`,
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: exp.color }} />
            </Box>

            <CardContent sx={{ p: { xs: 2.5, md: 4 }, "&:last-child": { pb: { xs: 2.5, md: 4 } } }}>
              {/* Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 3,
                      bgcolor: `${exp.color}12`,
                      border: `1px solid ${exp.color}25`,
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.5,
                    }}
                  >
                    <WorkOutlineIcon sx={{ color: exp.color, fontSize: "1.2rem" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", md: "1.4rem" }, color: "#fff" }}>
                      {exp.company}
                    </Typography>
                    <Typography sx={{ color: "secondary.main", fontSize: "0.85rem", fontWeight: 500, mt: 0.5 }}>
                      {exp.role}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={exp.period}
                  size="small"
                  sx={{
                    bgcolor: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.25)",
                    color: "success.main",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: 100,
                  }}
                />
              </Box>

              {/* List */}
              <Box component="ul" sx={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 1.25, p: 0 }}>
                {exp.items.map((item, j) => (
                  <Box
                    component="li"
                    key={j}
                    sx={{
                      pl: 2.5,
                      position: "relative",
                      fontSize: { xs: "0.82rem", md: "0.9rem" },
                      color: "text.secondary",
                      lineHeight: 1.7,
                      transition: "color 0.2s",
                      "&:hover": { color: "text.primary" },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 10,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: exp.color,
                        opacity: 0.7,
                      },
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>

              {/* Tech tags */}
              <Stack
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                {exp.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: exp.color,
                      borderColor: `${exp.color}33`,
                      bgcolor: `${exp.color}0a`,
                      transition: "all 0.2s",
                      "&:hover": { bgcolor: `${exp.color}18`, transform: "translateY(-1px)" },
                    }}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
