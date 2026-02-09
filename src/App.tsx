import { useCallback, useEffect, useMemo, useState } from 'react';
import { applySelection } from './tokens/cssVariables';
import {
  ACCENT_OPTIONS,
  ANIMATIONS,
  DESIGN_THEMES,
  SURFACES,
  buildTokens,
  type AccentName,
  type AnimationName,
  type DesignTheme,
  type Mode,
  type SurfaceName
} from './tokens/registry';
import { StudioControls } from './components/StudioControls';
import { HeroPage } from './pages/HeroPage';
import { DashboardPage } from './pages/DashboardPage';
import { StyleGuidePage } from './pages/StyleGuidePage';

type ViewName = 'hero' | 'dashboard' | 'guide';

const VIEW_OPTIONS: Array<{ id: ViewName; label: string; icon: string }> = [
  { id: 'hero', label: 'Hero', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'dashboard', label: 'Dashboard', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 6a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5zm-10 2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z' },
  { id: 'guide', label: 'Style Guide', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' }
];

function readSavedSelection() {
  const raw = localStorage.getItem('md3-token-studio:selection');
  if (!raw) {
    return { mode: 'light' as Mode, surface: 'solid' as SurfaceName, accent: 'indigo' as AccentName, animation: 'none' as AnimationName, design: 'md3' as DesignTheme };
  }

  try {
    const parsed = JSON.parse(raw);
    // Migrate old format: {theme:'slate'|'sand'|'moss'} → {surface:'solid'}
    if ('theme' in parsed && !('surface' in parsed)) {
      parsed.surface = 'solid';
      delete parsed.theme;
    }
    if (!SURFACES.includes(parsed.surface) || !ACCENT_OPTIONS.includes(parsed.accent)) {
      throw new Error('Invalid token selection');
    }
    if (!parsed.animation || !ANIMATIONS.includes(parsed.animation)) parsed.animation = 'none';
    if (!parsed.design || !DESIGN_THEMES.includes(parsed.design)) parsed.design = 'md3';
    return parsed as { mode: Mode; surface: SurfaceName; accent: AccentName; animation: AnimationName; design: DesignTheme };
  } catch {
    return { mode: 'light' as Mode, surface: 'solid' as SurfaceName, accent: 'indigo' as AccentName, animation: 'none' as AnimationName, design: 'md3' as DesignTheme };
  }
}

export default function App() {
  const [view, setView] = useState<ViewName>('hero');
  const [mode, setMode] = useState<Mode>(() => readSavedSelection().mode);
  const [surface, setSurface] = useState<SurfaceName>(() => readSavedSelection().surface);
  const [accent, setAccent] = useState<AccentName>(() => readSavedSelection().accent);
  const [animation, setAnimation] = useState<AnimationName>(() => readSavedSelection().animation);
  const [design, setDesign] = useState<DesignTheme>(() => readSavedSelection().design);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selection = useMemo(() => ({ mode, surface, accent, animation, design }), [mode, surface, accent, animation, design]);
  const tokens = useMemo(() => buildTokens(selection), [selection]);

  useEffect(() => {
    applySelection(selection);
    localStorage.setItem('md3-token-studio:selection', JSON.stringify(selection));
  }, [selection]);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  return (
    <div className="studio">
      <aside className={`studio-sidebar${sidebarOpen ? '' : ' is-collapsed'}`}>
        <div className="sidebar-brand">
          <svg viewBox="0 0 32 32" className="brand-mark" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
            <path d="M8 22V10l5 6 5-6v12" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="16" r="3" fill="var(--color-accent-soft)" />
          </svg>
          <div className="brand-text">
            <span className="brand-name">MD3 Studio</span>
            <span className="brand-sub">Token Playground</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Showcase pages">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`nav-item${option.id === view ? ' is-active' : ''}`}
              onClick={() => setView(option.id)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={option.icon} />
              </svg>
              <span>{option.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <StudioControls
          mode={mode}
          surface={surface}
          accent={accent}
          animation={animation}
          design={design}
          onModeChange={setMode}
          onSurfaceChange={setSurface}
          onAccentChange={setAccent}
          onAnimationChange={setAnimation}
          onDesignChange={setDesign}
        />

        <div className="sidebar-footer">
          <div className="token-readout">
            <code>{design}/{surface}/{mode}/{accent}{animation !== 'none' ? `/${animation}` : ''}</code>
          </div>
        </div>
      </aside>

      <div className="studio-content">
        <header className="studio-topbar">
          <button type="button" className="topbar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="topbar-context">
            <h1>{VIEW_OPTIONS.find((v) => v.id === view)?.label}</h1>
            <span className="topbar-badge">{design} / {surface} / {mode} / {accent}</span>
          </div>
          <div className="topbar-actions">
            <span className="combo-count">{DESIGN_THEMES.length * SURFACES.length * ACCENT_OPTIONS.length * 2 * ANIMATIONS.length} combos</span>
          </div>
        </header>

        <main className="studio-stage" aria-live="polite">
          {view === 'hero' && <HeroPage />}
          {view === 'dashboard' && <DashboardPage />}
          {view === 'guide' && <StyleGuidePage tokens={tokens} mode={mode} surface={surface} accent={accent} animation={animation} design={design} />}
        </main>
      </div>
    </div>
  );
}
