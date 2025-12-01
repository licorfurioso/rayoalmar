import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  beforeEach(() => {
    // Reset window.scrollTo mock before each test
    window.scrollTo = vi.fn();
  });

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

  it('handles navigation click when target element exists', () => {
    // Create a mock element with getBoundingClientRect
    const mockElement = document.createElement('section');
    mockElement.id = 'photo-sessions';
    mockElement.getBoundingClientRect = vi.fn(() => ({
      top: 500,
      bottom: 1000,
      left: 0,
      right: 1000,
      width: 1000,
      height: 500,
      x: 0,
      y: 500,
      toJSON: () => {},
    }));
    document.body.appendChild(mockElement);

    // Mock window properties
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 100,
    });

    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    const photoSessionsLink = screen.getByText('Photo Sessions');
    fireEvent.click(photoSessionsLink);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 520, // 500 (top) + 100 (pageYOffset) - 80 (headerOffset)
      behavior: 'smooth',
    });

    // Cleanup
    document.body.removeChild(mockElement);
  });

  it('handles navigation click when target element does not exist', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    const photoSessionsLink = screen.getByText('Photo Sessions');
    fireEvent.click(photoSessionsLink);

    // scrollTo should not be called when element doesn't exist
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('prevents default navigation behavior', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Header />
      </I18nextProvider>
    );

    const photoSessionsLink = screen.getByText('Photo Sessions');
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    photoSessionsLink.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
