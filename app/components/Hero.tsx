'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HomeImages } from '@/sanity/lib/queries';
import { Tx } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export default function Hero({ data }: { data?: HomeImages['hero'] }) {
  const main = data?.mainImage;
  const secondary = data?.secondaryImage;

  return (
    <section className="hero">
      <div className="orb orb-lime orb-xl" style={{ top: '-100px', left: '-150px' }}></div>
      <div className="orb orb-green orb-lg" style={{ bottom: '-80px', right: '10%' }}></div>
      <div className="orb orb-lime orb-md" style={{ top: '30%', right: '38%' }}></div>
      <div className="orb orb-dark orb-lg" style={{ top: '10%', right: '-100px' }}></div>

      <div className="wrap">
        <div className="hero-text">
          <Reveal afterLoader variant="up" delay={0.05}>
            <span className="eyebrow"><Tx k="hero.eyebrow" /></span>
          </Reveal>
          <Reveal afterLoader variant="blur-up" delay={0.18}>
            <h1><Tx k="hero.h1a" /><span className="accent"><Tx k="hero.h1b" /></span><br /><Tx k="hero.h1c" /><span className="accent"><Tx k="hero.h1d" /></span></h1>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.34}>
            <p className="tagline-hero"><Tx k="hero.tagline" /></p>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.46}>
            <p className="lead"><Tx k="hero.lead" /></p>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.58}>
            <div className="cta-row">
              <a href="#areas" className="btn btn-lime"><Tx k="hero.cta1" /></a>
              <a href="#contactos" className="btn btn-ghost"><Tx k="hero.cta2" /></a>
            </div>
          </Reveal>
        </div>

        <div className="hero-media">
          <Reveal afterLoader variant="pill" delay={0.35} duration={1.1}>
            <div className="hero-pill">
              {main?.asset ? (
                <Image
                  src={urlFor(main).width(680).height(1080).fit('crop').auto('format').url()}
                  alt={main.alt ?? 'Scryptus 1'}
                  fill
                  sizes="(max-width: 960px) 280px, 340px"
                  priority
                />
              ) : (
                <>Imagem herói<br />(formato pílula)<br /><br />Sugestão:<br />estufa em produção<br />+ folhagem tropical<br />de Cabo Verde</>
              )}
              <div className="hero-pill-small">
                {secondary?.asset ? (
                  <Image
                    src={urlFor(secondary).width(280).height(400).fit('crop').auto('format').url()}
                    alt={secondary.alt ?? ''}
                    fill
                    sizes="140px"
                  />
                ) : (
                  <>Imagem secundária<br />produto em cena</>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
