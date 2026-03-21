import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">Muthukamatchi | Full Stack Developer</div>

      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={`hamburger ${open ? "open" : ""}`} />
      </button>

      <div className={`nav-right ${open ? "nav-open" : ""}`}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
