'use client';

import type { CSSProperties } from 'react';
import type { SiteInfo } from '../content/site';
import { Tx } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

/**
 * Bloco verde «Tem um projeto em mente?», comum à maioria das páginas.
 * `sobrePaper2` acerta a cor da onda quando a secção anterior é bege.
 */
export default function CtaBlock({
  site,
  sobrePaper2 = false,
}: {
  site: SiteInfo;
  sobrePaper2?: boolean;
}) {
  return (
    <section className={`cta-block${sobrePaper2 ? ' on-paper-2' : ''}`} id="contactos">
      <div
        className="orb orb-lime orb-xl"
        style={{ top: '-50px', right: '-150px', '--orb-o': 0.3 } as CSSProperties}
      ></div>
      <div
        className="orb orb-green orb-lg"
        style={{ bottom: '-100px', left: '-100px', '--orb-o': 0.4 } as CSSProperties}
      ></div>
      <div className="wrap">
        <Reveal variant="up">
          <span className="eyebrow">
            <Tx k="cta.eyebrow" />
          </span>
        </Reveal>
        <Reveal variant="blur-up" delay={0.1}>
          <h2>
            <Tx k="cta.h2a" />
            <em>
              <Tx k="cta.h2b" />
            </em>
            <Tx k="cta.h2c" />
          </h2>
        </Reveal>
        <Reveal variant="up" delay={0.22}>
          <p>
            <Tx k="cta.p" />
          </p>
        </Reveal>
        <Reveal variant="zoom" delay={0.34}>
          <div className="cta-row">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-lime"
            >
              WhatsApp · {site.whatsapp}
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-ghost">
              <Tx k="cta.email" />
            </a>
            <a href={site.telHref} className="btn btn-ghost">
              {site.telefone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
