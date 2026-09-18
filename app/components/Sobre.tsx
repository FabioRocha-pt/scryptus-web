'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { SanityHome } from '@/sanity/lib/queries';
import type { TKey } from '../i18n/translations';
import { Tx, TxL, TxOr } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

const NUMEROS_DEFEITO: { valor: string; legendaKey: TKey }[] = [
  { valor: '2008', legendaKey: 'sobre.m1' },
  { valor: 'CAVEX', legendaKey: 'sobre.m2' },
  { valor: '+30', legendaKey: 'sobre.m3' },
];

export default function Sobre({ data }: { data?: SanityHome['sobre'] }) {
  const image = data?.image;
  const numeros = (data?.estatisticas ?? []).filter((n) => n?.valor);

  return (
    <section className="block" id="sobre">
      <div
        className="orb orb-lime orb-lg"
        style={{ top: '50%', right: '-200px', '--orb-o': 0.25 } as CSSProperties}
      ></div>
      <div className="wrap">
        <div className="about-grid">
          <Reveal variant="left" duration={1}>
            <div className="about-pill">
              {image?.asset ? (
                <Image
                  src={urlFor(image).width(680).height(1100).fit('crop').auto('format').url()}
                  alt={image.alt ?? 'Armazém da Scryptus 1 na Praia'}
                  fill
                  sizes="(max-width: 960px) 340px, 40vw"
                />
              ) : (
                <>
                  Foto do armazém
                  <br />
                  (Rua da Cruz Vermelha)
                </>
              )}
            </div>
          </Reveal>
          <Reveal variant="right" delay={0.15} className="about-text">
            <span className="eyebrow">
              <Tx k="sobre.eyebrow" />
            </span>
            <h2>
              <Tx k="sobre.h2a" />
              <em>
                <Tx k="sobre.h2b" />
              </em>
              <Tx k="sobre.h2c" />
            </h2>
            <p className="pullquote">
              <TxOr v={data?.pullquote} k="sobre.pullquote" />
            </p>
            <p className="about-body">
              <TxOr v={data?.body} k="sobre.body" />
            </p>
            <Link href="/empresa" className="btn btn-ink">
              <Tx k="sobre.btn" />
            </Link>
            <RevealGroup className="about-meta" stagger={0.12} delay={0.2}>
              {numeros.length > 0
                ? numeros.map((n, i) => (
                    <RevealItem key={i} variant="up">
                      <div>
                        <span className="n">{n?.valor}</span>
                        <span className="l">
                          <TxL v={n?.legenda} />
                        </span>
                      </div>
                    </RevealItem>
                  ))
                : NUMEROS_DEFEITO.map((n) => (
                    <RevealItem key={n.valor} variant="up">
                      <div>
                        <span className="n">{n.valor}</span>
                        <span className="l">
                          <Tx k={n.legendaKey} />
                        </span>
                      </div>
                    </RevealItem>
                  ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
