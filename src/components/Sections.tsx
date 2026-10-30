import { useState, type FormEvent } from "react";
import aboutImg from "../assets/about.jpg";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from "../data/profile";
import { emailConfigured, sendEmail } from "../utils/sendEmail";
import ProjectList from "./Projects";
import SkillShowcase from "./SkillShowcase";
import { ArrowIcon, CapIcon, CheckIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="section-head reveal">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

// Only facts from the resume: years from the About text, project count from PROJECTS, Mahinzo's three apps.
const STATS = [
  { value: "2+", label: "Years experience" },
  { value: String(PROJECTS.length), label: "Projects built" },
  { value: "3", label: "Mahinzo apps" },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead title="About" />
        <div className="about">
          <figure className="about__photo reveal">
            <img src={aboutImg} alt={`${PROFILE.name} at work`} width={720} height={900} loading="lazy" />
            <figcaption>
              <span className="dot" aria-hidden /> Currently at {EXPERIENCE[0].company}
            </figcaption>
          </figure>

          <div className="about__main">
            <div className="about__copy reveal">
              {PROFILE.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <dl className="stats reveal">
              {STATS.map((s) => (
                <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
            <ul className="about__facts reveal">
              <li><PinIcon size={16} /> {PROFILE.location}</li>
              <li><CheckIcon size={16} /> {PROFILE.role}</li>
              <li><CheckIcon size={16} /> Flutter · React · Node.js</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section section--tint">
      <div className="container">
        <SectionHead title="Skills" sub="Tools I use to ship mobile apps, web apps and the APIs behind them." />
        <SkillShowcase />
        <h3 className="subhead reveal">Full toolkit</h3>
        <div className="skills">
          {SKILLS.map((s) => (
            <div className="skill-card reveal" key={s.group}>
              <h3>{s.group}</h3>
              <ul className="tags">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead title="Projects" sub="Apps, platforms and systems I've built — from mobile apps to backend services." />

        <ProjectList />
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="container">
        <SectionHead title="Experience" />
        <ol className="timeline">
          {EXPERIENCE.map((e, i) => (
            <li className="timeline__item reveal" key={e.company}>
              <span className={`timeline__dot${i === 0 ? " is-current" : ""}`} aria-hidden />
              <div className="timeline__card">
                <div className="timeline__top">
                  <span className="timeline__period">{e.period}</span>
                  {i === 0 && <span className="timeline__now">Current</span>}
                </div>
                <h3>{e.role}</h3>
                <p className="timeline__company">{e.company}{e.place && `, ${e.place}`}</p>
                <ul>
                  {e.points.map((p) => <li key={p}><CheckIcon size={15} /> {p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="subhead reveal">Education &amp; courses</h3>
        <ul className="edu">
          {EDUCATION.map((e) => (
            <li className="edu__card reveal" key={e.title}>
              <span className="edu__icon"><CapIcon size={20} /></span>
              <span className="edu__period">{e.period}</span>
              <strong>{e.title}</strong>
              <span className="edu__place">{e.place}</span>
            </li>
          ))}
        </ul>

        <div className="resume-cta reveal">
          <div>
            <h3>Want the full picture?</h3>
            <p>Download my resume as a PDF.</p>
          </div>
          <a className="btn" href={PROFILE.resumeUrl} download>
            <DownloadIcon size={16} /> Download resume
          </a>
        </div>
      </div>
    </section>
  );
}

const CONTACTS = [
  { Icon: MailIcon, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { Icon: PhoneIcon, label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
  { Icon: LinkedInIcon, label: "LinkedIn", value: "Connect with me", href: PROFILE.linkedin, external: true },
  { Icon: GitHubIcon, label: "GitHub", value: "See my code", href: PROFILE.github, external: true },
  { Icon: PinIcon, label: "Location", value: PROFILE.location },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as { name: string; email: string; message: string };

    if (!emailConfigured) {
      // No EmailJS keys yet: hand off to the visitor's mail app instead.
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    const ok = await sendEmail(data);
    setStatus(ok ? "sent" : "error");
    if (ok) form.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead title="Let's work together"sub="Have a project or role in mind? I'd like to hear about it." />
        <div className="contact">
          <div className="contact__side reveal">
            <p className="contact__pitch">
              Open to full-time roles and freelance work in <span className="accent">mobile, web and backend</span> development.
            </p>
            <ul className="contact__list">
              {CONTACTS.map(({ Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="contact__icon"><Icon size={20} /></span>
                    <span className="contact__text"><small>{label}</small>{value}</span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a className="contact__card" href={href} {...(external && { target: "_blank", rel: "noreferrer" })}>
                        {inner}
                        <span className="contact__go"><ArrowIcon size={16} /></span>
                      </a>
                    ) : (
                      <div className="contact__card">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <form className="contact__form reveal" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required />
            </label>
            <button className="btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"} <ArrowIcon size={16} />
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status === "sent" && "Thanks — your message was sent."}
              {status === "error" && `Couldn't send right now. Please email ${PROFILE.email}.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
