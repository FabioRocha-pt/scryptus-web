'use client';

import Link from 'next/link';
import type { LText } from '@/sanity/lib/queries';
import { TxL } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

export interface RelatedArea {
  slug: string;
  num: string;
  tituloCurto: LText;
}

/** Grelha «Um único parceiro, oito áreas» no fim das páginas de área. */
export default function RelatedAreas({ areas }: { areas: RelatedArea[] }) {
  return (
    <RevealGroup className="related" stagger={0.07}>
      {areas.map((area) => (
        <RevealItem key={area.slug} className="cell-fill" variant="up">
          <Link className="rel" href={`/areas/${area.slug}`}>
            <span className="n">{area.num}</span>
            <h4>
              <TxL v={area.tituloCurto} />
            </h4>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
