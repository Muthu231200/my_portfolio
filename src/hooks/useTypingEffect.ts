import { useState, useEffect } from "react";

export default function useTypingEffect(texts: string[], typeSpeed = 60, deleteSpeed = 30, pause = 2000): string {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: number;

    if (!deleting && charIndex <= current.length) {
      setDisplay(current.slice(0, charIndex));
      if (charIndex === current.length) {
        timeout = window.setTimeout(() => setDeleting(true), pause);
      } else {
        timeout = window.setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
      }
    } else if (deleting && charIndex >= 0) {
      setDisplay(current.slice(0, charIndex));
      if (charIndex === 0) {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      } else {
        timeout = window.setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, typeSpeed, deleteSpeed, pause]);

  return display;
}
