import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Shoots } from './Shoots';

// Mock the data import
vi.mock('../../data/shoots.json', () => ({
  default: [
    {
      id: 'test-shoot-1',
      title: 'Test Shoot 1',
      imageUrl: '/test-images/shoot-01.svg',
      description: 'Test shoot description 1',
      date: '2024-01-20',
      order: 1,
    },
    {
      id: 'test-shoot-2',
      title: 'Test Shoot 2',
      imageUrl: '/test-images/shoot-02.svg',
      description: 'Test shoot description 2',
      date: '2024-02-25',
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
      sections: { shoots: 'Shoots' },
      content: {},
    },
    es: {
      sections: { shoots: 'Producciones' },
      content: {},
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('Shoots Section', () => {
  it('section renders with correct ID "shoots"', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Shoots />
      </I18nextProvider>
    );

    const section = container.querySelector('#shoots');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('grid integration with fixture data', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Shoots />
      </I18nextProvider>
    );

    const grid = container.querySelector('[role="list"]');
    expect(grid).toBeInTheDocument();

    // Verify mock data is rendered
    expect(screen.getByAltText('Test Shoot 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Shoot 2')).toBeInTheDocument();
  });

  it('i18n translations display correctly', async () => {
    const { rerender } = render(
      <I18nextProvider i18n={testI18n}>
        <Shoots />
      </I18nextProvider>
    );

    expect(screen.getByText('Shoots')).toBeInTheDocument();

    await testI18n.changeLanguage('es');
    rerender(
      <I18nextProvider i18n={testI18n}>
        <Shoots />
      </I18nextProvider>
    );

    expect(screen.getByText('Producciones')).toBeInTheDocument();
  });

  it('section heading displays translated text', async () => {
    await testI18n.changeLanguage('en');

    render(
      <I18nextProvider i18n={testI18n}>
        <Shoots />
      </I18nextProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Shoots');
  });
});
