import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  it('renders all main sections', () => {
    render(<App />);

    // Sections should be present with proper ids
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBe(4);
    expect(document.getElementById('photo-sessions')).toBeInTheDocument();
    expect(document.getElementById('shoots')).toBeInTheDocument();
    expect(document.getElementById('sketchup')).toBeInTheDocument();
    expect(document.getElementById('about-me')).toBeInTheDocument();
  });

  it('renders header with navigation', () => {
    render(<App />);

    expect(screen.getByText('Flor Guzman')).toBeInTheDocument();

    // Navigation links should be present
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThanOrEqual(4);
  });

  it('all sections have grid layouts with data', () => {
    render(<App />);

    // Grid layouts use role="list" for the gallery containers
    const grids = screen.getAllByRole('list', { name: /gallery/ });
    expect(grids.length).toBeGreaterThanOrEqual(3);
  });

  it('maintains proper HTML structure', () => {
    const { container } = render(<App />);

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelectorAll('section').length).toBe(4);
  });

  it('has language switcher in header', () => {
    render(<App />);

    // Language switcher should be present
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
});
