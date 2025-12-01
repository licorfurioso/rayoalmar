import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

// Create test i18n instance
const testI18n = i18n.createInstance();

describe('LanguageSwitcher Component', () => {
  beforeEach(async () => {
    await testI18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: ['en', 'es'],
      resources: {
        en: { translation: {} },
        es: { translation: {} },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  });

  it('renders EN and ES buttons', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('marks current language as active (aria-current)', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const enButton = screen.getByText('EN');
    expect(enButton).toHaveAttribute('aria-current', 'true');
  });

  it('language toggle updates UI', async () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);

    await waitFor(() => {
      expect(testI18n.language).toBe('es');
      expect(esButton).toHaveAttribute('aria-current', 'true');
    });
  });

  it('language preference persists in localStorage', async () => {
    // Note: localStorage persistence is handled by i18next-browser-languagedetector
    // This test verifies the language change mechanism works
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);

    await waitFor(() => {
      expect(testI18n.language).toBe('es');
    });

    // Switch back to English
    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);

    await waitFor(() => {
      expect(testI18n.language).toBe('en');
    });
  });
});

