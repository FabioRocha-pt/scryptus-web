'use client';

import type { TKey } from '../i18n/translations';
import { Tx } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

const NUMEROS: { valor: string; legendaKey: TKey }[] = [
  { valor: '18+', legendaKey: 'trust.l1' },
  { valor: '8', legendaKey: 'trust.l2' },
  { valor: 'CAVEX', legendaKey: 'trust.l3' },
  { valor: 'CV', legendaKey: 'trust.l4' },
];

export default function TrustBar() {
  return (
    <section className="trust">
      <RevealGroup className="wrap" stagger={0.1}>
        {NUMEROS.map((item) => (
          <RevealItem key={item.valor} variant="up">
            <div className="trust-item"><strong>{item.valor}</strong><span><Tx k={item.legendaKey} /></span></div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
