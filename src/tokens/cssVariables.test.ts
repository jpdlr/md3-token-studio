import { describe, expect, it } from 'vitest';
import { buildCssVariables } from './cssVariables';

describe('buildCssVariables', () => {
  it('flattens token groups into css variable map', () => {
    const cssVariables = buildCssVariables({ mode: 'light', surface: 'solid', accent: 'amber' });

    expect(cssVariables['--color-bg']).toBe('#f5f5f7');
    expect(cssVariables['--color-accent']).toBe('#b77714');
    expect(cssVariables['--typography-font-display']).toContain('Fraunces');
    expect(cssVariables['--spacing-md']).toBe('1rem');
  });
});
