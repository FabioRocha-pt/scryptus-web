'use client';

import type { SanityEstatistica } from '@/sanity/lib/queries';
import type { TKey } from '../i18n/translations';
import { Tx, TxL } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

const DEFEITO: { valor: string; legendaKey: TKey }[] = [
  { valor: '18+', legendaKey: 'trust.l1' },
  { valor: '8', legendaKey: 'trust.l2' },
  { valor: 'CAVEX', legendaKey: 'trust.l3' },
  { valor: 'CV', legendaKey: 'trust.l4' },
];

export default function TrustBar({ numeros }: { numeros?: (SanityEstatistica | null)[] | null }) {
  const doSanity = (numeros ?? []).filter((n) => n?.valor);

  return (
    <section className="trust">
      <RevealGroup className="wrap" stagger={0.1}>
        {doSanity.length > 0
          ? doSanity.map((item, i) => (
              <RevealItem key={i} variant="up">
                <div className="trust-item">
                  <strong>{item?.valor}</strong>
                  <span>
                    <TxL v={item?.legenda} />
                  </span>
                </div>
              </RevealItem>
            ))
          : DEFEITO.map((item) => (
              <RevealItem key={item.valor} variant="up">
                <div className="trust-item">
                  <strong>{item.valor}</strong>
                  <span>
                    <Tx k={item.legendaKey} />
                  </span>
                </div>
              </RevealItem>
            ))}
      </RevealGroup>
    </section>
  );
}
