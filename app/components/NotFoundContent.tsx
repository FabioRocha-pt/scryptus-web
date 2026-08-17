'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Tx } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export default function NotFoundContent() {
  return (
    <section className="block">
      <div
        className="orb orb-lime orb-xl"
        style={{ top: '-100px', right: '-150px', '--orb-o': 0.28 } as CSSProperties}
      ></div>
      <div
        className="orb orb-green orb-lg"
        style={{ bottom: '-60px', left: '-100px', '--orb-o': 0.3 } as CSSProperties}
      ></div>
      <div className="wrap">
        <Reveal variant="up">
          <div className="err">
            <span className="code">404</span>
            <h1>
              <Tx k="erro.titulo" />
              <em>
                <Tx k="erro.tituloAcento" />
              </em>
            </h1>
            <p>
              <Tx k="erro.p" />
            </p>
            <div className="cta-row">
              <Link href="/" className="btn btn-dark">
                <Tx k="obrigado.voltar" />
              </Link>
              <Link href="/portefolio" className="btn btn-ink">
                <Tx k="erro.portefolio" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
