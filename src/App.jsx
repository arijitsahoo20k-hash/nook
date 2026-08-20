import { useState, useCallback } from 'react';
import Toolbar from './components/Toolbar.jsx';
import BrowserView from './components/BrowserView.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import './App.css';

// Change this if your actual PW portal URL differs.
export const HOME_URL = 'https://www.pw.live/';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [status, setStatus] = useState('loading'); // loading | ready | blocked
  const [reloadKey, setReloadKey] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(HOME_URL);

  const goHome = useCallback(() => {
    setCurrentUrl(HOME_URL);
    setStatus('loading');
    setReloadKey((k) => k + 1);
  }, []);

  const reload = useCallback(() => {
    setStatus('loading');
    setReloadKey((k) => k + 1);
  }, []);

  const openExternally = useCallback(() => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  }, [currentUrl]);

  if (!booted) {
    return <SplashScreen onDone={() => setBooted(true)} />;
  }

  return (
    <div className="app-shell">
      <BrowserView
        url={currentUrl}
        reloadKey={reloadKey}
        status={status}
        onStatusChange={setStatus}
        onOpenExternally={openExternally}
      />
      <Toolbar
        status={status}
        onHome={goHome}
        onReload={reload}
        onOpenExternally={openExternally}
      />
    </div>
  );
}
