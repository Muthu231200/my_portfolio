import { useState } from "react";
import {
  Box, Typography, Container, Grid, Card, Stack, TextField, Button, CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import { sendEmail } from "../utils/sendEmail";

const LINKS = [
  { icon: <EmailIcon />, label: "Email", value: "muthukamatchi170167@gmail.com", href: "mailto:muthukamatchi170167@gmail.com", color: "#38bdf8" },
  { icon: <PhoneIcon />, label: "Phone", value: "+91 75399 98917", href: "tel:+917539998917", color: "#34d399" },
  { icon: <LinkedInIcon />, label: "LinkedIn", value: "muthu-kamatchi-3347701b3", href: "https://www.linkedin.com/in/muthu-kamatchi-3347701b3", external: true, color: "#0a66c2" },
  { icon: <GitHubIcon />, label: "GitHub", value: "muthukamatchi", href: "https://github.com/muthukamatchi", external: true, color: "#818cf8" },
];

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    const ok = await sendEmail({ name, email, phone, message: msg });
    if (ok) {
      setStatus("sent");
      setName(""); setEmail(""); setPhone(""); setMsg("");
    } else {
      setStatus("error");
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      fontSize: "0.88rem",
      bgcolor: "rgba(255,255,255,0.03)",
      "& fieldset": { borderColor: "divider" },
      "&:hover fieldset": { borderColor: "rgba(56,189,248,0.3)" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "text.secondary" },
  };

  return (
    <Card sx={{ p: { xs: 3, md: 4 }, position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #38bdf8, #818cf8, #34d399)" }} />
      <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", mb: 0.5 }}>
        Send Me a Message
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 3 }}>
        I'll receive your message directly in my inbox and respond promptly.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Name" size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={inputSx} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Email" size="small" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={inputSx} />
          </Grid>
        </Grid>
        <TextField label="Phone (optional)" size="small" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} sx={inputSx} />
        <TextField label="Message" size="small" fullWidth multiline rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} sx={inputSx} />

        {status === "sent" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 2, px: 2, py: 1 }}>
            <Typography sx={{ fontSize: "1rem" }}>&#10003;</Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "success.main", fontWeight: 600 }}>Message sent successfully! I'll get back to you soon.</Typography>
          </Box>
        )}
        {status === "error" && (
          <Typography sx={{ fontSize: "0.78rem", color: "error.main", textAlign: "center" }}>
            Failed to send. Please try again or email me directly.
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!name.trim() || !email.trim() || !msg.trim() || status === "sending"}
          startIcon={status === "sending" ? <CircularProgress size={18} sx={{ color: "#000" }} /> : <SendIcon />}
          sx={{
            py: 1.5, borderRadius: 2,
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            color: "#000", fontWeight: 700, fontSize: "0.88rem",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(56,189,248,0.35)" },
            "&.Mui-disabled": { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" },
          }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </Box>
    </Card>
  );
}

export default function Contact() {
  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(10,22,40,0.6)",
        pt: { xs: 5, md: 7.5 },
        pb: { xs: 3, md: 4 },
        px: { xs: 2, md: 7.5 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: -200, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1100, position: "relative" }}>
        {/* Header */}
        <Box className="reveal" sx={{ textAlign: { xs: "left", md: "center" }, mb: 5 }}>
          <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem" }}>
            Let's Talk
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "clamp(1.6rem,7vw,2.2rem)", md: "clamp(1.8rem,4vw,3rem)" }, color: "#fff", mb: 2, mt: 1.5 }}>
            Get in Touch
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 520, mx: { md: "auto" } }}>
            Have a project in mind or want to collaborate? Send me a message directly — I'll receive it in my inbox and respond promptly.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ mb: 7.5 }}>
          {/* Left: Contact form */}
          <Grid size={{ xs: 12, md: 7 }} className="reveal">
            <ContactForm />
          </Grid>

          {/* Right: Links + availability */}
          <Grid size={{ xs: 12, md: 5 }} className="reveal" sx={{ transitionDelay: "0.2s" }}>
            <Stack sx={{ gap: 2 }}>
              {/* Availability badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main",
                    "@keyframes contactPulse": {
                      "0%,100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.5)" },
                      "50%": { boxShadow: "0 0 0 6px rgba(52,211,153,0)" },
                    },
                    animation: "contactPulse 2s infinite",
                  }}
                />
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "success.main" }}>
                  Available for hire
                </Typography>
              </Box>

              {LINKS.map((link, i) => (
                <Card
                  key={link.label}
                  component="a"
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="reveal"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.75,
                    px: { xs: 2, md: 2.5 },
                    py: { xs: 1.75, md: 2 },
                    textDecoration: "none",
                    color: "text.primary",
                    cursor: "pointer",
                    transitionDelay: `${(i + 1) * 0.1}s`,
                    "&:hover": {
                      borderColor: link.color,
                      transform: "translateX(6px)",
                      color: link.color,
                      boxShadow: `0 8px 30px ${link.color}15`,
                      "& .contact-icon-box": { bgcolor: `${link.color}15`, borderColor: `${link.color}30` },
                    },
                  }}
                >
                  <Box
                    className="contact-icon-box"
                    sx={{
                      width: 40, height: 40, borderRadius: 2.5,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      bgcolor: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)",
                      flexShrink: 0, transition: "all 0.3s",
                      "& svg": { fontSize: "1.15rem" },
                    }}
                  >
                    {link.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", mb: 0.25 }}>{link.label}</Typography>
                    <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" }, color: "text.secondary", wordBreak: "break-all" }}>{link.value}</Typography>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            borderTop: "1px solid", borderColor: "divider", pt: 3.5,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 1.5, flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
            &copy; {new Date().getFullYear()} MuthuKamatchi M. All rights reserved.
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
            Aruppukkottai, Tamil Nadu 626101
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
