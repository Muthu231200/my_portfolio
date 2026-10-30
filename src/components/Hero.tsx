import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE } from "../data/profile";
import HeroCode from "./HeroCode";
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-intro]", { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, delay: 0.1 });
      gsap.from(".hero-visual", { y: 40, opacity: 0, scale: 0.96, duration: 1.2, ease: "power3.out", delay: 0.25 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={root}>
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="eyebrow" data-intro>
            <span className="dot" aria-hidden /> Open to opportunities
          </p>
          <h1 className="hero__title" data-intro>
            Hi, I'm {PROFILE.shortName}&nbsp;—<br />
            <span className="accent">{PROFILE.role}.</span>
          </h1>
          <p className="hero__lead" data-intro>{PROFILE.intro}</p>

          <div className="hero__actions" data-intro>
            <a className="btn" href="#projects">
              View projects <ArrowIcon size={16} />
            </a>
            <a className="btn btn--ghost" href={PROFILE.resumeUrl} download>
              <DownloadIcon size={16} /> Download resume
            </a>
          </div>

          <div className="hero__social" data-intro>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
            <span className="hero__stack">Flutter · React · Node.js · MySQL</span>
          </div>
        </div>

        <HeroCode />
      </div>
    </section>
  );
}
