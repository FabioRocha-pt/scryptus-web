'use client';

import { RevealGroup, RevealItem } from './motion/Reveal';

export interface GrupoItem {
  etiqueta: string;
  nome: string;
  url?: string;
}

/** Cartões das empresas do Grupo CAVEX. */
export default function GrupoCards({ empresas }: { empresas: GrupoItem[] }) {
  return (
    <RevealGroup className="related" stagger={0.07}>
      {empresas.map((empresa, i) => (
        <RevealItem key={i} className="cell-fill" variant="up">
          {empresa.url ? (
            <a className="rel" href={empresa.url} target="_blank" rel="noopener">
              <span className="n">{empresa.etiqueta}</span>
              <h4>{empresa.nome}</h4>
            </a>
          ) : (
            <div className="rel">
              <span className="n">{empresa.etiqueta}</span>
              <h4>{empresa.nome}</h4>
            </div>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
