'use client';

import type { TKey } from '../i18n/translations';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

const PILARES: { num: string; titleKey: TKey; descKey: TKey }[] = [
  { num: '01', titleKey: 'oferta.p1.title', descKey: 'oferta.p1.desc' },
  { num: '02', titleKey: 'oferta.p2.title', descKey: 'oferta.p2.desc' },
  { num: '03', titleKey: 'oferta.p3.title', descKey: 'oferta.p3.desc' },
  { num: '04', titleKey: 'oferta.p4.title', descKey: 'oferta.p4.desc' },
];

export default function Oferta() {
  return (
    <section className="block" id="oferta">
      <div className="orb orb-lime orb-md" style={{ top: '80px', right: '-80px' }}></div>
      <div className="wrap">
        <div className="block-head">
          <Reveal variant="up" className="text">
            <span className="eyebrow"><Tx k="oferta.eyebrow" /></span>
            <h2><Tx k="oferta.h2a" /><em><Tx k="oferta.h2b" /></em></h2>
          </Reveal>
        </div>
        <RevealGroup className="pillars" stagger={0.12}>
          {PILARES.map((pilar, i) => (
            <RevealItem key={pilar.num} className="cell-fill" variant={i % 2 === 0 ? 'up' : 'zoom'}>
              <div className="pillar">
                <span className="num">{pilar.num}</span>
                <h3><Tx k={pilar.titleKey} /></h3>
                <p><Tx k={pilar.descKey} /></p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
