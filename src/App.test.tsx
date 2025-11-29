import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  it('renders all main sections', () => {
    render(<App />);

    expect(screen.getByLabelText('Photo Sessions')).toBeInTheDocument();
    expect(screen.getByLabelText('Shoots')).toBeInTheDocument();
    expect(screen.getByLabelText('Sketchup Drawings')).toBeInTheDocument();
    expect(screen.getByLabelText('About Me')).toBeInTheDocument();
  });

  it('renders header with navigation', () => {
    render(<App />);

    expect(screen.getByText('Flor Guzman')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Photo Sessions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shoots' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sketchup' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument();
  });

  it('all sections have carousels with data', () => {
    render(<App />);

    const carousels = screen.getAllByRole('region', { name: /carousel/ });
    expect(carousels.length).toBeGreaterThanOrEqual(3);
  });

  it('maintains proper HTML structure', () => {
    const { container } = render(<App />);

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelectorAll('section').length).toBe(4);
  });

  it('all images have alt text', () => {
    render(<App />);

    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});

