'use client';

import type { LText } from '@/sanity/lib/queries';
import { TxL } from '../i18n/Tx';
import { RevealGroup, RevealItem } from './motion/Reveal';

export interface Subcat {
  titulo: LText;
  itens: LText[];
}

/** Grelha de subcategorias de produtos (páginas de área e portefólio). */
export default function Subcats({ subcategorias }: { subcategorias: Subcat[] }) {
  if (subcategorias.length === 0) return null;

  return (
    <RevealGroup className="subcats" stagger={0.07}>
      {subcategorias.map((sub, i) => (
        <RevealItem key={i} className="cell-fill" variant="up">
          <div className="subcat">
            <h3>
              <TxL v={sub.titulo} />
            </h3>
            <ul>
              {sub.itens.map((item, j) => (
                <li key={j}>
                  <TxL v={item} />
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
