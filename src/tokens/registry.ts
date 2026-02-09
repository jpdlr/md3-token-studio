export type Mode = 'light' | 'dark';
export type SurfaceName = 'solid' | 'gradient' | 'glass' | 'mesh';
export type AccentName = 'indigo' | 'emerald' | 'coral' | 'amber' | 'rose' | 'violet' | 'teal' | 'slate' | 'mono';
export type AnimationName = 'none' | 'aurora' | 'waves' | 'pulse';
export type DesignTheme = 'md3' | 'minimal' | 'glass' | 'shadcn';

export interface ThemeSelection {
  mode: Mode;
  surface: SurfaceName;
  accent: AccentName;
  animation?: AnimationName;
  design?: DesignTheme;
}

export interface TokenGroups {
  color: Record<string, string>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  elevation: Record<string, string>;
}

const MODE_NEUTRALS: Record<Mode, Record<string, string>> = {
  light: {
    bg: '#f5f5f7',
    surface: '#ffffff',
    surfaceMuted: '#ebebef',
    text: '#18181b',
    textMuted: '#6b6b76',
    border: '#d4d4d9',
    outline: '#a1a1aa'
  },
  dark: {
    bg: '#09090b',
    surface: '#141416',
    surfaceMuted: '#1e1e22',
    text: '#fafafa',
    textMuted: '#a0a0ab',
    border: '#27272d',
    outline: '#3f3f47'
  }
};

const ACCENTS: Record<AccentName, Record<Mode, { base: string; strong: string; soft: string }>> = {
  indigo: {
    light: { base: '#4657d6', strong: '#3140b9', soft: '#dbe0ff' },
    dark: { base: '#7f8df4', strong: '#a3adff', soft: '#2a3168' }
  },
  emerald: {
    light: { base: '#0f8a67', strong: '#0d6f54', soft: '#cff7e8' },
    dark: { base: '#55d4aa', strong: '#7de5c0', soft: '#184a3a' }
  },
  coral: {
    light: { base: '#c55b4f', strong: '#a0473d', soft: '#ffdcd7' },
    dark: { base: '#ff9e93', strong: '#ffb6ad', soft: '#6a2d28' }
  },
  amber: {
    light: { base: '#b77714', strong: '#925f10', soft: '#ffe9ca' },
    dark: { base: '#f4bf5d', strong: '#ffd693', soft: '#5e4317' }
  },
  rose: {
    light: { base: '#d14d72', strong: '#b03a5c', soft: '#ffe0ea' },
    dark: { base: '#f78da7', strong: '#ffa8be', soft: '#5e2038' }
  },
  violet: {
    light: { base: '#7c3aed', strong: '#6025d1', soft: '#ede5ff' },
    dark: { base: '#a78bfa', strong: '#c4a8ff', soft: '#3b2170' }
  },
  teal: {
    light: { base: '#0e918c', strong: '#0b7571', soft: '#ccf5f3' },
    dark: { base: '#5cd5d0', strong: '#80e5e1', soft: '#164544' }
  },
  slate: {
    light: { base: '#4b6584', strong: '#3a506b', soft: '#dbe5ef' },
    dark: { base: '#8baac5', strong: '#a8c4dd', soft: '#253545' }
  },
  mono: {
    light: { base: '#18181b', strong: '#09090b', soft: '#e4e4e7' },
    dark: { base: '#d4d4d8', strong: '#fafafa', soft: '#27272a' }
  }
};

const TYPOGRAPHY = {
  fontBody: '"Sora", "Avenir Next", "Segoe UI", sans-serif',
  fontDisplay: '"Fraunces", "Times New Roman", serif',
  sizeHero: 'clamp(2.5rem, 6vw, 4.8rem)',
  sizeTitle: 'clamp(1.5rem, 2.6vw, 2.2rem)',
  sizeBody: '1rem',
  sizeCaption: '0.82rem',
  weightBody: '420',
  weightSemibold: '600',
  weightDisplay: '650',
  tracking: '0.01em'
};

const SPACING = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  section: 'clamp(2.5rem, 6vw, 5rem)'
};

const RADIUS = {
  sm: '10px',
  md: '16px',
  lg: '22px',
  xl: '30px',
  pill: '999px'
};

const ELEVATION = {
  flat: 'none',
  low: '0 1px 2px rgba(21, 24, 32, 0.08), 0 6px 14px rgba(21, 24, 32, 0.06)',
  medium: '0 2px 6px rgba(21, 24, 32, 0.09), 0 16px 26px rgba(21, 24, 32, 0.1)',
  high: '0 10px 22px rgba(21, 24, 32, 0.12), 0 24px 60px rgba(21, 24, 32, 0.18)'
};

export const SURFACES: SurfaceName[] = ['solid', 'gradient', 'glass', 'mesh'];
export const ACCENT_OPTIONS: AccentName[] = ['indigo', 'emerald', 'coral', 'amber', 'rose', 'violet', 'teal', 'slate', 'mono'];
export const ANIMATIONS: AnimationName[] = ['none', 'aurora', 'waves', 'pulse'];
export const DESIGN_THEMES: DesignTheme[] = ['md3', 'minimal', 'glass', 'shadcn'];

export function buildTokens(selection: ThemeSelection): TokenGroups {
  const neutrals = MODE_NEUTRALS[selection.mode];
  const accent = ACCENTS[selection.accent][selection.mode];

  return {
    color: {
      bg: neutrals.bg,
      surface: neutrals.surface,
      surfaceMuted: neutrals.surfaceMuted,
      text: neutrals.text,
      textMuted: neutrals.textMuted,
      border: neutrals.border,
      outline: neutrals.outline,
      accent: accent.base,
      accentStrong: accent.strong,
      accentSoft: accent.soft,
      success: selection.mode === 'light' ? '#137554' : '#62d5af',
      warning: selection.mode === 'light' ? '#aa6f16' : '#f0bc63',
      danger: selection.mode === 'light' ? '#ad403f' : '#ff9c99'
    },
    typography: TYPOGRAPHY,
    spacing: SPACING,
    radius: RADIUS,
    elevation: ELEVATION
  };
}

export function listThemeCombos() {
  return SURFACES.flatMap((surface) =>
    ACCENT_OPTIONS.flatMap((accent) =>
      (['light', 'dark'] as Mode[]).map((mode) => ({ surface, accent, mode }))
    )
  );
}
