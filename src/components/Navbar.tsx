import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">MK.</div>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`hamburger ${open ? "open" : ""}`} />
      </button>
      <ul className={`nav-links ${open ? "nav-open" : ""}`}>
        {["Home", "About", "Experience", "Projects", "Contact"].map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
