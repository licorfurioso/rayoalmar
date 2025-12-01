import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AboutMe } from './AboutMe';

// Create test i18n instance
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      sections: {
        aboutMe: 'About Me',
        aboutMeContent: 'Test bio content in English',
        aboutMeContactCTA: "Let's work together!",
        aboutMeContact: 'Contact',
      },
    },
    es: {
      sections: {
        aboutMe: 'Sobre Mí',
        aboutMeContent: 'Contenido de biografía de prueba en español',
        aboutMeContactCTA: '¡Trabajemos juntos!',
        aboutMeContact: 'Contacto',
      },
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

describe('AboutMe Section', () => {
  it('section renders with correct ID "about-me"', () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    const section = container.querySelector('#about-me');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('professional photo displays', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    const photo = screen.getByAltText(
      'Flor Guzman - Photographer and Art Director'
    );
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', '/rayoalmar/images/flor-guzman.jpg');
  });

  it('biography content renders', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    expect(screen.getByText('Test bio content in English')).toBeInTheDocument();
    expect(screen.getByText("Let's work together!")).toBeInTheDocument();
  });

  it('contact information displays', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    const emailLink = screen.getByText('florenciadelcguzman@gmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:florenciadelcguzman@gmail.com?subject=Portfolio%20Inquiry'
    );

    const instagramLink = screen.getByLabelText('Instagram Profile');
    expect(instagramLink).toBeInTheDocument();

    const linkedinLink = screen.getByLabelText('LinkedIn Profile');
    expect(linkedinLink).toBeInTheDocument();
  });

  it('i18n translations work for both EN/ES', async () => {
    const { rerender } = render(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Test bio content in English')).toBeInTheDocument();

    await testI18n.changeLanguage('es');
    rerender(
      <I18nextProvider i18n={testI18n}>
        <AboutMe />
      </I18nextProvider>
    );

    expect(screen.getByText('Sobre Mí')).toBeInTheDocument();
    expect(
      screen.getByText('Contenido de biografía de prueba en español')
    ).toBeInTheDocument();
  });
});
