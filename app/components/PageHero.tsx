'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { MaybeLText } from '../i18n/localize';
import type { TKey } from '../i18n/translations';
import { Tx, TxAccent, TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export interface Crumb {
  href?: string;
  /** Chave de tradução (para «Início», «Áreas de negócio»…). */
  k?: TKey;
  /** Texto multilingue vindo do conteúdo (nome da área, por exemplo). */
  v?: MaybeLText;
}

function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="crumbs">
      {items.map((item, i) => {
        const texto = item.k ? <Tx k={item.k} /> : <TxL v={item.v} />;
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
            {item.href ? <Link href={item.href}>{texto}</Link> : texto}
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </span>
        );
      })}
    </div>
  );
}

export interface PageHeroFundo {
  src: string;
  alt: string;
  /** object-position, quando o centro da fotografia não é o que interessa. */
  posicao?: string;
}

/**
 * Topo verde comum a todas as páginas interiores. Com `fundo`, a fotografia
 * ocupa a faixa de ponta a ponta, sob um degradé que mantém o texto legível.
 */
export default function PageHero({
  crumbs,
  kicker,
  tag,
  eyebrow,
  eyebrowKey,
  titulo,
  lead,
  fundo,
  orbLime = true,
}: {
  crumbs?: Crumb[];
  kicker?: string;
  /** Etiqueta da secção (número + nome), usada nas páginas de área. */
  tag?: { num: string; nome: MaybeLText };
  eyebrow?: MaybeLText;
  eyebrowKey?: TKey;
  titulo?: MaybeLText;
  lead?: MaybeLText;
  fundo?: PageHeroFundo | null;
  /** A política de privacidade mostra só o orbe verde. */
  orbLime?: boolean;
}) {
  return (
    <section className={fundo ? 'page-hero has-bg' : 'page-hero'}>
      {fundo && (
        <Image
          className="page-hero-bg"
          src={fundo.src}
          alt={fundo.alt}
          fill
          sizes="100vw"
          priority
          style={fundo.posicao ? { objectPosition: fundo.posicao } : undefined}
        />
      )}
      {orbLime && (
        <div
          className="orb orb-lime orb-lg"
          style={{ top: '-60px', right: '10%', '--orb-o': 0.3 } as CSSProperties}
        ></div>
      )}
      <div
        className="orb orb-green orb-xl"
        style={{ bottom: '-200px', left: '-160px', '--orb-o': 0.35 } as CSSProperties}
      ></div>
      <div className="wrap">
        {crumbs && crumbs.length > 0 && (
          <Reveal variant="up" duration={0.6}>
            <Crumbs items={crumbs} />
          </Reveal>
        )}
        {kicker && (
          <Reveal variant="up" duration={0.6} delay={0.04}>
            <span className="kicker">{kicker}</span>
          </Reveal>
        )}
        {tag && (
          <Reveal variant="up" duration={0.6} delay={0.04}>
            <span className="area-tag">
              <b>{tag.num}</b> <TxL v={tag.nome} />
            </span>
          </Reveal>
        )}
        {(eyebrowKey || eyebrow) && (
          <Reveal variant="up" delay={0.08}>
            <span className="eyebrow">
              {eyebrowKey ? <Tx k={eyebrowKey} /> : <TxL v={eyebrow} />}
            </span>
          </Reveal>
        )}
        <Reveal variant="blur-up" delay={0.16}>
          <h1>
            <TxAccent v={titulo} />
          </h1>
        </Reveal>
        {lead && (
          <Reveal variant="up" delay={0.28}>
            <p className="lead">
              <TxL v={lead} />
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
