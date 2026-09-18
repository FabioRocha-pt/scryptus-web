'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { MaybeLText } from '../i18n/localize';
import type { TKey } from '../i18n/translations';
import { Tx, TxAccent, TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

/**
 * Cabeçalho de secção: sobretítulo, título com parte destacada, texto de
 * introdução e (opcionalmente) uma ligação em pílula à direita.
 *
 * Os textos podem vir das traduções (`*Key`) ou do conteúdo do Sanity.
 */
export default function BlockHead({
  eyebrowKey,
  eyebrow,
  eyebrowSufixo,
  tituloKeys,
  titulo,
  introKey,
  intro,
  link,
  larguraIntro = '54ch',
}: {
  eyebrowKey?: TKey;
  eyebrow?: MaybeLText;
  /** Acrescentado ao sobretítulo, ex.: o número da área («Área 01»). */
  eyebrowSufixo?: string;
  /** [texto normal, texto destacado] */
  tituloKeys?: [TKey, TKey];
  /** Título vindo do conteúdo, com a parte destacada entre *asteriscos*. */
  titulo?: MaybeLText;
  introKey?: TKey;
  intro?: MaybeLText;
  link?: { href: string; k: TKey };
  larguraIntro?: string;
}) {
  const temIntro = Boolean(introKey || intro);

  return (
    <div className="block-head">
      <Reveal variant="up" className="text">
        <span className="eyebrow">
          {eyebrowKey ? <Tx k={eyebrowKey} /> : <TxL v={eyebrow} />}
          {eyebrowSufixo && <>&nbsp;{eyebrowSufixo}</>}
        </span>
        <h2>
          {tituloKeys ? (
            <>
              <Tx k={tituloKeys[0]} />
              <em>
                <Tx k={tituloKeys[1]} />
              </em>
            </>
          ) : (
            <TxAccent v={titulo} />
          )}
        </h2>
        {temIntro && (
          <p
            style={
              {
                fontSize: '16px',
                color: 'var(--ink-mute)',
                marginTop: '18px',
                maxWidth: larguraIntro,
                lineHeight: 1.65,
              } as CSSProperties
            }
          >
            {introKey ? <Tx k={introKey} /> : <TxL v={intro} />}
          </p>
        )}
      </Reveal>
      {link && (
        <Reveal variant="left" delay={0.2}>
          <Link href={link.href} className="more">
            <Tx k={link.k} />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
