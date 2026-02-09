import { useMemo, useState } from 'react';
import { buildCssVariables, cssRuleForSelection } from '../tokens/cssVariables';
import type { AccentName, AnimationName, DesignTheme, Mode, SurfaceName, TokenGroups } from '../tokens/registry';

interface StyleGuidePageProps {
  tokens: TokenGroups;
  mode: Mode;
  surface: SurfaceName;
  accent: AccentName;
  animation: AnimationName;
  design: DesignTheme;
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', 'true');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(input);

  if (!copied) {
    throw new Error('Clipboard not available');
  }
}

function TokenTable({ title, entries }: { title: string; entries: [string, string][] }) {
  return (
    <div className="token-table">
      <h4>{title}</h4>
      <div className="token-rows">
        {entries.map(([name, value]) => (
          <div key={name} className="token-row">
            <code>{name}</code>
            <span className="token-val">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StyleGuidePage({ tokens, mode, surface, accent, animation, design }: StyleGuidePageProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [copyLabel, setCopyLabel] = useState<string>('');
  const selection = useMemo(() => ({ mode, surface, accent }), [mode, surface, accent]);

  const cssSnippet = useMemo(
    () =>
      cssRuleForSelection(
        selection,
        `[data-surface="${surface}"][data-mode="${mode}"][data-accent="${accent}"]`
      ),
    [selection, surface, mode, accent]
  );
  const jsonSnippet = useMemo(
    () => JSON.stringify(buildCssVariables(selection), null, 2),
    [selection]
  );
  const usageSnippet = useMemo(
    () =>
      `<html data-surface="${surface}" data-mode="${mode}" data-accent="${accent}" data-animation="${animation}" data-design="${design}">\n  <!-- app root -->\n</html>`,
    [surface, mode, accent, animation, design]
  );

  async function handleCopy(kind: 'css' | 'json' | 'usage', value: string) {
    try {
      await copyToClipboard(value);
      setCopyState('copied');
      setCopyLabel(kind);
    } catch {
      setCopyState('error');
      setCopyLabel(kind);
    }
  }

  return (
    <article className="page-guide">
      <header className="guide-header stagger-in">
        <p className="label">Style Guide</p>
        <h2>Token docs, component references, and implementation handoff.</h2>
        <p className="guide-profile">Current profile: <code>{design} / {surface} / {mode} / {accent}{animation !== 'none' ? ` / ${animation}` : ''}</code></p>
        {copyState !== 'idle' && (
          <p className={`toast ${copyState}`}>
            {copyState === 'copied' ? `Copied ${copyLabel} snippet.` : `Could not copy ${copyLabel} snippet.`}
          </p>
        )}
      </header>

      <section className="guide-tokens">
        <div className="card stagger-in" style={{ '--stagger': 0 } as React.CSSProperties}>
          <div className="card-head"><h3>Color system</h3></div>
          <div className="color-grid">
            {Object.entries(tokens.color).map(([name]) => {
              const varName = `--color-${name.replace(/[A-Z]/g, (p) => `-${p.toLowerCase()}`)}`;
              return (
                <div key={name} className="color-cell">
                  <span className="color-preview" style={{ background: `var(${varName})` }} />
                  <span className="color-name">{name}</span>
                  <code className="color-var">{varName}</code>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card stagger-in" style={{ '--stagger': 1 } as React.CSSProperties}>
          <div className="card-head"><h3>Typography</h3></div>
          <div className="type-specimens">
            <p className="specimen-display">The quick brown fox jumps</p>
            <p className="specimen-body">
              Body copy for product descriptions, UI labels, and dashboard tables. Designed for comfortable
              reading at any viewport width with balanced line height and tracking.
            </p>
            <p className="specimen-caption">Caption and metadata text at smaller sizes</p>
          </div>
          <TokenTable title="Font tokens" entries={Object.entries(tokens.typography).slice(0, 4)} />
          <TokenTable title="Size tokens" entries={Object.entries(tokens.typography).slice(4)} />
        </div>

        <div className="guide-double">
          <div className="card stagger-in" style={{ '--stagger': 2 } as React.CSSProperties}>
            <div className="card-head"><h3>Spacing</h3></div>
            <div className="spacing-vis">
              {Object.entries(tokens.spacing).map(([name, value]) => (
                <div key={name} className="spacing-row">
                  <code>{name}</code>
                  <div className="spacing-bar" style={{ width: value }} />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card stagger-in" style={{ '--stagger': 3 } as React.CSSProperties}>
            <div className="card-head"><h3>Radius</h3></div>
            <div className="radius-vis">
              {Object.entries(tokens.radius).map(([name, value]) => (
                <div key={name} className="radius-sample">
                  <span className="radius-box" style={{ borderRadius: value }} />
                  <code>{name}</code>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="guide-export">
        {([
          { id: 'css' as const, title: 'CSS Variables', snippet: cssSnippet, label: 'Copy CSS variables' },
          { id: 'json' as const, title: 'Token JSON', snippet: jsonSnippet, label: 'Copy token JSON' },
          { id: 'usage' as const, title: 'Usage Snippet', snippet: usageSnippet, label: 'Copy usage snippet' }
        ]).map((block, i) => (
          <div key={block.id} className="card snippet-card stagger-in" style={{ '--stagger': i + 4 } as React.CSSProperties}>
            <div className="card-head">
              <h3>{block.title}</h3>
              <button type="button" className="copy-btn" onClick={() => handleCopy(block.id, block.snippet)}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                {block.label}
              </button>
            </div>
            <pre className="snippet-pre"><code>{block.snippet}</code></pre>
          </div>
        ))}
      </section>
    </article>
  );
}
