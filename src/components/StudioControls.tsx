import type { CSSProperties } from 'react';
import { ACCENT_OPTIONS, ANIMATIONS, DESIGN_THEMES, SURFACES, type AccentName, type AnimationName, type DesignTheme, type Mode, type SurfaceName } from '../tokens/registry';

interface StudioControlsProps {
  mode: Mode;
  surface: SurfaceName;
  accent: AccentName;
  animation: AnimationName;
  design: DesignTheme;
  onModeChange: (value: Mode) => void;
  onSurfaceChange: (value: SurfaceName) => void;
  onAccentChange: (value: AccentName) => void;
  onAnimationChange: (value: AnimationName) => void;
  onDesignChange: (value: DesignTheme) => void;
}

const ACCENT_SWATCHES: Record<AccentName, string> = {
  indigo: '#5868e6',
  emerald: '#24b889',
  coral: '#e78171',
  amber: '#e9aa4d',
  rose: '#d96088',
  violet: '#8b5cf6',
  teal: '#2ebab4',
  slate: '#5c7d99',
  mono: '#18181b'
};

function labelize(value: string) {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

const DESIGN_LABELS: Record<DesignTheme, string> = {
  md3: 'MD3',
  minimal: 'Minimal',
  glass: 'Glassmorphism',
  shadcn: 'ShadCN'
};

const ANIMATION_LABELS: Record<AnimationName, string> = {
  none: 'None',
  aurora: 'Aurora',
  waves: 'Waves',
  pulse: 'Pulse'
};

export function StudioControls({
  mode,
  surface,
  accent,
  animation,
  design,
  onModeChange,
  onSurfaceChange,
  onAccentChange,
  onAnimationChange,
  onDesignChange
}: StudioControlsProps) {
  return (
    <div className="controls">
      <div className="control-section">
        <p className="control-label">Appearance</p>
        <div className="mode-toggle" role="radiogroup" aria-label="Color mode">
          {(['light', 'dark'] as Mode[]).map((item) => (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={mode === item}
              className={`mode-btn${mode === item ? ' is-active' : ''}`}
              onClick={() => onModeChange(item)}
            >
              {item === 'light' ? (
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              <span>{labelize(item)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <p className="control-label">Surface</p>
        <div className="surface-row">
          {SURFACES.map((item) => (
            <button
              key={item}
              type="button"
              className={`surface-chip${item === surface ? ' is-active' : ''}`}
              onClick={() => onSurfaceChange(item)}
            >
              <span className={`surface-preview surface-preview--${item}`} />
              <span>{labelize(item)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <p className="control-label">Accent</p>
        <div className="accent-row">
          {ACCENT_OPTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={`accent-chip${item === accent ? ' is-active' : ''}`}
              onClick={() => onAccentChange(item)}
              aria-label={labelize(item)}
            >
              <span className="accent-dot" style={{ '--dot-color': ACCENT_SWATCHES[item] } as CSSProperties} />
              <span className="accent-name">{labelize(item)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <p className="control-label">Design</p>
        <div className="design-row">
          {DESIGN_THEMES.map((item) => (
            <button
              key={item}
              type="button"
              className={`design-chip${item === design ? ' is-active' : ''}`}
              onClick={() => onDesignChange(item)}
            >
              <span className={`design-preview design-preview--${item}`} />
              <span>{DESIGN_LABELS[item]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <p className="control-label">Animation</p>
        <div className="animation-row">
          {ANIMATIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={`animation-chip${item === animation ? ' is-active' : ''}`}
              onClick={() => onAnimationChange(item)}
            >
              <span className={`animation-preview animation-preview--${item}`} />
              <span>{ANIMATION_LABELS[item]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
