import { useEffect } from "react";

const SKILLS = [
  { name: "WordPress & PHP", pct: 90 },
  { name: "Node.js / Express", pct: 82 },
  { name: "SQL / Reporting Services", pct: 85 },
  { name: "React / JavaScript", pct: 78 },
  { name: "Python / Django", pct: 70 },
  { name: ".NET Framework", pct: 72 },
];

export default function About() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate")),
      { threshold: 0.3 }
    );
    bars.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="about">
      <div className="about-grid">
        <div className="about-text reveal">
          <div className="section-label">Profile</div>
          <h2 className="section-title">Building Things<br />That Actually Work</h2>
          <p>Dynamic Software Developer with a proven track record at Yeejai Technologies, excelling in automating processes and enhancing user experiences.</p>
          <p>Proficient in WordPress, SQL, and Node.js — delivering impactful solutions including complex SSRS report designs, bulk messaging systems, and secure database architectures.</p>
          <p>M.Sc Mathematics (2022) — SBK College, Aruppukottai. Strong analytical background applied to real-world software problems.</p>
          <div className="stat-row">
            <div className="stat-card"><div className="stat-num">2+</div><div className="stat-label">Years Exp</div></div>
            <div className="stat-card"><div className="stat-num">6+</div><div className="stat-label">Projects</div></div>
            <div className="stat-card"><div className="stat-num">10+</div><div className="stat-label">Tech Stack</div></div>
          </div>
        </div>
        <div className="skills-block reveal reveal-delay-2">
          <div className="section-label" style={{ marginBottom: 20 }}>Tech Skills</div>
          {SKILLS.map((s) => (
            <div className="skill-row" key={s.name}>
              <div className="skill-header">
                <span>{s.name}</span>
                <span style={{ color: "var(--accent)" }}>{s.pct}%</span>
              </div>
              <div className="skill-bar-bg">
                <div className="skill-bar" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
