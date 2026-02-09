import { useState } from 'react';

type ChartType = 'bar' | 'area' | 'line';
type PieType = 'donut' | 'pie' | 'half';

const METRICS = [
  {
    label: 'Monthly Active Users',
    value: '182,430',
    change: '+8.4%',
    trend: 'up' as const,
    spark: [28, 35, 32, 40, 38, 52, 48, 55, 60, 58, 65, 72]
  },
  {
    label: 'Conversion Rate',
    value: '6.82%',
    change: '+1.2%',
    trend: 'up' as const,
    spark: [4.2, 4.5, 5.0, 4.8, 5.3, 5.7, 5.5, 6.0, 6.3, 6.1, 6.6, 6.8]
  },
  {
    label: 'Avg Response Time',
    value: '284ms',
    change: '-12ms',
    trend: 'down' as const,
    spark: [340, 325, 318, 310, 305, 298, 295, 290, 288, 286, 285, 284]
  },
  {
    label: 'Incident Budget',
    value: '93.1%',
    change: 'On target',
    trend: 'neutral' as const,
    spark: [90, 91, 89, 92, 91, 93, 92, 94, 93, 93, 93, 93]
  }
];

const FEED = [
  { team: 'Platform', event: 'Released edge cache rollout', time: '2m ago', status: 'healthy' as const },
  { team: 'Product', event: 'Theme picker experiment hit 41% engagement', time: '18m ago', status: 'healthy' as const },
  { team: 'Infra', event: 'Storage latency spike auto-resolved', time: '1h ago', status: 'warning' as const },
  { team: 'Data', event: 'Schema validation pipeline green', time: '3h ago', status: 'healthy' as const },
  { team: 'Security', event: 'Dependency audit — 0 critical findings', time: '4h ago', status: 'healthy' as const },
  { team: 'Mobile', event: 'iOS build 2.14 promoted to TestFlight', time: '5h ago', status: 'healthy' as const }
];

const WEEKLY = [
  { day: 'Mon', value: 34 },
  { day: 'Tue', value: 56 },
  { day: 'Wed', value: 42 },
  { day: 'Thu', value: 68 },
  { day: 'Fri', value: 75 },
  { day: 'Sat', value: 58 },
  { day: 'Sun', value: 70 }
];

const RING_SEGMENTS = [
  { label: 'Direct', pct: 42, className: 'ring-accent' },
  { label: 'Organic', pct: 28, className: 'ring-success' },
  { label: 'Referral', pct: 18, className: 'ring-warning' },
  { label: 'Paid', pct: 12, className: 'ring-muted' }
];

const PROGRESS_ITEMS = [
  { label: 'Design system v3', progress: 78, status: 'On track' },
  { label: 'API migration', progress: 45, status: 'In progress' },
  { label: 'Mobile redesign', progress: 92, status: 'Wrapping up' },
  { label: 'Auth overhaul', progress: 15, status: 'Starting' }
];

const TABLE_DATA = [
  { endpoint: '/api/users', calls: '1.2M', p95: '89ms', errors: '0.02%', status: 'healthy' },
  { endpoint: '/api/search', calls: '842K', p95: '312ms', errors: '0.18%', status: 'warning' },
  { endpoint: '/api/checkout', calls: '234K', p95: '145ms', errors: '0.05%', status: 'healthy' },
  { endpoint: '/api/analytics', calls: '567K', p95: '201ms', errors: '0.08%', status: 'healthy' },
  { endpoint: '/api/uploads', calls: '98K', p95: '890ms', errors: '1.24%', status: 'warning' }
];

const ENVIRONMENTS = [
  { name: 'Production', region: 'us-east-1', uptime: '99.98%', status: 'healthy' },
  { name: 'Staging', region: 'us-west-2', uptime: '99.82%', status: 'healthy' },
  { name: 'Preview', region: 'eu-west-1', uptime: '98.50%', status: 'warning' },
  { name: 'Canary', region: 'ap-south-1', uptime: '99.94%', status: 'healthy' }
];

