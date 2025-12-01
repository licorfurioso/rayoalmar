import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Grid } from './Grid';
import { mockPhotoSessions } from '../../tests/fixtures';

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      content: {},
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

describe('Grid Component', () => {
  it('renders grid container with proper role="list"', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridContainer = screen.getByRole('list', {
      name: /photo-sessions gallery/i,
    });
    expect(gridContainer).toBeInTheDocument();
  });

  it('renders grid items with mock data', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    expect(screen.getByAltText('Test Photo Session 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo Session 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Photo Session 3')).toBeInTheDocument();
  });

  it('applies responsive grid layout classes', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={mockPhotoSessions} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridElement = container.querySelector('[role="list"]');
    expect(gridElement).toBeTruthy();
    expect(gridElement?.className).toContain('grid');
  });

  it('handles empty data array gracefully', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <Grid data={[]} category="photo-sessions" />
      </I18nextProvider>
    );

    const gridContainer = screen.getByRole('list');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer.children.length).toBe(0);
  });
});
