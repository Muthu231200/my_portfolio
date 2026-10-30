import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import gsap from "gsap";
import { PROJECTS, type Project } from "../data/profile";
import { ExternalIcon, GitHubIcon, MobileIcon, ServerIcon, WebIcon } from "./Icons";

const CATEGORY = {
  mobile: { label: "Mobile", Icon: MobileIcon },
  web: { label: "Web", Icon: WebIcon },
  backend: { label: "Backend", Icon: ServerIcon },
} as const;
type Filter = "all" | Project["category"];

const filters: Filter[] = ["all", ...(Object.keys(CATEGORY) as Project["category"][]).filter((c) => PROJECTS.some((p) => p.category === c))];

// Pointer-following glow on cards
const spotlight = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/** Filterable grid of all projects. */
export default function ProjectList() {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);
  const shown = PROJECTS.filter((p) => filter === "all" || p.category === filter);

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
      <div className="filters reveal" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f} type="button" className={`filter${filter === f ? " is-active" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : CATEGORY[f].label}
          </button>
        ))}
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
          );
        })}
      </div>
    </>
  );
}
