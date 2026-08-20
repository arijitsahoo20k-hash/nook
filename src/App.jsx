import Launcher from './components/Launcher.jsx';
import './App.css';

// Change this if your actual PW portal URL differs.
export const HOME_URL = 'https://www.pw.live/';

export default function App() {
  return (
    <div className="app-shell">
      <Launcher homeUrl={HOME_URL} />
    </div>
  );
}
