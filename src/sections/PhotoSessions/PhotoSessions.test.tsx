import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhotoSessions } from './PhotoSessions';

describe('PhotoSessions Section', () => {
  it('renders section with correct id and aria-label', () => {
    render(<PhotoSessions />);

    const section = screen.getByLabelText('Photo Sessions');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'photo-sessions');
  });

  it('displays section heading', () => {
    render(<PhotoSessions />);

    expect(screen.getByRole('heading', { name: 'Photo Sessions' })).toBeInTheDocument();
  });

  it('renders carousel with data', () => {
    render(<PhotoSessions />);

    const carousel = screen.getByRole('region', { name: 'Photo Sessions carousel' });
    expect(carousel).toBeInTheDocument();
  });

  it('maintains semantic HTML structure', () => {
    render(<PhotoSessions />);

    const section = screen.getByRole('region', { name: 'Photo Sessions' });
    expect(section.tagName).toBe('SECTION');
  });
});

