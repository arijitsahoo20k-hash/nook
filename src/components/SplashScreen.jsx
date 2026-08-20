import { useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1300);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="splash">
      <div className="splash-orb">
        <span className="splash-orb-ring" />
        <span className="splash-orb-core" />
      </div>
      <p className="splash-title">nook</p>
      <p className="splash-sub">warming up your corner of PW</p>
    </div>
  );
}
