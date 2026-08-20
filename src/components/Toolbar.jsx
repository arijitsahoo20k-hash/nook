import { Home, RotateCw, ExternalLink } from 'lucide-react';
import './Toolbar.css';

const STATUS_COPY = {
  loading: 'settling in…',
  ready: 'you\u2019re in',
  blocked: 'stuck outside',
};

export default function Toolbar({ status, onHome, onReload, onOpenExternally }) {
  return (
    <nav className="toolbar" aria-label="Browser controls">
      <button className="toolbar-btn" onClick={onHome} aria-label="Go home">
        <Home size={18} strokeWidth={2} />
      </button>

      <div className="toolbar-status">
        <span className={`toolbar-dot toolbar-dot--${status}`} />
        <span className="toolbar-status-text">{STATUS_COPY[status]}</span>
      </div>

      <button className="toolbar-btn" onClick={onReload} aria-label="Reload">
        <RotateCw size={17} strokeWidth={2} />
      </button>

      <button className="toolbar-btn" onClick={onOpenExternally} aria-label="Open in browser">
        <ExternalLink size={17} strokeWidth={2} />
      </button>
    </nav>
  );
}
