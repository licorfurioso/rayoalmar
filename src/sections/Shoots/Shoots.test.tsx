import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Shoots } from './Shoots';

describe('Shoots Section', () => {
  it('renders section with correct id and aria-label', () => {
    render(<Shoots />);

    const section = screen.getByLabelText('Shoots');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'shoots');
  });

  it('displays section heading', () => {
    render(<Shoots />);

    expect(screen.getByRole('heading', { name: 'Shoots' })).toBeInTheDocument();
  });

  it('renders carousel with data', () => {
    render(<Shoots />);

    const carousel = screen.getByRole('region', { name: 'Shoots carousel' });
    expect(carousel).toBeInTheDocument();
  });
});

