'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { LText, SanityImageWithAlt } from '@/sanity/lib/queries';
import { TxAccent, TxL } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

export interface EmpresaSobreProps {
  eyebrow: LText;
  titulo: LText;
  pullquote: LText;
  paragrafos: LText[];
  estatisticas: { valor: string; legenda: LText }[];
  imagem?: SanityImageWithAlt | null;
  legendaImagem: string;
}

export default function EmpresaSobre({
  eyebrow,
  titulo,
  pullquote,
  paragrafos,
  estatisticas,
  imagem,
  legendaImagem,
}: EmpresaSobreProps) {
  return (
    <div className="about-grid">
      <Reveal variant="left" duration={1}>
        <div className="about-pill">
          {imagem?.asset ? (
            <Image
              src={urlFor(imagem).width(680).height(1100).fit('crop').auto('format').url()}
              alt={imagem.alt ?? 'Armazém da Scryptus 1 na Praia'}
              fill
              sizes="(max-width: 960px) 340px, 40vw"
              priority
            />
          ) : (
            <span>
              {legendaImagem.split('\n').map((linha, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {linha}
                </span>
              ))}
            </span>
          )}
        </div>
      </Reveal>
      <Reveal variant="right" delay={0.15} className="about-text">
        <span className="eyebrow">
          <TxL v={eyebrow} />
        </span>
        <h2>
          <TxAccent v={titulo} />
        </h2>
        <p className="pullquote">
          <TxL v={pullquote} />
        </p>
        <div className="prose">
          {paragrafos.map((p, i) => (
            <p key={i}>
              <TxL v={p} />
            </p>
          ))}
        </div>
        {estatisticas.length > 0 && (
          <RevealGroup
            className="about-meta"
            stagger={0.12}
            delay={0.2}
            style={{ marginTop: '40px' } as CSSProperties}
          >
            {estatisticas.map((e, i) => (
              <RevealItem key={i} variant="up">
                <div>
                  <span className="n">{e.valor}</span>
                  <span className="l">
                    <TxL v={e.legenda} />
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Reveal>
    </div>
  );
}
