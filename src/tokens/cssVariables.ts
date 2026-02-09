import type { ThemeSelection, TokenGroups } from './registry';
import { buildTokens } from './registry';

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (segment) => `-${segment.toLowerCase()}`);
}

export function flattenTokenGroups(tokens: TokenGroups) {
  const flat: Record<string, string> = {};

  (Object.keys(tokens) as Array<keyof TokenGroups>).forEach((group) => {
    const groupTokens = tokens[group];

    Object.entries(groupTokens).forEach(([name, tokenValue]) => {
      flat[`--${group}-${toKebabCase(name)}`] = tokenValue;
    });
  });

  return flat;
}

export function buildCssVariables(selection: ThemeSelection) {
  return flattenTokenGroups(buildTokens(selection));
}

export function applySelection(selection: ThemeSelection, target: HTMLElement = document.documentElement) {
  const variables = buildCssVariables(selection);
  Object.entries(variables).forEach(([name, value]) => {
    target.style.setProperty(name, value);
  });

  target.setAttribute('data-mode', selection.mode);
  target.setAttribute('data-surface', selection.surface);
  target.setAttribute('data-accent', selection.accent);
  target.setAttribute('data-animation', selection.animation ?? 'none');
  target.setAttribute('data-design', selection.design ?? 'md3');
}

export function cssRuleForSelection(selection: ThemeSelection, selector: string) {
  const lines = Object.entries(buildCssVariables(selection)).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}
