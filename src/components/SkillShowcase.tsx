import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_SHOWCASE, type TechId } from "../data/profile";
import { TechLogo } from "./TechLogos";

gsap.registerPlugin(ScrollTrigger);

// How the technologies connect in a typical stack; lines are only drawn when both ends exist.
const LINKS: [TechId, TechId][] = [
  ["js", "node"], ["node", "express"], ["js", "react"], ["express", "mysql"],
  ["express", "redis"], ["express", "rest"], ["react", "rest"], ["flutter", "rest"],
];

type Line = { a: TechId; b: TechId; x1: number; y1: number; x2: number; y2: number; c1: string; c2: string };

const colorOf = (id: TechId) => SKILL_SHOWCASE.find((s) => s.id === id)?.color ?? "#F7A6C1";

export default function SkillShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [active, setActive] = useState<TechId | null>(null);

  // Measure tile centres relative to .tech-wrap (layout positions, unaffected by animation transforms).
  useEffect(() => {
    const grid = root.current;
    if (!grid) return;
    const measure = () => {
      const centre = (id: TechId) => {
        const el = grid.querySelector<HTMLElement>(`[data-tech="${id}"]`);
        return el ? [el.offsetLeft + el.offsetWidth / 2, el.offsetTop + el.offsetHeight / 2] : null;
      };
      setLines(
        LINKS.flatMap(([a, b]) => {
          const p = centre(a), q = centre(b);
          return p && q ? [{ a, b, x1: p[0], y1: p[1], x2: q[0], y2: q[1], c1: colorOf(a), c2: colorOf(b) }] : [];
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  // Tiles reveal one by one as the grid scrolls into view, then the links fade in.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 82%", once: true } })
        .from(".tech", { opacity: 0, y: 36, scale: 0.92, duration: 0.7, ease: "back.out(1.6)", stagger: 0.11 })
        .from(".tech-links", { opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.35");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="showcase">
      <CodeBackdrop />
      <div className="tech-wrap" ref={root}>
        <svg className="tech-links" aria-hidden>
          <defs>
            {lines.map((l, i) => (
              <linearGradient key={i} id={`tl-${i}`} gradientUnits="userSpaceOnUse" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}>
                <stop offset="0" stopColor={l.c1} />
                <stop offset="1" stopColor={l.c2} />
              </linearGradient>
            ))}
          </defs>
          {lines.map((l, i) => {
            const on = active !== null && (l.a === active || l.b === active);
            return (
              <g key={i} className={`tech-link ${on ? "is-on" : ""} ${active && !on ? "is-dim" : ""}`}>
                <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={`url(#tl-${i})`} className="tech-link__base" />
                <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={`url(#tl-${i})`} className="tech-link__flow" style={{ animationDelay: `${-i * 0.7}s` }} />
              </g>
            );
          })}
        </svg>

        <ul className="tech-grid" aria-label="Core technologies">
        {SKILL_SHOWCASE.map((s, i) => (
          <li
            key={s.id}
            className={`tech ${active === s.id ? "is-active" : ""}`}
            data-tech={s.id}
            style={{ "--c": s.color, "--i": i } as CSSProperties}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="tech__card">
              <span className="tech__logo"><TechLogo id={s.id} /></span>
              <span className="tech__name">{s.name}</span>
              <span className="tech__role">{s.role}</span>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

/** Faint, colourful code drifting behind the grid. Purely decorative. */
function CodeBackdrop() {
  return (
    <div className="code-bg" aria-hidden>
      <pre style={{ top: "4%", left: "-2%" }}><span className="k">const</span> app = <span className="f">express</span>();</pre>
      <pre style={{ top: "18%", right: "-1%" }}>app.<span className="f">get</span>(<span className="s">'/api/orders'</span>, handler)</pre>
      <pre style={{ top: "46%", left: "-4%" }}><span className="k">await</span> redis.<span className="f">set</span>(key, <span className="n">3600</span>)</pre>
      <pre style={{ top: "62%", right: "-3%" }}><span className="k">SELECT</span> * <span className="k">FROM</span> users <span className="k">WHERE</span> id = ?</pre>
      <pre style={{ bottom: "6%", left: "8%" }}><span className="f">useEffect</span>(() =&gt; <span className="f">load</span>(), [])</pre>
      <pre style={{ bottom: "2%", right: "10%" }}>Widget <span className="f">build</span>(BuildContext context)</pre>
    </div>
  );
}
