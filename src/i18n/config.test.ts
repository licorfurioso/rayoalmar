import { describe, it, expect } from 'vitest';
import i18n from './config';

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
});
