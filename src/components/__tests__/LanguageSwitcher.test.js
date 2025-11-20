import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  test('renders language switcher button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    
    const button = screen.getByTestId('language-switcher');
    expect(button).toBeInTheDocument();
  });

  test('displays current language', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    
    const button = screen.getByTestId('language-switcher');
    expect(button).toHaveTextContent('EN');
  });

  test('opens language menu on click', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    
    const button = screen.getByTestId('language-switcher');
    fireEvent.click(button);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('switches language on selection', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    
    const button = screen.getByTestId('language-switcher');
    fireEvent.click(button);
    
    const idOption = screen.getByText('Bahasa Indonesia');
    fireEvent.click(idOption);
    
    expect(i18n.language).toBe('id');
  });
});