const TEAM_MEMBERS = [
  { initials: 'AK', name: 'Aisha K.', role: 'Engineering Lead', color: '#4657d6' },
  { initials: 'JM', name: 'Javier M.', role: 'Product Design', color: '#0f8a67' },
  { initials: 'SL', name: 'Sara L.', role: 'Frontend', color: '#c55b4f' },
  { initials: 'DP', name: 'David P.', role: 'Backend', color: '#b77714' },
  { initials: 'MR', name: 'Mia R.', role: 'SRE', color: '#7c3aed' },
  { initials: 'TC', name: 'Tomás C.', role: 'Data Eng', color: '#0e918c' }
];

function Sparkline({ data, className = '' }: { data: number[]; className?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const step = w / (data.length - 1);

  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`sparkline ${className}`} aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  const t = 0.3;
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += ` C${p1.x + (p2.x - p0.x) * t},${p1.y + (p2.y - p0.y) * t} ${p2.x - (p3.x - p1.x) * t},${p2.y - (p3.y - p1.y) * t} ${p2.x},${p2.y}`;
  }
  return d;
}

const CHART_W = 600;
const CHART_H = 180;
const CHART_PAD_X = 20;
const CHART_PAD_TOP = 12;
const CHART_PAD_BOT = 24;
const GRID_ROWS = 4;

function chartPoints(data: typeof WEEKLY) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const chartW = CHART_W - CHART_PAD_X * 2;
  const chartH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOT;
  const step = chartW / (data.length - 1);
  return data.map((d, i) => ({
    x: CHART_PAD_X + i * step,
    y: CHART_PAD_TOP + chartH - (d.value / maxVal) * chartH
  }));
}

function GridLines() {
  const chartH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOT;
  return (
    <>
      {Array.from({ length: GRID_ROWS + 1 }, (_, i) => {
        const y = CHART_PAD_TOP + (i / GRID_ROWS) * chartH;
        return <line key={i} x1={CHART_PAD_X} y1={y} x2={CHART_W - CHART_PAD_X} y2={y} stroke="var(--color-border)" strokeWidth="0.7" opacity="0.5" />;
      })}
    </>
  );
}

