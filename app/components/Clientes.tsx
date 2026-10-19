'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageWithAlt } from '@/sanity/lib/queries';
import type { ClienteContent } from '../content/clientes';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

export interface ClienteItem {
  nome: string;
  nomeCurto: string;
  logo?: SanityImageWithAlt | null;
  /** Logótipo em /public/img/clientes, usado quando o Sanity não tem nenhum. */
  local?: ClienteContent | null;
}

/** image-<id>-<largura>x<altura>-<ext> → dimensões reais do ficheiro. */
function dimensoes(ref: string) {
  const m = ref.match(/-(\d+)x(\d+)-/);
  return m ? { width: +m[1], height: +m[2] } : { width: 124, height: 52 };
}

export default function Clientes({ clientes }: { clientes: ClienteItem[] }) {
  return (
    <section className="block bg-paper-2" id="clientes">
      <div className="wrap">
        <div className="block-head">
          <Reveal variant="up" className="text">
            <span className="eyebrow">
              <Tx k="clientes.eyebrow" />
            </span>
            <h2>
              <Tx k="clientes.h2a" />
              <em>
                <Tx k="clientes.h2b" />
              </em>
            </h2>
            <p
              style={
                {
                  fontSize: '16px',
                  color: 'var(--ink-mute)',
                  marginTop: '18px',
                  maxWidth: '54ch',
                  lineHeight: 1.65,
                } as CSSProperties
              }
            >
              <Tx k="clientes.intro" />
            </p>
          </Reveal>
        </div>
        <RevealGroup className="clients-grid" stagger={0.05}>
          {clientes.map((cliente) => (
            <RevealItem key={cliente.nome} className="cell" variant="zoom" duration={0.5}>
              {/* A altura de cada logótipo vem da classe .c-<chave>: equilibra o peso óptico. */}
              <div
                className={cliente.local ? `client c-${cliente.local.chave}` : 'client'}
                title={cliente.nome}
              >
                {cliente.logo?.asset ? (
                  // Só a largura: com largura e altura, o Sanity recorta o logótipo para
                  // essa proporção. As dimensões reais vêm da referência do asset.
                  <Image
                    src={urlFor(cliente.logo).width(248).fit('max').auto('format').url()}
                    alt={cliente.logo.alt ?? cliente.nome}
                    {...dimensoes(cliente.logo.asset._ref)}
                    sizes="124px"
                  />
                ) : cliente.local ? (
                  <Image
                    src={`/img/clientes/${cliente.local.chave}.png`}
                    alt={cliente.nome}
                    width={cliente.local.largura}
                    height={cliente.local.altura}
                    sizes="124px"
                  />
                ) : (
                  cliente.nomeCurto
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal variant="up" delay={0.1}>
          <p className="clients-more">
            <Tx k="clientes.mais" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
