import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sketchup } from './Sketchup';

describe('Sketchup Section', () => {
  it('renders section with correct id and aria-label', () => {
    render(<Sketchup />);

    const section = screen.getByLabelText('Sketchup Drawings');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'sketchup');
  });

  it('displays section heading', () => {
    render(<Sketchup />);

    expect(screen.getByRole('heading', { name: 'Sketchup' })).toBeInTheDocument();
  });

  it('renders carousel with data', () => {
    render(<Sketchup />);

    const carousel = screen.getByRole('region', { name: 'Sketchup carousel' });
    expect(carousel).toBeInTheDocument();
  });
});

