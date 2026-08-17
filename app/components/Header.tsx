'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { useLocale } from '../i18n/LanguageProvider';
import { LOCALES } from '../i18n/translations';
import { Tx, useT } from '../i18n/Tx';
import Logo from './Logo';

const LINKS = [
  { href: '/#oferta', k: 'nav.oferta' },
  { href: '/#areas', k: 'nav.areas' },
  { href: '/#sobre', k: 'nav.sobre' },
  { href: '/#clientes', k: 'nav.clientes' },
  { href: '/contactos', k: 'nav.contactos' },
] as const;

export default function Header() {
  const { locale, setLocale } = useLocale();
  const t = useT();
  const pathname = usePathname();

  // O menu móvel guarda a página onde foi aberto: mudar de página fecha-o
  // sozinho, sem precisar de efeito. Acima dos 600px é o CSS que o esconde.
  const [abertoEm, setAbertoEm] = useState<string | null>(null);
  const open = abertoEm === pathname;
  const setOpen = (valor: boolean) => setAbertoEm(valor ? pathname : null);

  const idiomas = (
    <span className="lang" role="group" aria-label={t('nav.idioma')}>
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <button
            type="button"
            className={locale === l ? 'active' : ''}
            aria-pressed={locale === l}
            onClick={() => setLocale(l)}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </span>
  );

  return (
    <header className="topnav">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Scryptus 1">
          <Logo height={30} />
        </Link>
        <nav className="primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Tx k={link.k} />
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          {idiomas}
          <Link href="/contactos" className="btn btn-dark btn-sm">
            <Tx k="nav.orcamento" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={t('nav.abrirMenu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <nav className={open ? 'mobile-nav open' : 'mobile-nav'} id="mobile-nav">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <Tx k={link.k} />
          </Link>
        ))}
        <Link href="/portefolio" onClick={() => setOpen(false)}>
          <Tx k="nav.portefolio" />
        </Link>
        {idiomas}
        <Link href="/contactos" className="btn btn-dark btn-sm" onClick={() => setOpen(false)}>
          <Tx k="nav.orcamento" />
        </Link>
      </nav>
    </header>
  );
}
