'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { LOCALES, type Locale } from './translations';

const STORAGE_KEY = 'scryptus-lang';

const LangContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: 'pt',
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa sempre em PT (igual ao SSR); o idioma guardado é aplicado após a montagem,
  // o que dispara o efeito de scramble em todo o texto — intencional.
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== 'pt' && (LOCALES as readonly string[]).includes(saved)) {
      setLocale(saved as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  return <LangContext value={{ locale, setLocale }}>{children}</LangContext>;
}

export function useLocale() {
  return useContext(LangContext);
}
