'use client';

import type { LText } from '@/sanity/lib/queries';
import { TxL } from '../i18n/Tx';

export interface PortNavItem {
  slug: string;
  tituloCurto: LText;
}

/** Barra fixa de navegação interna do portefólio. */
export default function PortNav({ areas }: { areas: PortNavItem[] }) {
  return (
    <div className="portnav">
      <div className="wrap">
        {areas.map((area) => (
          <a key={area.slug} href={`#${area.slug}`}>
            <TxL v={area.tituloCurto} />
          </a>
        ))}
      </div>
    </div>
  );
}
