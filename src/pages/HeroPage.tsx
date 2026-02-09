const FEATURES = [
  {
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    title: 'Tokenized foundations',
    text: 'Color, typography, spacing, radius, and elevation tokens live in one source of truth with runtime CSS variable injection.'
  },
  {
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    title: 'Page-level starters',
    text: 'Production-friendly hero and dashboard compositions so you ship polished pages without rebuilding base styling.'
  },
  {
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Surface experimentation',
    text: 'Flip between 1,152 theme combinations instantly — modes, surfaces, accents, design themes, and animations — to validate direction early.'
  }
];

const STATS = [
  { value: '1152', label: 'Theme combos' },
  { value: '6', label: 'Control axes' },
  { value: '40+', label: 'CSS variables' }
];

export function HeroPage() {
  return (
    <article className="page-hero">
      <section className="hero-banner stagger-in">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />
        <p className="label">Website Hero Section</p>
        <h2>
          Build brand-first<br />
          landing pages on a<br />
          <span className="hero-accent">stable token engine.</span>
        </h2>
        <p className="hero-sub">
          Editorial typography, card elevation, and practical CTA placement
          so teams ship polished marketing pages fast.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn-primary">
            Start from this hero
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className="btn-ghost">View component anatomy</button>
        </div>

        <div className="hero-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-strip">
        {FEATURES.map((feature, i) => (
          <div key={feature.title} className="feature-card stagger-in" style={{ '--stagger': i } as React.CSSProperties}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={feature.icon} />
              </svg>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
