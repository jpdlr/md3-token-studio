import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('MD3 Token Studio flows', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-mode');
    document.documentElement.removeAttribute('data-surface');
    document.documentElement.removeAttribute('data-accent');
    document.documentElement.removeAttribute('data-animation');
    document.documentElement.removeAttribute('data-design');
  });

  it('switches pages and applies mode/surface/accent pickers', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /dashboard/i }));
    expect(screen.getByRole('heading', { name: /operational layout/i })).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: /dark/i }));
    await user.click(screen.getByRole('button', { name: /^glass$/i }));
    await user.click(screen.getByRole('button', { name: /coral/i }));

    expect(document.documentElement).toHaveAttribute('data-mode', 'dark');
    expect(document.documentElement).toHaveAttribute('data-surface', 'glass');
    expect(document.documentElement).toHaveAttribute('data-accent', 'coral');

    await user.click(screen.getByRole('button', { name: /style guide/i }));
    expect(screen.getByRole('heading', { name: /token docs/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /copy usage snippet/i }));
    expect(screen.getByText(/(copied|could not copy) usage snippet/i)).toBeInTheDocument();
  });
});
