'use client';

import type { LText } from '@/sanity/lib/queries';
import type { SiteInfo } from '../content/site';
import { Tx, TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export interface Passo {
  num: string;
  texto: LText;
}

function Linhas({ texto }: { texto: string }) {
  const linhas = texto.split('\n');
  return (
    <>
      {linhas.map((linha, i) => (
        <span key={i}>
          {linha}
          {i < linhas.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

/** Cartões laterais da página de contactos. */
export default function ContactInfo({ site, passos }: { site: SiteInfo; passos: Passo[] }) {
  return (
    <div>
      <Reveal variant="right" delay={0.1}>
        <div className="info-card">
          <h3>
            <Tx k="contact.diretos" />
          </h3>
          <div className="info-row">
            <span className="k">
              <Tx k="contact.whatsapp" />
            </span>
            <span className="v">
              <a href={site.whatsappUrl} target="_blank" rel="noopener">
                {site.whatsapp}
              </a>
            </span>
          </div>
          <div className="info-row">
            <span className="k">
              <Tx k="contact.telefone" />
            </span>
            <span className="v">
              <a href={site.telHref}>{site.telefone}</a>
            </span>
          </div>
          <div className="info-row">
            <span className="k">
              <Tx k="contact.email" />
            </span>
            <span className="v">
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
          </div>
        </div>

        <div className="info-card">
          <h3>
            <Tx k="contact.armazem" />
          </h3>
          <div className="info-row">
            <span className="k">
              <Tx k="contact.morada" />
            </span>
            <span className="v">
              <Linhas texto={site.morada} />
            </span>
          </div>
          <div className="info-row">
            <span className="k">
              <Tx k="contact.horario" />
            </span>
            <span className="v">
              <TxL v={site.horarioDias} />
              <br />
              <Linhas texto={site.horarioHoras} />
            </span>
          </div>
        </div>

        {passos.length > 0 && (
          <div className="info-card">
            <h3>
              <Tx k="contact.como" />
            </h3>
            {passos.map((passo, i) => (
              <div className="info-row" key={i}>
                <span className="k">{passo.num}</span>
                <span className="v">
                  <TxL v={passo.texto} />
                </span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
}
