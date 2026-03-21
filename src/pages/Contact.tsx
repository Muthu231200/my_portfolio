function Contact() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-name">MuthuKamatchi M</span>
          <span className="footer-role">Full Stack Developer</span>
        </div>
        <div className="footer-contact">
          <a href="mailto:muthukamatchi170167@gmail.com" className="footer-contact-item">
            ✉ muthukamatchi170167@gmail.com
          </a>
          <span className="footer-contact-item">📱 +91 75399 98917</span>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/muthu-kamatchi-3347701b3" target="_blank" rel="noreferrer" className="footer-linkedin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} MuthuKamatchi M. All rights reserved.
      </div>
    </footer>
  );
}

export default Contact;
