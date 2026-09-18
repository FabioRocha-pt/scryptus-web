'use client';

import type { LText } from '@/sanity/lib/queries';
import { TxL } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

export interface PilarItem {
  num: string;
  titulo: LText;
  descricao: LText;
}

/** Grelha de cartões numerados (usada em «Como trabalhamos»). */
export default function PilaresGrid({ pilares }: { pilares: PilarItem[] }) {
  return (
    <RevealGroup className="pillars" stagger={0.12}>
      {pilares.map((pilar, i) => (
        <RevealItem key={i} className="cell-fill" variant={i % 2 === 0 ? 'up' : 'zoom'}>
          <div className="pillar">
            <span className="num">{pilar.num}</span>
            <h3>
              <TxL v={pilar.titulo} />
            </h3>
            <p>
              <TxL v={pilar.descricao} />
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
