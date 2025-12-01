import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Shoots } from './Shoots';

describe('Shoots Section', () => {
  it('renders section with correct id', () => {
    const { container } = render(<Shoots />);

    const section = container.querySelector('#shoots');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays section heading', () => {
    const { container } = render(<Shoots />);

    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
  });

  it('renders grid with data', () => {
    const { container } = render(<Shoots />);

    // Grid uses role="list" for the gallery container
    const grid = container.querySelector('[role="list"]');
    expect(grid).toBeInTheDocument();

    // Should have grid items
    const gridItems = container.querySelectorAll('[role="listitem"]');
    expect(gridItems.length).toBeGreaterThan(0);
  });
});

