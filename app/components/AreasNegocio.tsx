'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { ResolvedArea } from '../content/resolveAreas';
import { Tx, TxL, useL } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

export default function AreasNegocio({ areas }: { areas: ResolvedArea[] }) {
  const l = useL();

  return (
    <section className="block bg-paper-2" id="areas">
      <div className="orb orb-green orb-xl" style={{ top: '200px', left: '-200px' }}></div>
      <div className="orb orb-lime orb-lg" style={{ bottom: '-100px', right: '-100px' }}></div>
      <div className="wrap">
        <div className="block-head">
          <Reveal variant="up" className="text">
            <span className="eyebrow">
              <Tx k="areas.eyebrow" />
            </span>
            <h2>
              <Tx k="areas.h2a" />
              <em>
                <Tx k="areas.h2b" />
              </em>
            </h2>
            <p
              style={
                {
                  fontSize: '16px',
                  color: 'var(--ink-mute)',
                  marginTop: '18px',
                  maxWidth: '54ch',
                  lineHeight: 1.65,
                } as CSSProperties
              }
            >
              <Tx k="areas.intro" />
            </p>
          </Reveal>
          <Reveal variant="left" delay={0.2}>
            <Link href="/portefolio" className="more">
              <Tx k="areas.more" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="verticals" stagger={0.08}>
          {areas.map((area) => {
            const imagem = area.imagemCartao;
            const nome = l(area.tituloCurto);
            return (
              <RevealItem key={area.slug} className="cell-fill" variant="up">
                <div className="vert">
                  <Link className="vert-link" href={`/areas/${area.slug}`}>
                    <div className="img">
                      {imagem?.asset ? (
                        <Image
                          src={urlFor(imagem).width(560).height(644).fit('crop').auto('format').url()}
                          alt={imagem.alt ?? nome}
                          fill
                          sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, 280px"
                        />
                      ) : (
                        <span>
                          {area.legendaCartao.split('\n').map((linha, i) => (
                            <span key={i} style={{ display: 'block' }}>
                              {linha}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                    <div className="body">
                      <span className="num">{area.num}</span>
                      <h3>
                        <TxL v={area.tituloCurto} />
                      </h3>
                      <p>
                        <TxL v={area.descricaoCartao} />
                      </p>
                    </div>
                  </Link>
                  <Link href={`/contactos?area=${area.slug}`} className="cta">
                    <Tx k="areas.card.cta" />
                  </Link>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
