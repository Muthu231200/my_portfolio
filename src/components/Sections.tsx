import { useState, type FormEvent } from "react";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from "../data/profile";
import { emailConfigured, sendEmail } from "../utils/sendEmail";
import SkillShowcase from "./SkillShowcase";
import { ArrowIcon, DownloadIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

function SectionHead({ index, title, sub }: { index: string; title: string; sub?: string }) {
  return (
    <div className="section-head reveal">
      <span className="section-head__index">{index}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" title="About" />
        <div className="about">
          <div className="about__copy reveal">
            {PROFILE.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
          <dl className="about__facts reveal">
            <div><dt>Role</dt><dd>{PROFILE.role}</dd></div>
            <div><dt>Currently</dt><dd>{EXPERIENCE[0].company}</dd></div>
            <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
            <div><dt>Focus</dt><dd>Flutter apps, React, Node.js APIs</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section section--tint">
      <div className="container">
        <SectionHead index="02" title="Skills" sub="Tools I use to ship mobile apps, web apps and the APIs behind them." />
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
        <SectionHead index="03" title="Projects" sub="Products and systems I've built." />

        <div className="projects">
          {PROJECTS.map((p, i) => (
            <article className="project reveal" key={p.title}>
              <div className="project__top">
                <span className="project__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="project__kind">{p.kind}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="project__desc">{p.desc}</p>
              <ul className="tags">
                {p.stack.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {(p.liveUrl || p.codeUrl) && (
                <div className="project__links">
                  {p.liveUrl && (
                    <a className="btn btn--small" href={p.liveUrl} target="_blank" rel="noreferrer">
                      Live <ExternalIcon size={14} />
                    </a>
                  )}
                  {p.codeUrl && (
                    <a className="btn btn--small btn--ghost" href={p.codeUrl} target="_blank" rel="noreferrer">
                      <GitHubIcon size={14} /> Code
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="container">
        <SectionHead index="04" title="Experience" />
        <ol className="timeline">
          {EXPERIENCE.map((e) => (
            <li className="timeline__item reveal" key={e.company}>
              <div className="timeline__meta">
                <span className="timeline__period">{e.period}</span>
              </div>
              <div className="timeline__body">
                <h3>{e.role}</h3>
                <p className="timeline__company">{e.company}{e.place && `, ${e.place}`}</p>
                <ul>
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="subhead reveal">Education &amp; courses</h3>
        <ul className="edu">
          {EDUCATION.map((e) => (
            <li className="reveal" key={e.title}>
              <strong>{e.title}</strong>
              <span>{e.place}</span>
              <span className="edu__period">{e.period}</span>
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
        <SectionHead index="05" title="Contact" sub="Have a project or role in mind? I'd like to hear about it." />
        <div className="contact">
          <ul className="contact__list reveal">
            <li><MailIcon /><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li><PhoneIcon /><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
            <li><PinIcon /><span>{PROFILE.location}</span></li>
            <li><GitHubIcon /><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><LinkedInIcon /><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>

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
