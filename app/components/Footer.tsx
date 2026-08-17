'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { LText } from '@/sanity/lib/queries';
import type { SiteInfo } from '../content/site';
import { Tx, TxL } from '../i18n/Tx';
import Logo from './Logo';
import NewsletterForm from './NewsletterForm';

export interface FooterArea {
  slug: string;
  tituloCurto: LText;
}

/** Redes sociais do rodapé, na ordem do site de referência. */
const SOCIAIS = [
  { chave: 'facebook', etiqueta: 'Facebook', sigla: 'f' },
  { chave: 'instagram', etiqueta: 'Instagram', sigla: 'ig' },
  { chave: 'linkedin', etiqueta: 'LinkedIn', sigla: 'in' },
] as const satisfies readonly { chave: keyof SiteInfo; etiqueta: string; sigla: string }[];

/** Divide um texto com quebras de linha em <br />. */
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

export default function Footer({ site, areas }: { site: SiteInfo; areas: FooterArea[] }) {
  return (
    <footer>
      <div
        className="orb orb-dark orb-xl"
        style={{ top: '-200px', left: '-200px', '--orb-o': 0.4 } as CSSProperties}
      ></div>
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="brand-foot">
              <Logo height={48} />
            </div>
            <p>
              <Linhas texto={site.razaoSocial} />
            </p>
            <p style={{ marginTop: '16px' }}>
              <Linhas texto={site.morada} />
            </p>
            <p style={{ marginTop: '16px' }}>
              <a href={site.telHref}>{site.telefone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>

          <div>
            <h4>
              <Tx k="footer.areas" />
            </h4>
            <ul>
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/areas/${area.slug}`}>
                    <TxL v={area.tituloCurto} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>
              <Tx k="footer.empresa" />
            </h4>
            <ul>
              <li>
                <Link href="/empresa">
                  <Tx k="nav.empresa" />
                </Link>
              </li>
              <li>
                <Link href="/portefolio">
                  <Tx k="nav.portefolio" />
                </Link>
              </li>
              <li>
                <Link href="/contactos">
                  <Tx k="footer.contactosLink" />
                </Link>
              </li>
              <li>
                <Link href="/privacidade">
                  <Tx k="nav.privacidade" />
                </Link>
              </li>
            </ul>
            <h4 style={{ marginTop: '26px' }}>
              <Tx k="footer.loja" />
            </h4>
            <p>
              <TxL v={site.horarioDias} />
            </p>
            {/* No rodapé o horário fica numa linha só, separado por «·». */}
            <p>{site.horarioHoras.split('\n').join(' · ')}</p>
          </div>

          <div>
            <h4>Newsletter</h4>
            <p style={{ marginBottom: '18px' }}>
              <TxL v={site.newsletterTexto} />
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="bottom">
          <span>
            <TxL v={site.copyright} />
          </span>
          <div className="socials">
            {SOCIAIS.map(({ chave, etiqueta, sigla }) => {
              const url = site[chave];
              return (
                <a
                  key={chave}
                  href={url || '#'}
                  aria-label={etiqueta}
                  {...(url ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {sigla}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
