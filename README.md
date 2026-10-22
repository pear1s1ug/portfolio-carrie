# Carla Prado — Portfolio

Single-page portfolio built with React 18, Vite 5 and Tailwind CSS 4. Frontend only, no backend.

```bash
pnpm install
pnpm dev       # development server
pnpm build     # production build -> dist/
pnpm preview   # serve the production build
```

## Structure

- `src/components/Landing.jsx` — the whole landing page: sections, content (EN/ES), projects, blog articles, styles and pixel sprites.
- `src/assets/pixel/portrait.png` — 60×75 pixel-art portrait (generated from `me4.png`, brand palette).
- `src/assets/pixel/night-scene.png` — 640×96 pixel night scene used in the footer.
- `public/favicon.svg` — pixel ghost favicon.

Articles open at `#/blog/<slug>`; every other hash is a section anchor.

## Pending

Contact links: set `LINKEDIN_URL` and `EMAIL` at the top of `Landing.jsx`; they only render once filled in.
