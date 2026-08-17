'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { LText } from '@/sanity/lib/queries';
import { Tx, TxAccent, TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export default function ObrigadoContent({
  titulo,
  texto,
  whatsappUrl,
  whatsapp,
}: {
  titulo: LText;
  texto: LText;
  whatsappUrl: string;
  whatsapp: string;
}) {
  return (
    <section className="block">
      <div
        className="orb orb-lime orb-xl"
        style={{ top: '-100px', right: '-150px', '--orb-o': 0.28 } as CSSProperties}
      ></div>
      <div className="wrap">
        <Reveal variant="up">
          <div className="err">
            <span className="eyebrow">
              <Tx k="obrigado.eyebrow" />
            </span>
            <h1>
              <TxAccent v={titulo} />
            </h1>
            <p>
              <TxL v={texto} />
            </p>
            <div className="cta-row">
              <Link href="/" className="btn btn-dark">
                <Tx k="obrigado.voltar" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener" className="btn btn-ink">
                WhatsApp · {whatsapp}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
