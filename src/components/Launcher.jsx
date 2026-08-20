import { useEffect, useState } from 'react';
import './Launcher.css';

const REDIRECT_DELAY_MS = 1100;

export default function Launcher({ homeUrl }) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.replace(homeUrl);
    }, REDIRECT_DELAY_MS);

    // Safety net: if something (an odd standalone-mode quirk, a blocked
    // navigation) stops the auto-redirect, don't leave the screen stuck.
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, REDIRECT_DELAY_MS + 1500);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(fallbackTimer);
    };
  }, [homeUrl]);

  return (
    <div className="launcher">
      <div className="launcher-orb">
        <span className="launcher-orb-ring" />
        <span className="launcher-orb-core" />
      </div>
      <p className="launcher-title">nook</p>
      <p className="launcher-sub">stepping into PW…</p>

      {showFallback && (
        <a className="launcher-fallback" href={homeUrl}>
          Tap here if it didn&rsquo;t open
        </a>
      )}
    </div>
  );
}
