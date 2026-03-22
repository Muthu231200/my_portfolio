import profileImg from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div>
          <div className="hero-tag"><span className="dot" />Full Stack Developer · Open to Freelance</div>
          <h1 className="hero-name">
            Muthu<br /><span className="line2">Kamatchi M</span>
          </h1>
          <p className="hero-role">
            Software Developer with 2+ years at Yeejai Technologies — building scalable backends, WordPress platforms, bulk messaging systems, and SQL reporting engines.
          </p>
          <div className="hero-chips">
            {["WordPress", "Node.js", "PHP", "SQL", "Python", "React", ".NET"].map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-ghost">Get in Touch</a>
          </div>
        </div>
        <div className="hero-avatar-wrap">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <img src={profileImg} alt="MuthuKamatchi" />
            </div>
          </div>
          <div className="avatar-badge">✦ 2 Yrs Exp</div>
        </div>
      </div>
    </section>
  );
}
