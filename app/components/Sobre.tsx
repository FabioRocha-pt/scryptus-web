'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { HomeImages } from '@/sanity/lib/queries';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

export default function Sobre({ data }: { data?: HomeImages['sobre'] }) {
  const image = data?.image;

  return (
    <section className="block" id="sobre">
      <div className="orb orb-lime orb-lg" style={{ top: '50%', right: '-200px', '--orb-o': 0.25 } as CSSProperties}></div>
      <div className="wrap">
        <div className="about-grid">
          <Reveal variant="left" duration={1}>
            <div className="about-pill">
              {image?.asset ? (
                <Image
                  src={urlFor(image).width(680).height(1100).fit('crop').auto('format').url()}
                  alt={image.alt ?? 'Equipa Scryptus 1'}
                  fill
                  sizes="(max-width: 960px) 340px, 40vw"
                />
              ) : (
                <>Foto da equipa<br />ou do armazém<br />(Rua da Cruz Vermelha)<br /><br />Sugestão:<br />formato pílula vertical<br />com pessoa real</>
              )}
            </div>
          </Reveal>
          <Reveal variant="right" delay={0.15} className="about-text">
            <span className="eyebrow"><Tx k="sobre.eyebrow" /></span>
            <h2><Tx k="sobre.h2a" /><em><Tx k="sobre.h2b" /></em><Tx k="sobre.h2c" /></h2>
            <p className="pullquote"><Tx k="sobre.pullquote" /></p>
            <p className="about-body"><Tx k="sobre.body" /></p>
            <a href="#" className="btn btn-ink"><Tx k="sobre.btn" /></a>
            <RevealGroup className="about-meta" stagger={0.12} delay={0.2}>
              <RevealItem variant="up"><div><span className="n">2008</span><span className="l"><Tx k="sobre.m1" /></span></div></RevealItem>
              <RevealItem variant="up"><div><span className="n">CAVEX</span><span className="l"><Tx k="sobre.m2" /></span></div></RevealItem>
              <RevealItem variant="up"><div><span className="n">+30</span><span className="l"><Tx k="sobre.m3" /></span></div></RevealItem>
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
