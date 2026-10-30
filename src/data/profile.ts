// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this file to update the site.
// Anything marked TODO is a placeholder waiting for your real value.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Muthu Kamatchi M",
  shortName: "Muthu",
  role: "Full Stack Developer",
  location: "Aruppukkottai, Tamil Nadu",
  email: "muthukamatchi170167@gmail.com",
  phone: "+91 75399 98917",
  phoneHref: "tel:+917539998917",
  github: "https://github.com/Muthu231200",
  linkedin: "https://www.linkedin.com/in/muthu-kamatchi-3347701b3",
  resumeUrl: "/resume/Muthu_Kamatchi_Resume.pdf",
  intro:
    "I build mobile and web applications end to end — Flutter apps, React front ends and Node.js APIs — with a focus on clean UI, reliable API integration and process automation.",
  about: [
    "Software Developer with 2+ years of experience building mobile and web applications end to end. I'm currently developing the Mahinzo platform — customer, delivery partner and vendor mobile apps in Flutter, a React web application and Node.js backend APIs.",
    "Before that I delivered WordPress/WooCommerce sites, a Node.js WhatsApp bulk messaging system, a .NET logistics backend with CQRS and MongoDB, and SQL/SSRS call analytics reports.",
  ],
};

// Highlighted technologies in the Skills section (logos live in src/components/TechLogos.tsx).
// Remove or reorder entries freely; `color` is the brand colour used for glows and lines.
export const SKILL_SHOWCASE = [
  { id: "js", name: "JavaScript", role: "Language", color: "#F7DF1E" },
  { id: "node", name: "Node.js", role: "Runtime", color: "#5FA04E" },
  { id: "express", name: "Express.js", role: "API framework", color: "#E8E8E8" },
  { id: "react", name: "React", role: "UI library", color: "#61DAFB" },
  { id: "mysql", name: "MySQL", role: "Database", color: "#4479A1" },
  { id: "flutter", name: "Flutter", role: "Mobile apps", color: "#54C5F8" },
  { id: "redis", name: "Redis", role: "Cache", color: "#DC382D" },
  { id: "rest", name: "REST APIs", role: "Architecture", color: "#FF8A3D" },
] as const;

export type TechId = (typeof SKILL_SHOWCASE)[number]["id"];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3", "WordPress", "Laravel", "PHP"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST API design", "Python (Django)", ".NET", "CQRS"] },
  { group: "Mobile", items: ["Flutter", "Kotlin", "Android SDK"] },
  { group: "Database", items: ["MySQL", "Redis", "SQL Server", "MongoDB", "Stored procedures", "SSRS"] },
  { group: "Tools", items: ["Git", "Firebase", "WooCommerce", "whatsapp-web.js"] },
];

export type Project = {
  title: string;
  kind: string;
  category: "mobile" | "web" | "backend";
  featured?: boolean; // shown as a large card with app mockups
  highlights?: string[]; // featured only
  screens?: string[]; // featured only: one phone mockup per label
  desc: string;
  stack: string[];
  liveUrl?: string; // buttons only render when a URL is set
  codeUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Mahinzo",
    category: "mobile",
    featured: true,
    highlights: ["Customer, delivery partner and vendor apps", "React web application", "Shared Node.js backend APIs"],
    screens: ["Vendor", "Customer", "Delivery"],
    kind: "E-commerce platform",
    desc: "Multi-app commerce platform — customer, delivery partner and vendor apps in Flutter plus a React web app, all on shared Node.js APIs.",
    stack: ["Flutter", "React", "Node.js", "REST APIs"],
    liveUrl: undefined, // TODO: e.g. "https://mahinzo.com"
    codeUrl: undefined, // TODO: public repo link, if any
  },
  {
    title: "Kasupai",
    category: "mobile",
    featured: true,
    highlights: ["Photo capture of wastage products", "Real-time updates with Socket.IO", "REST API integration"],
    screens: ["Kasupai"],
    kind: "Wastage management app",
    desc: "“Turn your waste into cash” — Flutter app for managing wastage products, with photo capture, real-time Socket.IO updates and REST integration.",
    stack: ["Flutter", "Provider", "Dio", "Socket.IO"],
    liveUrl: undefined, // TODO: Play Store / web link
    codeUrl: undefined, // TODO
  },
  {
    title: "Aruvi Restaurant Platform",
    category: "web",
    kind: "Restaurant website",
    desc: "Restaurant website with digital menu, online ordering, table bookings and QR-code menu access.",
    stack: ["WordPress", "WooCommerce", "PHP"],
  },
  {
    title: "QR-WhatsApp Bulk Messaging",
    category: "backend",
    kind: "Automation",
    desc: "Bulk messaging system with QR-based session login, message queueing, templates and scheduling.",
    stack: ["Node.js", "whatsapp-web.js"],
  },
  {
    title: "Logistics Application",
    category: "backend",
    kind: "Backend services",
    desc: "Import/export backend — shipment tracking, inventory and customs documentation via CQRS handlers.",
    stack: [".NET", "CQRS", "MongoDB", "FluentValidation"],
  },
  {
    title: "Call Analytics Reports",
    category: "backend",
    kind: "Reporting",
    desc: "Stored-procedure reporting on call outcomes and durations, scheduled through SSRS.",
    stack: ["SQL", "Stored procedures", "SSRS"],
  },
  {
    title: "DAL Adulteration Detection",
    category: "mobile",
    kind: "Android app",
    desc: "Android front end for capturing food samples and showing adulteration analysis results.",
    stack: ["Kotlin", "Android SDK"],
  },
  {
    title: "Plant Disease Detection",
    category: "mobile",
    kind: "Android app",
    desc: "Android front end that sends leaf images to an ML API and shows disease predictions.",
    stack: ["Kotlin", "Android SDK"],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Developer",
    company: "IT Malar Private Limited",
    place: "Aruppukkottai",
    period: "2026 – Present",
    points: [
      "Developing the Mahinzo platform — customer, delivery partner and vendor apps in Flutter, a React web app and a Node.js backend.",
      "Built ordering, browsing and order-tracking flows on mobile and web.",
      "Integrated backend APIs, fixed bugs and shipped releases across all Mahinzo apps.",
    ],
  },
  {
    role: "Software Developer",
    company: "Yeejai Technologies",
    place: "",
    period: "2024 – 2026",
    points: [
      "Built and maintained full-stack web apps that automate business workflows.",
      "Maintained WordPress core, plugins and themes for security and performance.",
      "Built SQL stored-procedure call analytics and SSRS reports and dashboards.",
      "Contributed Android UI screens in Kotlin.",
    ],
  },
];

export const EDUCATION = [
  { title: "Python Full Stack Course", place: "Uniq Technologies", period: "Sep 2023 – Feb 2024" },
  { title: "M.Sc. Mathematics", place: "SBK College, Aruppukkottai", period: "2020 – 2022" },
  { title: "B.Sc.", place: "SBK College, Aruppukkottai", period: "2017 – 2020" },
];