function AreaChart({ data }: { data: typeof WEEKLY }) {
  const points = chartPoints(data);
  const curve = smoothPath(points);
  const bottom = CHART_H - CHART_PAD_BOT;
  const areaPath = `${curve} L${points[points.length - 1].x},${bottom} L${points[0].x},${bottom} Z`;

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" className="area-chart-svg" aria-hidden="true">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <GridLines />
      <path d={areaPath} fill="url(#areaFill)" />
      <path d={curve} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function LineChart({ data }: { data: typeof WEEKLY }) {
  const points = chartPoints(data);
  const curve = smoothPath(points);

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" className="line-chart-svg" aria-hidden="true">
      <GridLines />
      <path d={curve} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function ChartLabels({ data }: { data: typeof WEEKLY }) {
  const chartW = CHART_W - CHART_PAD_X * 2;
  const step = chartW / (data.length - 1);
  return (
    <div className="chart-labels">
      {data.map((d, i) => (
        <span key={d.day} style={{ left: `${((CHART_PAD_X + i * step) / CHART_W) * 100}%` }}>{d.day}</span>
      ))}
    </div>
  );
}

function ChartDots({ data }: { data: typeof WEEKLY }) {
  const points = chartPoints(data);
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="chart-dots-svg" aria-hidden="true">
      {points.map((p, i) => (
        <circle key={data[i].day} cx={p.x} cy={p.y} r="4.5" fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

function TrafficChart({ segments, type }: { segments: typeof RING_SEGMENTS; type: PieType }) {
  if (type === 'half') {
    const r = 42;
    const halfCirc = Math.PI * r;
    let offset = 0;
    return (
      <div className="ring-chart half-chart">
        <svg viewBox="0 0 100 60" className="ring-svg">
          {segments.map((seg) => {
            const dashLength = (seg.pct / 100) * halfCirc;
            const currentOffset = offset;
            offset += dashLength;
            return (
              <circle
                key={seg.label}
                cx="50" cy="55" r={r}
                fill="none" strokeWidth="10"
                className={seg.className}
                strokeDasharray={`${dashLength} ${halfCirc * 2 - dashLength}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
                transform="rotate(-180 50 55)"
              />
            );
          })}
        </svg>
        <div className="ring-center half-center">
          <span className="ring-total">12.4K</span>
          <span className="ring-label">visitors</span>
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    let cumPct = 0;
    return (
      <div className="ring-chart">
        <svg viewBox="0 0 100 100" className="ring-svg">
          {segments.map((seg) => {
            const startAngle = (cumPct / 100) * 360 - 90;
            cumPct += seg.pct;
            const endAngle = (cumPct / 100) * 360 - 90;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const x1 = 50 + 42 * Math.cos(startRad);
            const y1 = 50 + 42 * Math.sin(startRad);
            const x2 = 50 + 42 * Math.cos(endRad);
            const y2 = 50 + 42 * Math.sin(endRad);
            const large = seg.pct > 50 ? 1 : 0;
            const d = `M50,50 L${x1},${y1} A42,42 0 ${large},1 ${x2},${y2} Z`;
            return <path key={seg.label} d={d} className={`pie-${seg.className}`} />;
          })}
        </svg>
        <div className="ring-center">
          <span className="ring-total">12.4K</span>
          <span className="ring-label">visitors</span>
        </div>
      </div>
    );
  }

  // Default: donut
  const r = 42;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="ring-chart">
      <svg viewBox="0 0 100 100" className="ring-svg">
        {segments.map((seg) => {
          const dashLength = (seg.pct / 100) * circumference;
          const currentOffset = offset;
          offset += dashLength;
          return (
            <circle
              key={seg.label}
              cx="50" cy="50" r={r}
              fill="none" strokeWidth="10"
              className={seg.className}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          );
        })}
      </svg>
      <div className="ring-center">
        <span className="ring-total">12.4K</span>
        <span className="ring-label">visitors</span>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [pieType, setPieType] = useState<PieType>('donut');

  return (
    <article className="page-dashboard">
      <header className="dash-header stagger-in">
        <div>
          <p className="label">Dashboard Template</p>
          <h2>Operational layout with card hierarchy and readable data density.</h2>
        </div>
        <button type="button" className="btn-ghost">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export report
        </button>
      </header>

      {/* ── Metric cards with sparklines ── */}
      <section className="metric-row">
        {METRICS.map((metric, i) => (
          <div key={metric.label} className="metric-card stagger-in" style={{ '--stagger': i } as React.CSSProperties}>
            <div className="metric-top">
              <span className="metric-label">{metric.label}</span>
              <span className={`metric-badge ${metric.trend}`}>{metric.change}</span>
            </div>
            <div className="metric-bottom">
              <p className="metric-value">{metric.value}</p>
              <Sparkline data={metric.spark} className={`spark-${metric.trend}`} />
            </div>
          </div>
        ))}
      </section>

      {/* ── Row 2: Weekly chart + traffic sources ring ── */}
      <section className="dash-panels">
        <div className="card stagger-in" style={{ '--stagger': 4 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Weekly usage</h3>
            <div className="chart-toggle">
              {(['bar', 'area', 'line'] as ChartType[]).map((t) => (
                <button key={t} type="button" className={`chart-toggle-btn${chartType === t ? ' is-active' : ''}`} onClick={() => setChartType(t)}>
                  {t === 'bar' && (
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="1" y="8" width="3" height="7" rx="0.5" /><rect x="6" y="4" width="3" height="11" rx="0.5" /><rect x="11" y="1" width="3" height="14" rx="0.5" /></svg>
                  )}
                  {t === 'area' && (
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M1 14 L1 10 Q4 4 8 7 Q12 10 15 3 L15 14 Z" opacity="0.3" /><path d="M1 10 Q4 4 8 7 Q12 10 15 3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  )}
                  {t === 'line' && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1 12 L5 6 L9 9 L15 3" /><circle cx="1" cy="12" r="1.5" fill="currentColor" /><circle cx="15" cy="3" r="1.5" fill="currentColor" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          {chartType === 'bar' && (
            <div className="chart-area" role="img" aria-label="Weekly usage bars">
              {WEEKLY.map((d) => (
                <div key={d.day} className="chart-col">
                  <div className="chart-bar-track">
                    <div className="chart-bar" style={{ height: `${d.value}%` }} />
                  </div>
                  <span className="chart-label">{d.day}</span>
                </div>
              ))}
            </div>
          )}
          {chartType === 'area' && (
            <div className="svg-chart-area" role="img" aria-label="Weekly usage area chart">
              <AreaChart data={WEEKLY} />
              <ChartDots data={WEEKLY} />
              <ChartLabels data={WEEKLY} />
            </div>
          )}
          {chartType === 'line' && (
            <div className="svg-chart-area" role="img" aria-label="Weekly usage line chart">
              <LineChart data={WEEKLY} />
              <ChartDots data={WEEKLY} />
              <ChartLabels data={WEEKLY} />
            </div>
          )}
        </div>

        <div className="card stagger-in" style={{ '--stagger': 5 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Traffic sources</h3>
            <div className="chart-toggle">
              {(['donut', 'pie', 'half'] as PieType[]).map((t) => (
                <button key={t} type="button" className={`chart-toggle-btn${pieType === t ? ' is-active' : ''}`} onClick={() => setPieType(t)}>
                  {t === 'donut' && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="8" cy="8" r="5" /></svg>
                  )}
                  {t === 'pie' && (
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M8 8 L8 2 A6 6 0 0 1 14 8 Z" fill="var(--color-surface)" /></svg>
                  )}
                  {t === 'half' && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M3 10 A5 5 0 0 1 13 10" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="ring-layout">
            <TrafficChart segments={RING_SEGMENTS} type={pieType} />
            <div className="ring-legend">
              {RING_SEGMENTS.map((seg) => (
                <div key={seg.label} className="legend-item">
                  <span className={`legend-dot ${seg.className}`} />
                  <span className="legend-name">{seg.label}</span>
                  <span className="legend-pct">{seg.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 3: Progress + Activity ── */}
      <section className="dash-panels">
        <div className="card stagger-in" style={{ '--stagger': 6 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Project progress</h3>
            <span className="card-meta">Q1 roadmap</span>
          </div>
          <div className="progress-list">
            {PROGRESS_ITEMS.map((item) => (
              <div key={item.label} className="progress-item">
                <div className="progress-header">
                  <span className="progress-name">{item.label}</span>
                  <span className="progress-status">{item.status}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${item.progress}%` }} />
                </div>
                <span className="progress-pct">{item.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card stagger-in" style={{ '--stagger': 7 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Team activity</h3>
            <span className="card-meta">Recent events</span>
          </div>
          <ul className="activity-feed">
            {FEED.map((item) => (
              <li key={item.event} className="feed-item">
                <span className={`feed-dot ${item.status}`} />
                <div className="feed-body">
                  <div className="feed-top">
                    <strong>{item.team}</strong>
                    <time>{item.time}</time>
                  </div>
                  <p>{item.event}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Row 4: API endpoints table ── */}
      <div className="card stagger-in" style={{ '--stagger': 8 } as React.CSSProperties}>
        <div className="card-head">
          <h3>API endpoints</h3>
          <span className="card-meta">Last 24h</span>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Endpoint</th>
                <th>Calls</th>
                <th>P95 Latency</th>
                <th>Error Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row) => (
                <tr key={row.endpoint}>
                  <td><code>{row.endpoint}</code></td>
                  <td>{row.calls}</td>
                  <td>{row.p95}</td>
                  <td>{row.errors}</td>
                  <td><span className={`table-status ${row.status}`} />{row.status === 'healthy' ? 'Healthy' : 'Degraded'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 5: Environments + Team ── */}
      <section className="dash-panels">
        <div className="card stagger-in" style={{ '--stagger': 9 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Environments</h3>
            <span className="card-meta">Live status</span>
          </div>
          <div className="env-grid">
            {ENVIRONMENTS.map((env) => (
              <div key={env.name} className="env-card">
                <div className="env-top">
                  <span className={`env-dot ${env.status}`} />
                  <strong>{env.name}</strong>
                </div>
                <div className="env-details">
                  <span>{env.region}</span>
                  <span className="env-uptime">{env.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card stagger-in" style={{ '--stagger': 10 } as React.CSSProperties}>
          <div className="card-head">
            <h3>Team</h3>
            <span className="card-meta">6 members</span>
          </div>
          <div className="team-list">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.initials} className="team-member">
                <span className="team-avatar" style={{ background: member.color }}>{member.initials}</span>
                <div className="team-info">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
