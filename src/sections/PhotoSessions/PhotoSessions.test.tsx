import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PhotoSessions } from './PhotoSessions';

describe('PhotoSessions Section', () => {
  it('renders section with correct id', () => {
    const { container } = render(<PhotoSessions />);

    const section = container.querySelector('#photo-sessions');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays section heading', () => {
    const { container } = render(<PhotoSessions />);

    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
  });

  it('renders grid with data', () => {
    const { container } = render(<PhotoSessions />);

    // Grid uses role="list" for the gallery container
    const grid = container.querySelector('[role="list"]');
    expect(grid).toBeInTheDocument();

    // Should have grid items
    const gridItems = container.querySelectorAll('[role="listitem"]');
    expect(gridItems.length).toBeGreaterThan(0);
  });

  it('maintains semantic HTML structure', () => {
    const { container } = render(<PhotoSessions />);

    const section = container.querySelector('#photo-sessions');
    expect(section?.tagName).toBe('SECTION');
  });
});

