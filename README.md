# nook — an installable in-app browser for PW

A small React + Vite PWA that wraps pw.live in its own app chrome (top bar
with home / reload / open-externally), so it installs to your home screen
and opens without a Chrome tab and URL bar around it.

## Run it

```bash
npm install
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

To actually install it as a PWA you need to serve the **built** version
(`npm run build && npm run preview`, or deploy it) over HTTPS — Chrome
won't offer the install prompt off a plain `dev` server on most setups.
Deploying to Vercel/Netlify (drag-and-drop the `dist` folder, or connect
the repo) is the easiest path and gives you HTTPS for free.

## The one real caveat

Some sites set `X-Frame-Options` / `Content-Security-Policy: frame-ancestors`
headers that block being loaded inside an iframe at all — this is a
server-side setting on PW's end, nothing in this app can override it.

- If PW **allows** framing: everything above just works, and you get a
  proper in-app browsing experience.
- If PW **blocks** framing: the iframe will just sit blank. This app
  watches for that — if the page hasn't loaded within ~7 seconds it shows
  a "this room won't open in-app" screen with a button that opens the
  same URL in your real browser instead, so you're never stuck.

I haven't been able to test pw.live's actual framing policy from this
sandbox (its domain isn't reachable from here). Run `npm run dev` and
open it — you'll know in about 7 seconds which case you're in. If it's
blocked, there's no code fix for that; the honest options are (a) ask PW
if they have an official app, or (b) keep this as a fast-launch shortcut
that hands off to your real browser.

## What back/forward can't do

Cross-origin iframes don't expose their internal navigation history to
the parent page (browser security, not a bug) — so there's no reliable
in-app back/forward button. Home and Reload both work by resetting the
iframe's `src`, which is the one thing that's always controllable from
outside.

## Structure

```
src/
  App.jsx                 top-level state: current url, load status
  components/
    SplashScreen.jsx/css   first-launch boot animation
    Toolbar.jsx/css        floating pill chrome (home/reload/open)
    BrowserView.jsx/css    the iframe + loading + blocked-fallback states
public/
  icons/                   generated app icons (192/512, incl. maskable)
vite.config.js             vite-plugin-pwa manifest + service worker config
```

## Customizing

- Change the wrapped URL in `src/App.jsx` → `HOME_URL`.
- Colors/fonts are CSS variables at the top of `src/index.css` — swap
  `--accent` etc. to retheme everything in one place.
- App name/short_name/theme color live in `vite.config.js` under
  `manifest`, and in `index.html`'s `<title>` / meta tags.
