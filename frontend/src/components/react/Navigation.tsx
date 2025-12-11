import './Navigation.css';

type Page = 'Discover' | 'Messages' | 'Communities' | 'Profile';

const items: Array<{ name: Page; icon: string }> = [
  { name: 'Discover', icon: '🔍' },
  { name: 'Messages', icon: '💬' },
  { name: 'Communities', icon: '👥' },
  { name: 'Profile', icon: '🐕' },
];

interface NavigationProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ activePage, onNavigate }: NavigationProps) {
  return (
    <nav className="nav-container">
      {items.map(i => (
        <button
          key={i.name}
          className={`nav-item ${activePage === i.name ? 'active' : ''}`}
          onClick={() => onNavigate(i.name)}
        >
          <span className="nav-icon">{i.icon}</span>
          <span className="nav-text">{i.name}</span>
        </button>
      ))}
    </nav>
  );
}
