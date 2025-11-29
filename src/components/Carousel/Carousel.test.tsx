import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Carousel } from './Carousel';
import type { ContentItem } from '../../types/content';

describe('Carousel Component', () => {
  const mockData: ContentItem[] = [
    {
      id: '1',
      title: 'Test Image 1',
      imageUrl: '/images/test-1.jpg',
      description: 'Test description 1',
      date: '2024-01-01',
      order: 1,
    },
    {
      id: '2',
      title: 'Test Image 2',
      imageUrl: '/images/test-2.jpg',
      date: '2024-01-02',
      order: 2,
    },
  ];

  it('renders carousel with provided data', () => {
    render(<Carousel data={mockData} category="Test Gallery" />);

    expect(screen.getByLabelText('Test Gallery carousel')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
  });

  it('displays image titles and descriptions', () => {
    render(<Carousel data={mockData} />);

    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });

  it('applies lazy loading to images', () => {
    render(<Carousel data={mockData} />);

    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('renders with correct ARIA labels', () => {
    render(<Carousel data={mockData} category="Photo Sessions" />);

    const carousel = screen.getByRole('region');
    expect(carousel).toHaveAttribute('aria-label', 'Photo Sessions carousel');
  });

  it('handles empty data array gracefully', () => {
    render(<Carousel data={[]} />);

    const carousel = screen.getByRole('region');
    expect(carousel).toBeInTheDocument();
  });
});

