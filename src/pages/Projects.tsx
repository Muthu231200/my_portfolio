function Projects() {
  const projectList = [
    {
      title: "WhatsApp Bulk Messaging System",
      description: "Built a system to send bulk WhatsApp messages using WhatsApp Web integration with Node.js and PHP backend.",
      tags: ["Node.js", "PHP", "WhatsApp API", "SQL"],
      icon: "💬",
      color: "#25d366",
    },
    {
      title: "Logistics Management Application",
      description: "Developed a CRUD-based logistics application using .NET with CQRS architecture for efficient data handling.",
      tags: [".NET", "CQRS", "MongoDB"],
      icon: "🚚",
      color: "#f59e0b",
    },
    {
      title: "Inventory Management System",
      description: "Created an inventory management solution using WordPress and WooCommerce for product tracking and management.",
      tags: ["WordPress", "WooCommerce", "PHP"],
      icon: "📦",
      color: "#8b5cf6",
    },
    {
      title: "Video Ringtone Calling System",
      description: "Implemented a system where video plays instead of caller tune using Node.js, BullMQ, and Firebase notifications.",
      tags: ["Node.js", "BullMQ", "Firebase"],
      icon: "📹",
      color: "#ef4444",
    },
    {
      title: "Video Campaign Notification System",
      description: "Developed a campaign system where expiry triggers notifications to users using Firebase and backend processing.",
      tags: ["Firebase", "Node.js", "Push Notifications"],
      icon: "📣",
      color: "#06b6d4",
    },
    {
      title: "Plant & Adulteration Detection",
      description: "Developed Android applications to detect plant diseases and food adulteration using mobile-based image processing and ML integration.",
      tags: ["Android"],
      icon: "🌿",
      color: "#10b981",
    },
  ];

  return (
    <div className="projects">
      <div className="projects-header">
        <h2>Featured Projects</h2>
      </div>
      <div className="project-grid">
        {projectList.map((project, index) => (
          <div className="project-card" key={index} style={{ "--card-color": project.color } as React.CSSProperties}>
            <div className="card-accent" />
            <div className="card-top">
              <div className="card-icon">{project.icon}</div>
              <span className="card-number">0{index + 1}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="card-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;