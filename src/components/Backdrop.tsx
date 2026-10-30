import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed, animated page background: drifting pink glows over a flowing grid.
 * Glows drift on their own (CSS) and also travel across the screen as you
 * scroll from section to section (GSAP scrub on the outer wrappers).
 */
export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const scrub = { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1.2 };
      gsap.to(".glow--a", { xPercent: 70, yPercent: 120, scale: 1.25, ease: "none", scrollTrigger: scrub });
      gsap.to(".glow--b", { xPercent: -90, yPercent: -60, scale: 0.85, ease: "none", scrollTrigger: scrub });
      gsap.to(".glow--c", { xPercent: 60, yPercent: -110, scale: 1.3, ease: "none", scrollTrigger: scrub });
      gsap.to(".backdrop__grid", { backgroundPosition: "0px 600px", ease: "none", scrollTrigger: scrub });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="backdrop" ref={root} aria-hidden>
      <div className="backdrop__grid" />
      <div className="glow glow--a"><span /></div>
      <div className="glow glow--b"><span /></div>
      <div className="glow glow--c"><span /></div>
      <div className="backdrop__vignette" />
    </div>
  );
}
