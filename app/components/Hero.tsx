'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { SanityHome } from '@/sanity/lib/queries';
import { Tx, TxOr } from '../i18n/Tx';
import { FOTO_HERO } from '../content/imagens';
import { Reveal } from './motion/Reveal';

/**
 * Herói da página inicial: a fotografia ocupa a faixa toda, com um degradé por
 * cima para o texto continuar legível. Uma imagem no Sanity sobrepõe-se à local.
 */
export default function Hero({ data }: { data?: SanityHome['hero'] }) {
  // Só aceita a imagem do Sanity se tiver largura para um banner de ponta a ponta
  // (a referência do asset traz as dimensões: image-<id>-<largura>x<altura>-<ext>).
  // Assim a antiga de 900 × 484 deixa de se sobrepor à fotografia nova.
  const largura = Number(data?.mainImage?.asset?._ref?.match(/-(\d+)x\d+-/)?.[1] ?? 0);
  const main = largura >= 1600 ? data?.mainImage : null;
  // O original tem 1920 px: em retina não chega ao dobro da janela, e aceita-se 1920 como teto.
  const src = main?.asset
    ? urlFor(main).width(1920).fit('max').auto('format').url()
    : FOTO_HERO.src;
  const alt = (main?.asset && main.alt) || FOTO_HERO.alt;

  return (
    <section className="hero has-bg">
      <Image className="hero-bg" src={src} alt={alt} fill sizes="100vw" priority />
      <div className="orb orb-lime orb-xl" style={{ top: '-100px', left: '-150px' }}></div>
      <div className="orb orb-green orb-lg" style={{ bottom: '-80px', right: '10%' }}></div>
      <div className="orb orb-lime orb-md" style={{ top: '30%', right: '38%' }}></div>
      <div className="orb orb-dark orb-lg" style={{ top: '10%', right: '-100px' }}></div>

      <div className="wrap">
        <div className="hero-text">
          <Reveal afterLoader variant="up" delay={0.04}>
            <span className="eyebrow">
              <TxOr v={data?.eyebrow} k="hero.eyebrow" />
            </span>
          </Reveal>
          <Reveal afterLoader variant="blur-up" delay={0.12}>
            <h1>
              <Tx k="hero.h1a" />
              <span className="accent">
                <Tx k="hero.h1b" />
              </span>
              <br />
              <Tx k="hero.h1c" />
              <span className="accent">
                <Tx k="hero.h1d" />
              </span>
            </h1>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.2}>
            <p className="tagline-hero">
              <TxOr v={data?.tagline} k="hero.tagline" />
            </p>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.28}>
            <p className="lead">
              <TxOr v={data?.lead} k="hero.lead" />
            </p>
          </Reveal>
          <Reveal afterLoader variant="up" delay={0.36}>
            <div className="cta-row">
              <a href="#areas" className="btn btn-lime">
                <Tx k="hero.cta1" />
              </a>
              <a href="#contactos" className="btn btn-ghost">
                <Tx k="hero.cta2" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
