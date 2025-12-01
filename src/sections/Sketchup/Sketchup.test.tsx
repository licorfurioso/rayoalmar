import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Sketchup } from './Sketchup';

// Mock the data import
vi.mock('../../data/sketchup.json', () => ({
  default: [
    {
      id: 'test-sketchup-1',
      title: 'Test Sketchup 1',
      imageUrl: '/test-images/sketchup-01.svg',
      description: 'Test sketchup description 1',
      date: '2024-01-25',
      order: 1,
    },
    {
      id: 'test-sketchup-2',
      title: 'Test Sketchup 2',
      imageUrl: '/test-images/sketchup-02.svg',
      description: 'Test sketchup description 2',
      date: '2024-02-28',
      order: 2,
    },
    {
      id: 'test-sketchup-3',
      title: 'Test Sketchup 3',
      imageUrl: '/test-images/sketchup-03.svg',
      description: 'Test sketchup description 3',
      date: '2024-03-20',
      order: 3,
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
      sections: { sketchup: 'Sketchup' },
      content: {},
    },
    es: {
      sections: { sketchup: 'Sketchup' },
      content: {},
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('Sketchup Section', () => {
  it('section renders with correct ID "sketchup"', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Sketchup />
      </I18nextProvider>
    );

    const section = container.querySelector('#sketchup');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('grid integration works correctly', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Sketchup />
      </I18nextProvider>
    );

    const grid = container.querySelector('[role="list"]');
    expect(grid).toBeInTheDocument();

    // Verify mock data is rendered
    expect(screen.getByAltText('Test Sketchup 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Sketchup 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Sketchup 3')).toBeInTheDocument();
  });

  it('i18n translations display correctly', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Sketchup />
      </I18nextProvider>
    );

    expect(screen.getByText('Sketchup')).toBeInTheDocument();
  });

  it('section heading displays correctly', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Sketchup />
      </I18nextProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Sketchup');
  });
});

