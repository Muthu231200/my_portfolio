const PROJECTS = [
  {
    title: "WhatsApp Bulk Messaging System",
    desc: "Engineered a high-performance bulk messaging platform using whatsapp-web.js and Node.js to automate outreach for 10k+ contacts with queue management.",
    tags: ["Node.js", "PHP", "WhatsApp Web.js", "SQL", "BullMQ"],
    icon: "💬", color: "#25d366",
  },
  {
    title: "Logistics Management Application",
    desc: "Built robust backend services for import/export logistics — shipment tracking, inventory, customs docs, and scalable RESTful APIs using .NET.",
    tags: [".NET", "CQRS", "MongoDB", "REST API"],
    icon: "🚚", color: "#f59e0b",
  },
  {
    title: "Aruvi Restaurant Platform",
    desc: "Developed a full restaurant management system using WordPress and WooCommerce — menu management, ordering, and customer experience features.",
    tags: ["WordPress", "WooCommerce", "PHP", "SQL"],
    icon: "🍽️", color: "#ef4444",
  },
  {
    title: "SQL Report Generation Engine",
    desc: "Designed and optimised SSRS reports running against crore-scale datasets — tracking attended calls, retry counts, busy/no-answer metrics with drill-down dashboards.",
    tags: ["SQL Server", "SSRS", "Stored Procs", "SSIS"],
    icon: "📊", color: "#38bdf8",
  },
  {
    title: "Video Ringtone Calling System",
    desc: "Implemented a system where a video plays as a caller tune using Node.js, BullMQ job queues, and Firebase push notifications.",
    tags: ["Node.js", "BullMQ", "Firebase", "FFmpeg"],
    icon: "📹", color: "#8b5cf6",
  },
  {
    title: "Plant & Adulteration Detection",
    desc: "Built Android applications for plant disease diagnosis and food adulteration detection powered by ML-based image classification.",
    tags: ["Android", "TensorFlow Lite", "Java"],
    icon: "🌿", color: "#10b981",
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="reveal">
        <div className="section-label">Work</div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-sub">A selection of systems and applications built with a focus on scale, performance, and clean architecture.</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div
            className={`proj-card reveal reveal-delay-${(i % 3) + 1}`}
            key={p.title}
            style={{
              "--card-color": p.color,
              "--glow": `${p.color}18`,
              "--glow-border": `${p.color}55`,
              "--glow-shadow": `${p.color}18`,
              "--icon-bg": `${p.color}18`,
              "--icon-border": `${p.color}33`,
            } as React.CSSProperties}
          >
            <div className="proj-accent" />
            <div className="proj-top">
              <div className="proj-icon">{p.icon}</div>
              <span className="proj-num">0{i + 1}</span>
            </div>
            <div className="proj-title">{p.title}</div>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tags">
              {p.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
