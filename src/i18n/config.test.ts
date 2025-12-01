import { describe, it, expect } from 'vitest';
import i18n from './config';

interface BackendOptions {
  loadPath: string;
}

describe('i18n Configuration', () => {
  it('exports i18n instance', () => {
    expect(i18n).toBeDefined();
    expect(typeof i18n.init).toBe('function');
    expect(typeof i18n.changeLanguage).toBe('function');
  });

  it('has backend plugin configured', () => {
    // Check that backend is in the modules
    expect(i18n.options.backend).toBeDefined();
  });

  it('has language detector configured', () => {
    // Check that language detector options exist
    expect(i18n.options.detection).toBeDefined();
  });

  it('has correct configuration options', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
    expect(i18n.options.supportedLngs).toContain('en');
    expect(i18n.options.supportedLngs).toContain('es');
  });

  it('has correct backend loadPath configuration', () => {
    expect((i18n.options.backend as BackendOptions)?.loadPath).toBe(
      '/rayoalmar/locales/{{lng}}/{{ns}}.json'
    );
  });

  it('has debug mode configured based on environment', () => {
    // Debug is enabled in dev/test environments
    expect(typeof i18n.options.debug).toBe('boolean');
  });

  it('has react suspense enabled', () => {
    expect(i18n.options.react?.useSuspense).toBe(true);
  });

  it('has correct namespaces configured', () => {
    expect(i18n.options.ns).toEqual([
      'common',
      'navigation',
      'sections',
      'content',
    ]);
    expect(i18n.options.defaultNS).toBe('common');
  });

  it('has interpolation escapeValue set to false for React', () => {
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });

  it('has correct detection order', () => {
    expect(i18n.options.detection?.order).toEqual([
      'localStorage',
      'navigator',
    ]);
    expect(i18n.options.detection?.caches).toEqual(['localStorage']);
    expect(i18n.options.detection?.lookupLocalStorage).toBe('i18nextLng');
  });
});
