# Muthu Kamatchi M — Portfolio

React + Vite + TypeScript portfolio with GSAP scroll animations.

## Run it

Requires Node.js 20+.

```bash
npm install        # install dependencies
npm run dev        # local dev server → http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build → http://localhost:4173
npm run lint
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Where things live

| What | File |
|---|---|
| All text, skills, projects, experience, links | `src/data/profile.ts` |
| Highlighted technologies (Skills section) | `SKILL_SHOWCASE` in `src/data/profile.ts` |
| Technology logos | `src/components/TechLogos.tsx` |
| Profile photo (hero) | `src/assets/profile.jpg` |
| Resume PDF (Download buttons) | `public/resume/Muthu_Kamatchi_Resume.pdf` |
| Contact form (EmailJS keys) | `src/utils/sendEmail.ts` |
| Skills showcase (tiles, links, code backdrop) | `src/components/SkillShowcase.tsx` |
| Moving page background | `src/components/Backdrop.tsx` |
| Hero code editor (typed profile + photo) | `src/components/HeroCode.tsx` (code: `CODE`) |
| Styles | `src/styles.css` |

Project **Live** / **Code** buttons appear automatically once you set `liveUrl` / `codeUrl` in `profile.ts`.
The contact form opens the visitor's mail app until you add EmailJS keys; after that it sends directly.

## Skills showcase

The Skills section opens with your core technologies as colourful logo tiles:

- Tiles reveal one by one as the section scrolls into view (GSAP ScrollTrigger), then the connecting lines fade in.
- Dotted "data" flows along lines between related technologies (e.g. React → REST APIs → Express → MySQL / Redis).
- Hovering a tile lifts it, glows in its brand colour, brightens its connections and dims the rest.
- Logos float gently; faint colourful code snippets drift in the background.
- `prefers-reduced-motion` turns all of this off and shows everything statically.

Edit `SKILL_SHOWCASE` in `src/data/profile.ts` to remove or reorder technologies. Which tiles are linked is the `LINKS` list at the top of `SkillShowcase.tsx`. Logos are simplified inline SVGs in `TechLogos.tsx`; to use official artwork, replace a case with an `<img>` of the brand's SVG.

## Hero: code editor card

The hero shows a code editor window that types out a short developer profile, with your photo docked in the corner:

- The window has traffic-light dots, file tabs, line numbers, syntax colours and a pink status bar.
- The code types itself out after the page loads, then the caret blinks.
- The window tilts gently toward the mouse (3D).
- Your photo sits in a round pink ring over the bottom-right corner.
- `prefers-reduced-motion` shows the full code at once, with no tilt or blinking.

To change the code, edit `CODE` at the top of `src/components/HeroCode.tsx` (each line is a list of coloured tokens).

## Replacing the photo

Overwrite `src/assets/profile.jpg` with a new photo (same name). It is cropped to a circle from the top centre, so a head-and-shoulders shot works best. About 900 px wide is plenty.
