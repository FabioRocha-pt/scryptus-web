'use client';

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

/** Topo verde comum a todas as páginas interiores. */
export default function PageHero({
  crumbs,
  kicker,
  eyebrow,
  eyebrowKey,
  titulo,
  lead,
  orbLime = true,
}: {
  crumbs?: Crumb[];
  kicker?: string;
  eyebrow?: MaybeLText;
  eyebrowKey?: TKey;
  titulo?: MaybeLText;
  lead?: MaybeLText;
  /** A política de privacidade mostra só o orbe verde. */
  orbLime?: boolean;
}) {
  return (
    <section className="page-hero">
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
        <Reveal variant="up" delay={0.08}>
          <span className="eyebrow">
            {eyebrowKey ? <Tx k={eyebrowKey} /> : <TxL v={eyebrow} />}
          </span>
        </Reveal>
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
