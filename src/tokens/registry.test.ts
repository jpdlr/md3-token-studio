import { describe, expect, it } from 'vitest';
import { buildTokens } from './registry';

describe('buildTokens', () => {
  it('returns mode-aware accent and neutral surfaces', () => {
    const light = buildTokens({ mode: 'light', surface: 'solid', accent: 'indigo' });
    const dark = buildTokens({ mode: 'dark', surface: 'solid', accent: 'indigo' });

    expect(light.color.bg).toBe('#f5f5f7');
    expect(dark.color.bg).toBe('#09090b');
    expect(light.color.accent).toBe('#4657d6');
    expect(dark.color.accent).toBe('#7f8df4');
  });

  it('produces identical tokens regardless of surface choice', () => {
    const solid = buildTokens({ mode: 'light', surface: 'solid', accent: 'coral' });
    const glass = buildTokens({ mode: 'light', surface: 'glass', accent: 'coral' });
    const mesh = buildTokens({ mode: 'light', surface: 'mesh', accent: 'coral' });

    expect(solid).toEqual(glass);
    expect(solid).toEqual(mesh);
  });
});
