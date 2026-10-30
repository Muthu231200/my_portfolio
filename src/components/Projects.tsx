import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import gsap from "gsap";
import { PROJECTS, type Project } from "../data/profile";
import { CheckIcon, ExternalIcon, GitHubIcon, MobileIcon, ServerIcon, WebIcon } from "./Icons";

const CATEGORY = {
  mobile: { label: "Mobile", Icon: MobileIcon },
  web: { label: "Web", Icon: WebIcon },
  backend: { label: "Backend", Icon: ServerIcon },
} as const;
type Filter = "all" | Project["category"];

const featured = PROJECTS.filter((p) => p.featured);
const others = PROJECTS.filter((p) => !p.featured);
const filters: Filter[] = ["all", ...(Object.keys(CATEGORY) as Project["category"][]).filter((c) => others.some((p) => p.category === c))];

// Pointer-following glow on cards
const spotlight = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function Links({ p }: { p: Project }) {
  if (!p.liveUrl && !p.codeUrl) return null;
  return (
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
  );
}

/** Illustrative phone frames labelled with the app's roles (not screenshots). */
function Mockup({ p }: { p: Project }) {
  const screens = p.screens ?? [p.title];
  return (
    <div className={`mock mock--${screens.length > 1 ? "multi" : "single"}`} aria-hidden>
      {screens.map((label, i) => (
        <div className="mock__phone" key={label} style={{ "--i": i - (screens.length - 1) / 2 } as CSSProperties}>
          <div className="mock__screen">
            <span className="mock__notch" />
            <span className="mock__logo">{p.title[0]}</span>
            <span className="mock__label">{label}</span>
            <span className="mock__bar" />
            <span className="mock__bar mock__bar--short" />
            <span className="mock__tiles"><i /><i /><i /><i /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Featured projects with app mockups, then a filterable grid of the rest. */
export default function ProjectList() {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);
  const shown = others.filter((p) => filter === "all" || p.category === filter);

  // Re-animate the grid when the filter changes (the first reveal is handled by ScrollTrigger).
  const prev = useRef(filter);
  useLayoutEffect(() => {
    if (prev.current === filter) return;
    prev.current = filter;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !grid.current) return;
    gsap.fromTo(grid.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05 });
  }, [filter]);

  return (
    <>
      <div className="featured">
        {featured.map((p) => {
          const { label, Icon } = CATEGORY[p.category];
          return (
            <article className="feature reveal" key={p.title} onPointerMove={spotlight}>
              <div className="feature__body">
                <span className="project__kind"><Icon size={14} /> {p.kind} · {label}</span>
                <h3>{p.title}</h3>
                <p className="project__desc">{p.desc}</p>
                {p.highlights && (
                  <ul className="feature__points">
                    {p.highlights.map((h) => <li key={h}><CheckIcon size={15} /> {h}</li>)}
                  </ul>
                )}
                <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                <Links p={p} />
              </div>
              <Mockup p={p} />
            </article>
          );
        })}
      </div>

      <div className="more-head reveal">
        <h3 className="subhead">More projects</h3>
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} type="button" className={`filter${filter === f ? " is-active" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : CATEGORY[f].label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects reveal" ref={grid}>
        {shown.map((p) => {
          const { Icon } = CATEGORY[p.category];
          return (
            <article className="project" key={p.title} onPointerMove={spotlight}>
              <div className="project__top">
                <span className="project__icon"><Icon size={20} /></span>
                <span className="project__kind">{p.kind}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="project__desc">{p.desc}</p>
              <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
              <Links p={p} />
            </article>
          );
        })}
      </div>
    </>
  );
}
