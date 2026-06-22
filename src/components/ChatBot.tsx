import { useState, useRef, useEffect } from "react";
import {
  Box, Fab, Paper, Typography, TextField, IconButton, Zoom, Fade, Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { sendEmail } from "../utils/sendEmail";

type View = "chat" | "email" | "call";

interface Message {
  from: "bot" | "user";
  text: string;
  actions?: { label: string; action: View }[];
}

const QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hi", "hello", "hey", "greet"],
    answer: "Hey there! I'm MK Bot, Muthu Kamatchi's virtual assistant. Ask me anything about his skills, experience, or projects!",
  },
  {
    keywords: ["skill", "tech", "stack", "technology", "know", "language"],
    answer: "Muthu is proficient in React, TypeScript, Node.js, Express, SQL Server, PHP, WordPress, Python, .NET, MongoDB, and more. He specializes in full-stack web development.",
  },
  {
    keywords: ["experience", "work", "year", "company", "job"],
    answer: "Muthu has 3+ years of professional experience. He worked at Yeejai Technologies (2023–2025) as a Software Developer and is currently at IT Malar Private Limited (2025–Present) as a Full Stack Developer.",
  },
  {
    keywords: ["project", "build", "built", "portfolio", "crm", "ecommerce"],
    answer: "Key projects include a CRM Platform (React, Node.js, SQL), E-Commerce App (React, TypeScript, Node.js), WhatsApp Bulk Messaging System, Logistics Management App, and more. Check the Projects section for details!",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "hire", "freelance", "call", "mail", "message"],
    answer: "You can reach Muthu directly! Use the buttons below to send an email or make a call.",
  },
  {
    keywords: ["education", "degree", "college", "study", "university"],
    answer: "Muthu holds an M.Sc in Mathematics (2022) from SBK College, Aruppukottai. His strong analytical background helps him architect robust software solutions.",
  },
  {
    keywords: ["location", "where", "city", "place", "based"],
    answer: "Muthu is based in Aruppukkottai, Tamil Nadu, India (626101). He's open to remote opportunities as well.",
  },
  {
    keywords: ["react", "frontend", "typescript", "ui"],
    answer: "Muthu has strong expertise in React and TypeScript, building responsive UIs, component architectures, state management, and modern frontend patterns.",
  },
  {
    keywords: ["node", "backend", "express", "api", "server"],
    answer: "On the backend, Muthu builds scalable RESTful APIs with Node.js and Express, handling authentication, database integration, and queue management systems.",
  },
  {
    keywords: ["sql", "database", "data", "mysql", "ssrs"],
    answer: "Muthu has deep SQL expertise — designing schemas, writing complex queries, building SSRS reports on crore-scale datasets, and optimizing database performance.",
  },
  {
    keywords: ["linkedin", "github", "social", "profile"],
    answer: "Find Muthu on LinkedIn: linkedin.com/in/muthu-kamatchi-3347701b3 and GitHub: github.com/muthukamatchi",
  },
  {
    keywords: ["malar", "it malar"],
    answer: "At IT Malar Private Limited (2025–Present), Muthu is building a full-featured CRM platform and an end-to-end e-commerce application using React, TypeScript, Node.js, and SQL.",
  },
  {
    keywords: ["yeejai"],
    answer: "At Yeejai Technologies (2023–2025), Muthu developed WordPress solutions, SSRS reports, bulk messaging systems, and RESTful APIs for multiple client platforms.",
  },
];

const CONTACT_KEYWORDS = ["contact", "email", "phone", "reach", "hire", "freelance", "call", "mail", "message"];

const SUGGESTIONS = ["Skills", "Experience", "Projects", "Contact", "Education"];

function findAnswer(input: string): Message {
  const lower = input.toLowerCase();
  const isContact = CONTACT_KEYWORDS.some((kw) => lower.includes(kw));

  for (const qa of QA) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return {
        from: "bot",
        text: qa.answer,
        ...(isContact && {
          actions: [
            { label: "Send Email", action: "email" as View },
            { label: "Call Now", action: "call" as View },
          ],
        }),
      };
    }
  }
  return {
    from: "bot",
    text: "I'm not sure about that. Try asking about Muthu's skills, experience, projects, education, or contact details!",
  };
}

