import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { PhotoSessions } from './PhotoSessions';

// Mock the data import
vi.mock('../../data/photoSessions.json', () => ({
  default: [
    {
      id: 'test-ps-1',
      title: 'Test Photo Session 1',
      imageUrl: '/test-images/photo-session-01.svg',
      description: 'Test photo session description 1',
      date: '2024-01-15',
      order: 1,
    },
    {
      id: 'test-ps-2',
      title: 'Test Photo Session 2',
      imageUrl: '/test-images/photo-session-02.svg',
      description: 'Test photo session description 2',
      date: '2024-02-20',
      order: 2,
    },
  ],
}));

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      sections: { photoSessions: 'Photo Sessions' },
      content: {},
    },
    es: {
      sections: { photoSessions: 'Sesiones Fotográficas' },
      content: {},
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('PhotoSessions Section', () => {
  it('section renders with correct ID "photo-sessions"', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <PhotoSessions />
      </I18nextProvider>
    );

    const section = container.querySelector('#photo-sessions');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('grid component renders with fixture data', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <PhotoSessions />
      </I18nextProvider>
    );

    const grid = container.querySelector('[role="list"]');
    expect(grid).toBeInTheDocument();

    // Verify mock data is rendered
    expect(screen.getByAltText('Test Photo Session 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo Session 2')).toBeInTheDocument();
  });

  it('i18n translations display correctly (EN/ES)', async () => {
    const { rerender } = render(
      <I18nextProvider i18n={testI18n}>
        <PhotoSessions />
      </I18nextProvider>
    );

    expect(screen.getByText('Photo Sessions')).toBeInTheDocument();

    await testI18n.changeLanguage('es');
    rerender(
      <I18nextProvider i18n={testI18n}>
        <PhotoSessions />
      </I18nextProvider>
    );

    expect(screen.getByText('Sesiones Fotográficas')).toBeInTheDocument();
  });

  it('section heading displays translated text', async () => {
    await testI18n.changeLanguage('en');

    render(
      <I18nextProvider i18n={testI18n}>
        <PhotoSessions />
      </I18nextProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Photo Sessions');
  });
});

