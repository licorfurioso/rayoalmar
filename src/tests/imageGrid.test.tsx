import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Grid } from '../components/Grid/Grid';
import { mockPhotoSessions, mockShoots } from './fixtures';

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { content: {} },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('Image Grid Lazy Loading Integration', () => {
  it('images load progressively with IntersectionObserver', async () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    // Images should be in the document with loading="lazy"
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(3);

    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('skeleton loaders display before images load', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    // Skeleton loaders should be present
    const skeletons = container.querySelectorAll('[class*="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('images transition from skeleton to loaded state', async () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const images = container.querySelectorAll('img');

    // Simulate image load
    images.forEach((img) => {
      fireEvent.load(img);
    });

    // Wait for state updates
    await waitFor(() => {
      expect(images[0]).toHaveStyle({ opacity: '1' });
    });
  });

  it('grid handles multiple sections with different data', () => {
    const { rerender } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    expect(screen.getByAltText('Test Photo Session 1')).toBeInTheDocument();

    rerender(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockShoots} category="shoots" />
      </I18nextProvider>
    );

    expect(screen.getByAltText('Test Shoot 1')).toBeInTheDocument();
  });
});
