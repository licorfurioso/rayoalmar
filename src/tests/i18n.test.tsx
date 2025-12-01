import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher/LanguageSwitcher';
import { Header } from '../components/Header/Header';

// Import translation files directly for testing
import enCommon from '../../public/locales/en/common.json';
import enNavigation from '../../public/locales/en/navigation.json';
import enSections from '../../public/locales/en/sections.json';
import enContent from '../../public/locales/en/content.json';
import esCommon from '../../public/locales/es/common.json';
import esNavigation from '../../public/locales/es/navigation.json';
import esSections from '../../public/locales/es/sections.json';
import esContent from '../../public/locales/es/content.json';

// Create test i18n instance
const testI18n = i18n.createInstance();

describe('Internationalization Tests', () => {
  beforeAll(async () => {
    // Initialize i18n for tests with direct resources
    await testI18n
      .use(initReactI18next)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'es'],
        ns: ['common', 'navigation', 'sections', 'content'],
        defaultNS: 'common',
        resources: {
          en: {
            common: enCommon,
            navigation: enNavigation,
            sections: enSections,
            content: enContent,
          },
          es: {
            common: esCommon,
            navigation: esNavigation,
            sections: esSections,
            content: esContent,
          },
        },
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });
  });

  beforeEach(async () => {
    // Reset to English before each test
    await testI18n.changeLanguage('en');
  });

  describe('Language Switcher Component', () => {
    it('should render EN and ES buttons', () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      );

      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('ES')).toBeInTheDocument();
    });

    it('should mark current language as active', () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      );

      const enButton = screen.getByText('EN');
      expect(enButton).toHaveAttribute('aria-current', 'true');
    });

    it('should switch to Spanish when ES button is clicked', async () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      );

      const esButton = screen.getByText('ES');
      fireEvent.click(esButton);

      // Wait for language change
      await waitFor(() => {
        expect(testI18n.language).toBe('es');
      });

      expect(esButton).toHaveAttribute('aria-current', 'true');
    });

    it('should have proper ARIA labels', () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      );

      const container = screen.getByRole('group');
      expect(container).toHaveAttribute('aria-label', 'Language switcher');

      const enButton = screen.getByLabelText('Switch to English');
      expect(enButton).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      );

      const enButton = screen.getByText('EN');
      const esButton = screen.getByText('ES');

      expect(enButton.tagName).toBe('BUTTON');
      expect(esButton.tagName).toBe('BUTTON');
    });
  });

  describe('Header Component Translations', () => {
    it('should display English navigation items by default', async () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <Header />
        </I18nextProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Photo Sessions')).toBeInTheDocument();
      });
      expect(screen.getByText('Shoots')).toBeInTheDocument();
      expect(screen.getByText('Sketchup')).toBeInTheDocument();
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    it('should display Spanish navigation items when language is Spanish', async () => {
      await testI18n.changeLanguage('es');

      render(
        <I18nextProvider i18n={testI18n}>
          <Header />
        </I18nextProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Sesiones de Fotos')).toBeInTheDocument();
      });
      expect(screen.getByText('Producciones')).toBeInTheDocument();
      expect(screen.getByText('Dibujos Sketchup')).toBeInTheDocument();
      expect(screen.getByText('Sobre Mí')).toBeInTheDocument();
    });

    it('should keep "Flor Guzman" untranslated', () => {
      render(
        <I18nextProvider i18n={testI18n}>
          <Header />
        </I18nextProvider>
      );

      expect(screen.getByText('Flor Guzman')).toBeInTheDocument();
    });
  });

  describe('Translation Files', () => {
    it('should have all English translation keys', () => {
      const enCommon = testI18n.getResourceBundle('en', 'common');
      const enNavigation = testI18n.getResourceBundle('en', 'navigation');
      const enSections = testI18n.getResourceBundle('en', 'sections');
      const enContent = testI18n.getResourceBundle('en', 'content');

      // Common keys
      expect(enCommon.loading).toBeDefined();
      expect(enCommon.error).toBeDefined();
      expect(enCommon.tryAgain).toBeDefined();
      expect(enCommon.close).toBeDefined();

      // Navigation keys
      expect(enNavigation.photoSessions).toBe('Photo Sessions');
      expect(enNavigation.shoots).toBe('Shoots');
      expect(enNavigation.sketchup).toBe('Sketchup');
      expect(enNavigation.aboutMe).toBe('About Me');

      // Sections keys
      expect(enSections.photoSessions).toBeDefined();
      expect(enSections.aboutMeContent).toBeDefined();

      // Content keys
      expect(enContent.photoSessions).toBeDefined();
      expect(enContent.shoots).toBeDefined();
      expect(enContent.sketchup).toBeDefined();
    });

    it('should have all Spanish translation keys', () => {
      const esCommon = testI18n.getResourceBundle('es', 'common');
      const esNavigation = testI18n.getResourceBundle('es', 'navigation');
      const esContent = testI18n.getResourceBundle('es', 'content');

      // Common keys
      expect(esCommon.loading).toBe('Cargando...');
      expect(esCommon.error).toBeDefined();

      // Navigation keys
      expect(esNavigation.photoSessions).toBe('Sesiones de Fotos');
      expect(esNavigation.shoots).toBe('Producciones');
      expect(esNavigation.sketchup).toBe('Dibujos Sketchup');
      expect(esNavigation.aboutMe).toBe('Sobre Mí');

      // Content keys
      expect(esContent.photoSessions).toBeDefined();
      expect(esContent.shoots).toBeDefined();
      expect(esContent.sketchup).toBeDefined();
    });

    it('should have matching keys between English and Spanish', () => {
      const enKeys = Object.keys(testI18n.getResourceBundle('en', 'navigation'));
      const esKeys = Object.keys(testI18n.getResourceBundle('es', 'navigation'));

      expect(enKeys).toEqual(esKeys);
    });

    it('should not show translation keys in English content', () => {
      const enContent = testI18n.getResourceBundle('en', 'content');

      // Check that portfolio items have proper titles, not keys
      expect(enContent.photoSessions['ps-1'].title).not.toMatch(/^ps-/);
      expect(enContent.photoSessions['ps-1'].title).toBe('Portrait Session 2024');
    });
  });

  describe('i18n Configuration', () => {
    it('should have English as fallback language', () => {
      expect(testI18n.options.fallbackLng).toEqual(['en']);
    });

    it('should support both English and Spanish', () => {
      const supportedLngs = testI18n.options.supportedLngs || [];
      expect(supportedLngs).toContain('en');
      expect(supportedLngs).toContain('es');
    });

    it('should have correct namespaces configured', () => {
      const namespaces = testI18n.options.ns || [];
      expect(namespaces).toContain('common');
      expect(namespaces).toContain('navigation');
      expect(namespaces).toContain('sections');
      expect(namespaces).toContain('content');
    });
  });

  describe('Language Persistence', () => {
    it('should change language successfully', async () => {
      await testI18n.changeLanguage('es');

      // Language should change
      expect(testI18n.language).toBe('es');

      // Can switch back to English
      await testI18n.changeLanguage('en');
      expect(testI18n.language).toBe('en');
    });
  });

  describe('Translation Function', () => {
    it('should translate navigation keys correctly', async () => {
      expect(testI18n.t('navigation:photoSessions')).toBe('Photo Sessions');

      await testI18n.changeLanguage('es');
      expect(testI18n.t('navigation:photoSessions')).toBe('Sesiones de Fotos');
    });

    it('should translate section keys correctly', async () => {
      expect(testI18n.t('sections:aboutMe')).toBe('About Me');

      await testI18n.changeLanguage('es');
      expect(testI18n.t('sections:aboutMe')).toBe('Sobre Mí');
    });

    it('should translate content keys correctly', async () => {
      expect(testI18n.t('content:photoSessions.ps-1.title')).toBe('Portrait Session 2024');

      await testI18n.changeLanguage('es');
      expect(testI18n.t('content:photoSessions.ps-1.title')).toBe('Sesión de Retrato 2024');
    });

    it('should fallback to key for missing translations', async () => {
      await testI18n.changeLanguage('es');

      // If a key is missing, i18next returns the key part after the namespace
      const result = testI18n.t('nonexistent:key');
      expect(result).toBe('key'); // i18next removes the namespace prefix
    });
  });
});

