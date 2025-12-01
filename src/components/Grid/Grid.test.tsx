import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Grid } from './Grid';
import { mockPhotoSessions } from '../../tests/fixtures';
import type { ContentItem } from '../../types/content';

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      content: {
        'photo-sessions': {
          '1': {
            title: 'Translated Title 1',
            description: 'Translated Description 1',
          },
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

describe('Grid Component', () => {
  it('renders grid container with proper role="list"', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridContainer = screen.getByRole('list', {
      name: /photo-sessions gallery/i,
    });
    expect(gridContainer).toBeInTheDocument();
  });

  it('renders grid items with mock data', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    expect(screen.getByAltText('Test Photo Session 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo Session 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo Session 3')).toBeInTheDocument();
  });

  it('applies responsive grid layout classes', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridElement = container.querySelector('[role="list"]');
    expect(gridElement).toBeTruthy();
    expect(gridElement?.className).toContain('grid');
  });

  it('handles empty data array gracefully', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={[]} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridContainer = screen.getByRole('list');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer.children.length).toBe(0);
  });

  it('handles image load event correctly', async () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const image = screen.getByAltText(
      'Test Photo Session 1'
    ) as HTMLImageElement;

    // Initially image should have opacity 0
    expect(image.style.opacity).toBe('0');

    // Simulate image load
    fireEvent.load(image);

    await waitFor(() => {
      expect(image.style.opacity).toBe('1');
    });
  });

  it('handles image error and displays error placeholder', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const image = screen.getByAltText(
      'Test Photo Session 1'
    ) as HTMLImageElement;

    // Simulate image error
    fireEvent.error(image);

    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to load image for item: test-ps-1'
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('renders without category and uses fallback titles', () => {
    const dataWithoutTranslation: ContentItem[] = [
      {
        id: 'test-1',
        title: 'Fallback Title',
        description: 'Fallback Description',
        imageUrl: '/test.jpg',
        date: '2024',
        order: 1,
      },
    ];

    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={dataWithoutTranslation} />
      </I18nextProvider>
    );

    expect(screen.getByText('Fallback Title')).toBeInTheDocument();
    expect(screen.getByText('Fallback Description')).toBeInTheDocument();
  });

  it('handles items with translations when category is provided', () => {
    const testI18nWithTranslation = i18n.createInstance();
    testI18nWithTranslation.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: {
          content: {
            'photo-sessions': {
              'test-ps-1': {
                title: 'Translated Title 1',
                description: 'Translated Description 1',
              },
            },
          },
        },
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

    render(
      <I18nextProvider i18n={testI18nWithTranslation}>
        <Grid data={mockPhotoSessions.slice(0, 1)} category="photo-sessions" />
      </I18nextProvider>
    );

    // Should use translated title from i18n
    expect(screen.getByText('Translated Title 1')).toBeInTheDocument();
  });

  it('renders items without description', () => {
    const dataWithoutDescription: ContentItem[] = [
      {
        id: 'test-no-desc',
        title: 'Title Only',
        imageUrl: '/test.jpg',
        date: '2024',
        order: 1,
      },
    ];

    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={dataWithoutDescription} />
      </I18nextProvider>
    );

    expect(screen.getByText('Title Only')).toBeInTheDocument();
  });

  it('renders items without title', () => {
    const dataWithoutTitle: ContentItem[] = [
      {
        id: 'test-no-title',
        title: '',
        imageUrl: '/test.jpg',
        description: 'Description Only',
        date: '2024',
        order: 1,
      },
    ];

    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={dataWithoutTitle} />
      </I18nextProvider>
    );

    expect(screen.getByText('Description Only')).toBeInTheDocument();
    // Title element should not be rendered
    const h3Elements = container.querySelectorAll('h3');
    expect(h3Elements.length).toBe(0);
  });

  it('renders date when provided', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
    expect(screen.getByText('2024-03-10')).toBeInTheDocument();
  });
});
