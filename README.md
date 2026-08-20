# nook — a PWA launcher for PW

pw.live blocks being loaded inside an iframe (or at least its login flow
does — auth cookies from a cross-origin iframe get blocked by modern
browsers even when the frame itself renders). No client-side code can
fix that; it's a security boundary the browser enforces.

So this app doesn't try to wrap PW in a frame anymore. It's a small,
good-looking **launcher**: install it to your home screen, tap it, get
a ~1 second cozy splash, then it does a real top-level redirect
(`window.location.replace`) straight into pw.live. Because that's a
normal navigation and not an embed, there's no framing restriction and
no cookie blocking — auth works exactly like it does in a regular
browser tab, because as far as the browser's concerned, it *is* one.

## What you get / what you don't

- ✅ One tap from your home screen to PW, no address bar hunting, no
  finding the right tab.
- ✅ Auth just works — nothing bypassed, nothing broken.
- ❌ No persistent custom toolbar around PW itself once you're
  redirected — you're in PW's own page from that point on, with
  whatever chrome your browser normally shows there. Some browsers show
  a small "return to app" affordance when a standalone PWA navigates
  out of its own origin; others just open it like a normal page. That's
  a platform behavior, not something this app controls.

## Run it

```bash
npm install
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

To get the install prompt, serve the **built** version over HTTPS
(`npm run build && npm run preview`, or deploy to Vercel/Netlify —
drag-and-drop `dist/`, or connect the repo).

## Structure

```
src/
  App.jsx                  renders the launcher
  components/
    Launcher.jsx/css        splash animation + redirect + fallback link
public/
  icons/                    generated app icons (192/512, incl. maskable)
vite.config.js              vite-plugin-pwa manifest + service worker config
```

## Customizing

- Change the destination in `src/App.jsx` → `HOME_URL`.
- Redirect delay is `REDIRECT_DELAY_MS` in `src/components/Launcher.jsx`
  (currently 1.1s, purely for the splash to register before it jumps).
- Colors/fonts are CSS variables at the top of `src/index.css`.
- App name/short_name/theme color live in `vite.config.js` under
  `manifest`, and in `index.html`'s `<title>` / meta tags.
