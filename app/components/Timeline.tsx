'use client';

import type { LText } from '@/sanity/lib/queries';
import { TxL } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

export interface Marco {
  ano: string;
  titulo: LText;
  descricao: LText;
}

/** Percurso da empresa, ano a ano. */
export default function Timeline({ marcos }: { marcos: Marco[] }) {
  return (
    <RevealGroup className="timeline" stagger={0.1}>
      {marcos.map((marco, i) => (
        <RevealItem key={i} variant="up">
          <div className="tl">
            <div className="yr">{marco.ano}</div>
            <div className="tx">
              <h4>
                <TxL v={marco.titulo} />
              </h4>
              <p>
                <TxL v={marco.descricao} />
              </p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
