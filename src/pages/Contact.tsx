export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-grid">
          <div className="reveal">
            <div className="section-label">Let's Talk</div>
            <h2 className="contact-heading">Open to New<br />Opportunities</h2>
            <p className="contact-sub">Currently employed. Open to freelance projects or collaborations — feel free to reach out.</p>
          </div>
          <div className="contact-links reveal reveal-delay-2">
            <a href="mailto:muthukamatchi170167@gmail.com" className="contact-link">
              <div className="contact-link-icon">✉️</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Email</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>muthukamatchi170167@gmail.com</div>
              </div>
            </a>
            <a href="tel:+91XXXXXXXXXX" className="contact-link">
              <div className="contact-link-icon">📱</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Phone</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>+91 75399 98917</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/muthu-kamatchi-3347701b3" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>LinkedIn</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>muthu-kamatchi-3347701b3</div>
              </div>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} MuthuKamatchi M. All rights reserved.</span>
          <span className="footer-loc">📍 Aruppukkottai, 626101</span>
        </div>
      </div>
    </footer>
  );
}
