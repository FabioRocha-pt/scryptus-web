'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLocale } from './LanguageProvider';
import { pick, segmentos, type MaybeLText } from './localize';
import { translations, type TKey } from './translations';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#$&%abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Anima a transição entre dois textos com um efeito de "descodificação" à Matrix:
 * cada carácter passa por glifos aleatórios antes de assentar no carácter final,
 * numa onda da esquerda para a direita.
 */
export function useScramble(target: string): string {
  const [display, setDisplay] = useState(target);
  const settledRef = useRef(target);
  const rafRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (target === settledRef.current) return;
    const from = settledRef.current;
    settledRef.current = target;

    // Com movimento reduzido não há animação: o render usa `target` diretamente.
    if (reduceMotion) return;

    const length = Math.max(from.length, target.length);
    const queue = Array.from({ length }, (_, i) => {
      const start = Math.floor((i / length) * 12) + Math.floor(Math.random() * 4);
      return {
        from: from[i] ?? '',
        to: target[i] ?? '',
        start,
        end: start + 6 + Math.floor(Math.random() * 12),
      };
    });

    let frame = 0;
    const tick = () => {
      let out = '';
      let settled = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          out += q.to;
          settled++;
        } else if (frame >= q.start) {
          out += q.to === ' ' ? ' ' : randomGlyph();
        } else {
          out += q.from;
        }
      }
      setDisplay(out);
      if (settled < queue.length) {
        frame++;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, reduceMotion]);

  return reduceMotion ? target : display;
}

/** Texto traduzido que se transforma com scramble quando o idioma muda. */
export function Tx({ k }: { k: TKey }) {
  const { locale } = useLocale();
  return <>{useScramble(translations[locale][k])}</>;
}

/** Para atributos (placeholders, aria-labels) — tradução instantânea, sem animação. */
export function useT() {
  const { locale } = useLocale();
  return (k: TKey) => translations[locale][k];
}

/**
 * Texto vindo do Sanity (objeto {pt, en, fr}), com recurso ao conteúdo por
 * defeito do código. Anima da mesma forma que o `Tx`.
 */
export function TxL({ v, fallback }: { v: MaybeLText; fallback?: MaybeLText }) {
  const { locale } = useLocale();
  return <>{useScramble(pick(locale, v, fallback))}</>;
}

/**
 * Texto do Sanity com recurso a uma chave de tradução do código.
 * Usado nas secções da página inicial, cujos textos por defeito já são trilingues.
 */
export function TxOr({ v, k }: { v: MaybeLText; k: TKey }) {
  const { locale } = useLocale();
  const texto = pick(locale, v) || translations[locale][k];
  return <>{useScramble(texto)}</>;
}

/** Igual ao `TxL`, mas sem animação — para atributos e casos simples. */
export function useL() {
  const { locale } = useLocale();
  return (v: MaybeLText, fallback?: MaybeLText) => pick(locale, v, fallback);
}

function Segmento({ texto, destaque }: { texto: string; destaque: boolean }) {
  const animado = useScramble(texto);
  return destaque ? <em>{animado}</em> : <>{animado}</>;
}

/**
 * Título em que a parte marcada com *asteriscos* aparece destacada (verde-lima
 * nos topos escuros, verde nos claros — controlado pelo CSS via `em`).
 */
export function TxAccent({ v, fallback }: { v: MaybeLText; fallback?: MaybeLText }) {
  const { locale } = useLocale();
  const partes = segmentos(pick(locale, v, fallback));
  return (
    <>
      {partes.map((parte, i) => (
        <Segmento key={i} texto={parte.texto} destaque={parte.destaque} />
      ))}
    </>
  );
}
