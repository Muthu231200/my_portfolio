import { useEffect, useState } from "react";
import { PROFILE } from "../data/profile";

const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the section currently in the middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
          {PROFILE.shortName}<span>.</span>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>

        <nav id="nav-menu" className={`nav__menu ${open ? "is-open" : ""}`} aria-label="Primary">
          <ul>
            {NAV.map((item) => {
              const id = item.toLowerCase();
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? "is-active" : undefined}
                    aria-current={active === id ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="btn btn--small" href={PROFILE.resumeUrl} download onClick={() => setOpen(false)}>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
