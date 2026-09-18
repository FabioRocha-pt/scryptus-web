'use client';

import type { CSSProperties } from 'react';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

// Seleção fixa, sem caixa "+N": a escala passa a ser dita na linha sob a grelha
// (ver 'clientes.mais'), que não se confunde com um item clicável.
const CLIENTES = ['BCV', 'BCA', 'BAI CV', 'Min. Agricultura', 'CMP', 'CM Mindelo', 'INCV', 'CV Telecom', 'ASA', 'IEFP', 'Correios CV', 'INIDA'];

export default function Clientes() {
  return (
    <section className="block bg-paper-2" id="clientes">
      <div className="wrap">
        <div className="block-head">
          <Reveal variant="up" className="text">
            <span className="eyebrow"><Tx k="clientes.eyebrow" /></span>
            <h2><Tx k="clientes.h2a" /><em><Tx k="clientes.h2b" /></em></h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-mute)', marginTop: '18px', maxWidth: '54ch', lineHeight: 1.65 } as CSSProperties}>
              <Tx k="clientes.intro" />
            </p>
          </Reveal>
        </div>
        <RevealGroup className="clients-grid" stagger={0.05}>
          {CLIENTES.map((cliente) => (
            <RevealItem key={cliente} className="cell" variant="zoom" duration={0.5}>
              <div className="client">{cliente}</div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal variant="up" delay={0.1}>
          <p className="clients-more"><Tx k="clientes.mais" /></p>
        </Reveal>
      </div>
    </section>
  );
}
