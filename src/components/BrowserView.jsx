import { useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';
import './BrowserView.css';

// Sites can refuse to be framed (X-Frame-Options / CSP frame-ancestors).
// When that happens the iframe stays blank with no reliable error event,
// so we fall back to a timeout: if 'load' hasn't fired by then, we assume
// it's blocked and offer the external-browser escape hatch instead.
const BLOCK_TIMEOUT_MS = 7000;

export default function BrowserView({ url, reloadKey, status, onStatusChange, onOpenExternally }) {
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    onStatusChange('loading');
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onStatusChange('blocked');
    }, BLOCK_TIMEOUT_MS);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, url]);

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    onStatusChange('ready');
  };

  return (
    <div className="browser-view">
      <iframe
        key={reloadKey}
        ref={iframeRef}
        src={url}
        title="PW"
        className="browser-frame"
        onLoad={handleLoad}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {status === 'loading' && (
        <div className="browser-overlay">
          <span className="browser-spinner" />
        </div>
      )}

      {status === 'blocked' && (
        <div className="browser-overlay browser-overlay--solid">
          <Compass size={30} strokeWidth={1.6} className="blocked-icon" />
          <p className="blocked-title">this room won&rsquo;t open in-app</p>
          <p className="blocked-copy">
            PW seems to be keeping this page to itself. Pop it open in your
            regular browser instead — everything still works there.
          </p>
          <button className="blocked-cta" onClick={onOpenExternally}>
            Open in browser
          </button>
        </div>
      )}
    </div>
  );
}
