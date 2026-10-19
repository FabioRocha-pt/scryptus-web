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

/**
 * Redes sociais do rodapé, na ordem do site de referência.
 *
 * Os endereços vêm das «Definições do site» no Sanity. Enquanto estiverem vazios
 * o ícone não é desenhado — mais vale não ter ícone do que um que não vai a lado
 * nenhum. Se a Scryptus não tiver presença nas redes, a secção fica escondida.
 */
const SOCIAIS = [
  {
    chave: 'facebook',
    etiqueta: 'Facebook',
    d: 'M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z',
  },
  {
    chave: 'instagram',
    etiqueta: 'Instagram',
    d: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
  },
  {
    chave: 'linkedin',
    etiqueta: 'LinkedIn',
    d: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z',
  },
] as const satisfies readonly { chave: keyof SiteInfo; etiqueta: string; d: string }[];

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
            <p style={{ marginTop: '6px' }}>
              <a href={site.mapaUrl} target="_blank" rel="noopener noreferrer">
                <Tx k="footer.mapa" />
              </a>
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
          {SOCIAIS.some(({ chave }) => site[chave]) && (
            <div className="socials">
              {SOCIAIS.filter(({ chave }) => site[chave]).map(({ chave, etiqueta, d }) => (
                <a
                  key={chave}
                  href={site[chave] as string}
                  aria-label={etiqueta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
