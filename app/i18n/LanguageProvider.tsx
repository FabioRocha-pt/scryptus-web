'use client';

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { LOCALES, type Locale } from './translations';

const STORAGE_KEY = 'scryptus-lang';

/**
 * O idioma escolhido vive fora do React (localStorage), por isso é lido com
 * `useSyncExternalStore`: no servidor e na hidratação é sempre PT — igual ao
 * HTML gerado — e logo depois passa ao idioma guardado, o que dispara o efeito
 * de scramble em todo o texto (intencional).
 */
let guardado: Locale | null = null;
const ouvintes = new Set<() => void>();

function subscribe(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

function getSnapshot(): Locale {
  if (guardado) return guardado;
  const valor = window.localStorage.getItem(STORAGE_KEY);
  guardado =
    valor && (LOCALES as readonly string[]).includes(valor) ? (valor as Locale) : 'pt';
  return guardado;
}

function getServerSnapshot(): Locale {
  return 'pt';
}

function guardar(locale: Locale) {
  guardado = locale;
  window.localStorage.setItem(STORAGE_KEY, locale);
  ouvintes.forEach((ouvinte) => ouvinte());
}

const LangContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: 'pt',
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LangContext value={{ locale, setLocale: guardar }}>{children}</LangContext>;
}

export function useLocale() {
  return useContext(LangContext);
}
