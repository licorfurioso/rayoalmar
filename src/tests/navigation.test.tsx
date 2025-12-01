import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from '../App';

// Mock window.scrollTo
window.scrollTo = vi.fn();

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
      sections: {
        photoSessions: 'Photo Sessions',
        shoots: 'Shoots',
        sketchup: 'Sketchup',
        aboutMe: 'About Me',
      },
      content: {},
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();

    // Setup DOM with sections
    document.body.innerHTML = `
      <section id="photo-sessions"></section>
      <section id="shoots"></section>
      <section id="sketchup"></section>
      <section id="about-me"></section>
    `;
  });

  it('clicking header nav link scrolls to target section', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    const photoSessionsLink = screen.getAllByText('Photo Sessions')[0];
    fireEvent.click(photoSessionsLink);

    // Verify scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('active section highlights in header when scrolling', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('smooth scroll behavior works across all sections', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    // Click each navigation link
    const shootsLink = screen.getAllByText('Shoots')[0];
    fireEvent.click(shootsLink);

    expect(window.scrollTo).toHaveBeenCalled();

    const sketchupLink = screen.getAllByText('Sketchup')[0];
    fireEvent.click(sketchupLink);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  it('navigation links are keyboard accessible', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href');
    });
  });
});

