import { siExpress, siJavascript, siMysql, siNodedotjs, siReact, siRedis, type SimpleIcon } from "simple-icons";
import type { TechId } from "../data/profile";

// Official marks from Simple Icons (CC0), in brand colours.
const BRAND: Partial<Record<TechId, { icon: SimpleIcon; color?: string }>> = {
  js: { icon: siJavascript },
  node: { icon: siNodedotjs },
  express: { icon: siExpress, color: "#E8E8E8" }, // brand black would vanish on the dark tile
  react: { icon: siReact },
  mysql: { icon: siMysql },
  redis: { icon: siRedis },
};

export function TechLogo({ id }: { id: TechId }) {
  const brand = BRAND[id];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d={brand.icon.path} fill={brand.color ?? `#${brand.icon.hex}`} />
      </svg>
    );
  }
  if (id === "flutter") {
    // Two-tone Flutter mark (the single-colour official icon is too dark on black).
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14.314 0 2.3 12 6 15.7 21.684.013h-7.37Z" fill="#54C5F8" />
        <path d="m14.328 11.072-6.471 6.457 3.239 3.24L21.7 11.072Z" fill="#54C5F8" />
        <path d="m11.096 20.769 3.231 3.231H21.7l-6.46-6.468Z" fill="#01579B" />
      </svg>
    );
  }
  // REST APIs has no brand mark: braces with request/response arrows.
  return (
    <svg viewBox="0 0 48 48" aria-hidden fill="none" stroke="#FF8A3D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 10c-4 0-5 2-5 5v5c0 2-1 4-4 4 3 0 4 2 4 4v5c0 3 1 5 5 5" />
      <path d="M32 10c4 0 5 2 5 5v5c0 2 1 4 4 4-3 0-4 2-4 4v5c0 3-1 5-5 5" />
      <path d="M18 21h12l-3-3M30 27H18l3 3" />
    </svg>
  );
}
