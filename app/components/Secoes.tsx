'use client';

import type { LText } from '@/sanity/lib/queries';
import { useLocale } from '../i18n/LanguageProvider';
import { autoLink, pick } from '../i18n/localize';
import { TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export interface Secao {
  titulo: LText;
  paragrafos: LText[];
  lista: LText[];
  /** Parágrafos que se seguem à lista. */
  paragrafosFinais?: LText[];
}

/** Parágrafo com emails e endereços web clicáveis. */
function Paragrafo({ v }: { v: LText }) {
  const { locale } = useLocale();
  const fragmentos = autoLink(pick(locale, v));
  return (
    <p>
      {fragmentos.map((f, i) =>
        f.href ? (
          <a key={i} href={f.href}>
            {f.texto}
          </a>
        ) : (
          <span key={i}>{f.texto}</span>
        ),
      )}
    </p>
  );
}

/** Texto corrido em secções — usado na política de privacidade. */
export default function Secoes({ secoes }: { secoes: Secao[] }) {
  return (
    <div className="prose">
      {secoes.map((secao, i) => (
        <Reveal variant="up" key={i} duration={0.6}>
          <h3>
            <TxL v={secao.titulo} />
          </h3>
          {secao.paragrafos.map((p, j) => (
            <Paragrafo key={j} v={p} />
          ))}
          {secao.lista.length > 0 && (
            <ul>
              {secao.lista.map((item, j) => (
                <li key={j}>
                  <TxL v={item} />
                </li>
              ))}
            </ul>
          )}
          {(secao.paragrafosFinais ?? []).map((p, j) => (
            <Paragrafo key={`f${j}`} v={p} />
          ))}
        </Reveal>
      ))}
    </div>
  );
}
