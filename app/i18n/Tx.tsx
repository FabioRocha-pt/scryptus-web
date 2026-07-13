'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLocale } from './LanguageProvider';
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

    if (reduceMotion) {
      setDisplay(target);
      return;
    }

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

  return display;
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
