import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import profileImg from "../assets/profile.jpg";
import { PROFILE } from "../data/profile";

// Syntax classes: k keyword, v property, s string, b boolean, c comment, p punctuation.
type Token = [cls: "k" | "v" | "s" | "b" | "c" | "p", text: string];
const str = (t: string): Token => ["s", `"${t}"`];
const list = (items: string[]): Token[] =>
  items.flatMap((t, i) => (i ? [["p", ", "] as Token, str(t)] : [str(t)]));

const CODE: Token[][] = [
  [["c", "// hello, world 👋"]],
  [["k", "const "], ["v", "developer"], ["p", " = {"]],
  [["v", "  name"], ["p", ": "], str(PROFILE.name), ["p", ","]],
  [["v", "  role"], ["p", ": "], str(PROFILE.role), ["p", ","]],
  [["v", "  location"], ["p", ": "], str(PROFILE.location), ["p", ","]],
  [["v", "  stack"], ["p", ": {"]],
  [["v", "    mobile"], ["p", ": ["], ...list(["Flutter"]), ["p", "],"]],
  [["v", "    web"], ["p", ": ["], ...list(["React", "JavaScript"]), ["p", "],"]],
  [["v", "    backend"], ["p", ": ["], ...list(["Node.js", "Express"]), ["p", "],"]],
  [["v", "    data"], ["p", ": ["], ...list(["MySQL", "Redis", "MongoDB"]), ["p", "],"]],
  [["p", "  },"]],
  [["v", "  openToWork"], ["p", ": "], ["b", "true"], ["p", ","]],
  [["p", "};"]],
];

// Each line counts one extra character for its line break.
const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [, t]) => m + [...t].length, 0) + 1, 0);
/** Slices the tokens to the first `shown` characters and finds the line the caret sits on. */
function typed(shown: number) {
  let left = shown;
  let caretLine = -1;
  const lines: Token[][] = [];
  for (let i = 0; i < CODE.length; i++) {
    const out: Token[] = [];
    for (const [cls, text] of CODE[i]) {
      const chars = [...text];
      const take = Math.min(left, chars.length);
      if (take > 0) out.push([cls, chars.slice(0, take).join("")]);
      left -= take;
    }
    lines.push(out);
    if (left > 0) left -= 1; // line break
    else if (caretLine < 0) caretLine = i;
  }
  return { lines, caretLine: caretLine < 0 ? CODE.length - 1 : caretLine };
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Hero visual: a code editor window that types out a short developer profile, with the photo docked in the corner. */
export default function HeroCode() {
  const root = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => (reduced() ? TOTAL : 0));

  // Typing effect
  useEffect(() => {
    if (shown >= TOTAL) return;
    const t = setTimeout(() => setShown((n) => Math.min(TOTAL, n + 2)), shown === 0 ? 900 : 26);
    return () => clearTimeout(t);
  }, [shown]);

  useLayoutEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".editor", { y: 40, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.25 });
      gsap.from(".editor-photo", { scale: 0.5, opacity: 0, duration: 0.8, ease: "back.out(1.8)", delay: 0.8 });
    }, root);

    // Gentle 3D tilt toward the mouse
    const rx = gsap.quickTo(win.current, "rotationX", { duration: 1, ease: "power3" });
    const ry = gsap.quickTo(win.current, "rotationY", { duration: 1, ease: "power3" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ry(((e.clientX / window.innerWidth) * 2 - 1) * 6);
      rx(((e.clientY / window.innerHeight) * 2 - 1) * -5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  const { lines, caretLine } = typed(shown);
  const done = shown >= TOTAL;

  return (
    <div className="hero-visual" ref={root}>
      <div className="editor" ref={win}>
        <div className="editor__bar">
          <span className="editor__dots" aria-hidden><i /><i /><i /></span>
          <span className="editor__tab is-active">developer.ts</span>
          <span className="editor__tab">projects.json</span>
        </div>
        <pre className="editor__code" aria-label={`${PROFILE.name}, ${PROFILE.role}. Stack: Flutter, React, JavaScript, Node.js, Express, MySQL, Redis, MongoDB.`}>
          {CODE.map((_, i) => (
            <div key={i} className="editor__line" aria-hidden>
              <span className="editor__ln">{i + 1}</span>
              <code>
                {lines[i].map(([cls, text], j) => <span key={j} className={`tk-${cls}`}>{text}</span>)}
                {i === caretLine && <span className={`editor__caret${done ? " is-idle" : ""}`} />}
              </code>
            </div>
          ))}
        </pre>
        <div className="editor__status" aria-hidden>
          <span><i className="editor__live" /> main</span>
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </div>

      <div className="editor-photo">
        <img src={profileImg} alt={`Portrait of ${PROFILE.name}`} width={720} height={720} />
      </div>
    </div>
  );
}