function EmailForm({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSend = async () => {
    setStatus("sending");
    const ok = await sendEmail({ name, email, message: msg });
    setStatus(ok ? "sent" : "error");
  };

  if (status === "sent") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Box sx={{ fontSize: "2.5rem", mb: 1.5, animation: "sentBounce 0.5s ease", "@keyframes sentBounce": { "0%": { transform: "scale(0)" }, "50%": { transform: "scale(1.2)" }, "100%": { transform: "scale(1)" } } }}>
          ✅
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", mb: 0.5 }}>Message Sent!</Typography>
        <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 2 }}>
          Muthu will get back to you soon.
        </Typography>
        <Button size="small" onClick={onBack} startIcon={<ArrowBackIcon />} sx={{ color: "primary.main", fontSize: "0.78rem" }}>
          Back to chat
        </Button>
      </Box>
    );
  }

  const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.82rem", bgcolor: "rgba(255,255,255,0.03)", "& fieldset": { borderColor: "divider" } } };

  return (
    <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <IconButton size="small" onClick={onBack} sx={{ color: "text.secondary" }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>Send a Message</Typography>
      </Box>
      <TextField size="small" placeholder="Your Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={inputSx} />
      <TextField size="small" placeholder="Your Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={inputSx} />
      <TextField size="small" placeholder="Your Message" fullWidth multiline rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} sx={inputSx} />
      {status === "error" && (
        <Typography sx={{ fontSize: "0.75rem", color: "error.main", textAlign: "center" }}>
          Failed to send. Please try again or email directly.
        </Typography>
      )}
      <Button
        fullWidth variant="contained" onClick={handleSend}
        disabled={!name.trim() || !email.trim() || !msg.trim() || status === "sending"}
        startIcon={status === "sending" ? <CircularProgress size={16} sx={{ color: "#000" }} /> : <EmailIcon />}
        sx={{
          mt: 0.5, py: 1.2, borderRadius: 2,
          background: "linear-gradient(135deg, #38bdf8, #818cf8)",
          color: "#000", fontWeight: 700, fontSize: "0.82rem",
          "&:hover": { boxShadow: "0 8px 24px rgba(56,189,248,0.35)" },
          "&.Mui-disabled": { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" },
        }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </Box>
  );
}

function CallView({ onBack }: { onBack: () => void }) {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Box
        sx={{
          width: 72, height: 72, borderRadius: "50%", mx: "auto", mb: 2.5,
          bgcolor: "rgba(52,211,153,0.1)", border: "2px solid rgba(52,211,153,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "callRing 1.5s ease-in-out infinite",
          "@keyframes callRing": {
            "0%,100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.4)" },
            "50%": { boxShadow: "0 0 0 16px rgba(52,211,153,0)" },
          },
        }}
      >
        <PhoneIcon sx={{ fontSize: 30, color: "success.main" }} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.5 }}>Call Muthu Directly</Typography>
      <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1 }}>
        Tap the button to dial immediately
      </Typography>
      <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", mb: 2.5, opacity: 0.7 }}>
        Mon–Sat, 9 AM – 7 PM IST
      </Typography>
      <Button
        variant="contained"
        component="a"
        href="tel:+917539998917"
        startIcon={<PhoneIcon />}
        fullWidth
        sx={{
          py: 1.4, borderRadius: 2, mb: 1,
          bgcolor: "success.main", color: "#000", fontWeight: 700, fontSize: "0.9rem",
          textDecoration: "none",
          "&:hover": { bgcolor: "#2ac084", boxShadow: "0 8px 24px rgba(52,211,153,0.35)" },
        }}
      >
        +91 75399 98917
      </Button>
      <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", mb: 2, opacity: 0.6 }}>
        Opens your phone dialer
      </Typography>
      <Button size="small" onClick={onBack} startIcon={<ArrowBackIcon />} sx={{ color: "primary.main", fontSize: "0.78rem" }}>
        Back to chat
      </Button>
    </Box>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! I'm MK Bot. Ask me about Muthu's skills, projects, or experience — or get in touch directly!",
      actions: [
        { label: "Send Email", action: "email" },
        { label: "Call Now", action: "call" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, findAnswer(userMsg)]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* FAB */}
      <Zoom in={!open}>
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 28 },
            right: { xs: 20, sm: 28 },
            zIndex: 1300,
            width: { xs: 50, sm: 56 },
            height: { xs: 50, sm: 56 },
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            color: "#000",
            boxShadow: "0 8px 32px rgba(56,189,248,0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #818cf8, #38bdf8)",
              transform: "scale(1.08)",
            },
            animation: "fabPulse 2s ease-in-out infinite",
            "@keyframes fabPulse": {
              "0%,100%": { boxShadow: "0 8px 32px rgba(56,189,248,0.4)" },
              "50%": { boxShadow: "0 8px 48px rgba(56,189,248,0.7)" },
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Zoom>

      {/* Chat panel */}
      <Fade in={open}>
        <Paper
          elevation={24}
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 28 },
            right: { xs: 16, sm: 28 },
            zIndex: 1300,
            width: { xs: "calc(100vw - 32px)", sm: 390 },
            maxHeight: { xs: "70vh", sm: 560 },
            display: open ? "flex" : "none",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(99,179,237,0.15)",
            bgcolor: "#0a1628",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #38bdf8, #818cf8)",
              px: 2.5,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SmartToyIcon sx={{ fontSize: 28, color: "#000" }} />
              <Box>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#000" }}>
                  MK Bot
                </Typography>
                <Typography sx={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.6)", fontWeight: 500 }}>
                  Chat · Email · Call
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: "#000" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* View: Email form */}
          {view === "email" && <EmailForm onBack={() => setView("chat")} />}

          {/* View: Call */}
          {view === "call" && <CallView onBack={() => setView("chat")} />}

          {/* View: Chat */}
          {view === "chat" && (
            <>
              {/* Messages */}
              <Box
                ref={scrollRef}
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  px: 2,
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  "&::-webkit-scrollbar": { width: 3 },
                  "&::-webkit-scrollbar-thumb": { bgcolor: "#38bdf8", borderRadius: 2 },
                }}
              >
                {messages.map((msg, i) => (
                  <Box key={i}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                        animation: "msgSlide 0.3s ease",
                        "@keyframes msgSlide": {
                          from: { opacity: 0, transform: `translateY(8px) translateX(${msg.from === "user" ? "8px" : "-8px"})` },
                          to: { opacity: 1, transform: "translateY(0) translateX(0)" },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "82%",
                          px: 2,
                          py: 1.25,
                          borderRadius: msg.from === "user"
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                          bgcolor: msg.from === "user"
                            ? "rgba(56,189,248,0.15)"
                            : "rgba(255,255,255,0.05)",
                          border: "1px solid",
                          borderColor: msg.from === "user"
                            ? "rgba(56,189,248,0.25)"
                            : "rgba(255,255,255,0.08)",
                          fontSize: "0.82rem",
                          lineHeight: 1.6,
                          color: "text.primary",
                        }}
                      >
                        {msg.text}
                      </Box>
                    </Box>
                    {/* Action buttons below message */}
                    {msg.actions && (
                      <Box sx={{ display: "flex", gap: 1, mt: 1, pl: 0.5 }}>
                        {msg.actions.map((a) => (
                          <Button
                            key={a.label}
                            size="small"
                            variant="outlined"
                            startIcon={a.action === "email" ? <EmailIcon /> : <PhoneIcon />}
                            onClick={() => setView(a.action)}
                            sx={{
                              borderRadius: 100,
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              py: 0.5,
                              px: 1.5,
                              borderColor: a.action === "email" ? "rgba(56,189,248,0.3)" : "rgba(52,211,153,0.3)",
                              color: a.action === "email" ? "primary.main" : "success.main",
                              "&:hover": {
                                borderColor: a.action === "email" ? "primary.main" : "success.main",
                                bgcolor: a.action === "email" ? "rgba(56,189,248,0.08)" : "rgba(52,211,153,0.08)",
                              },
                            }}
                          >
                            {a.label}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
                {typing && (
                  <Box sx={{ display: "flex", gap: 0.5, pl: 1, py: 0.5 }}>
                    {[0, 1, 2].map((d) => (
                      <Box
                        key={d}
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          animation: "dotBounce 1.2s ease-in-out infinite",
                          animationDelay: `${d * 0.15}s`,
                          "@keyframes dotBounce": {
                            "0%,60%,100%": { transform: "translateY(0)", opacity: 0.4 },
                            "30%": { transform: "translateY(-8px)", opacity: 1 },
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Quick replies + action bar */}
              {messages.length <= 2 && (
                <Box sx={{ px: 2, pb: 1, display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {SUGGESTIONS.map((s) => (
                    <Box
                      key={s}
                      onClick={() => send(s)}
                      sx={{
                        px: 1.5, py: 0.5, borderRadius: 100,
                        fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                        bgcolor: "rgba(56,189,248,0.08)",
                        border: "1px solid rgba(56,189,248,0.2)",
                        color: "primary.main",
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: "rgba(56,189,248,0.15)", transform: "translateY(-1px)" },
                      }}
                    >
                      {s}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Input */}
              <Box
                sx={{
                  px: 1.5,
                  py: 1.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Ask me something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 100,
                      fontSize: "0.82rem",
                      bgcolor: "rgba(255,255,255,0.03)",
                      "& fieldset": { borderColor: "divider" },
                      "&:hover fieldset": { borderColor: "rgba(56,189,248,0.3)" },
                      "&.Mui-focused fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
                <IconButton
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  sx={{
                    bgcolor: "rgba(56,189,248,0.1)",
                    color: "primary.main",
                    "&:hover": { bgcolor: "rgba(56,189,248,0.2)" },
                    "&.Mui-disabled": { color: "text.secondary", bgcolor: "transparent" },
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </>
          )}
        </Paper>
      </Fade>
    </>
  );
}
