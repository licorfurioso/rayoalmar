import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Header } from './Header';

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      navigation: {
        photoSessions: 'Photo Sessions',
        shoots: 'Shoots',
        sketchup: 'Sketchup',
        aboutMe: 'About Me',
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

describe('Header Component', () => {
  it('renders site title "Flor Guzman"', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    expect(screen.getByText('Flor Guzman')).toBeInTheDocument();
  });

  it('renders all navigation links (4 sections)', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    expect(screen.getByText('Photo Sessions')).toBeInTheDocument();
    expect(screen.getByText('Shoots')).toBeInTheDocument();
    expect(screen.getByText('Sketchup')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('active section highlighting updates correctly', () => {
    const { rerender } = render(
      <I18nextProvider i18n={testI18n}>
        <Header activeSection="photo-sessions" />
      </I18nextProvider>
    );

    const photoSessionsLink = screen.getByText('Photo Sessions');
    expect(photoSessionsLink.className).toContain('active');

    rerender(
      <I18nextProvider i18n={testI18n}>
        <Header activeSection="shoots" />
      </I18nextProvider>
    );

    const shootsLink = screen.getByText('Shoots');
    expect(shootsLink.className).toContain('active');
  });

  it('language switcher is present', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
});

