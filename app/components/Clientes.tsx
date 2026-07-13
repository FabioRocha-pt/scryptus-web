'use client';

import type { CSSProperties } from 'react';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

const CLIENTES = ['BCV', 'BCA', 'BAI CV', 'Min. Agricultura', 'CMP', 'CM Mindelo', 'INCV', 'CV Telecom', 'ASA', 'IEFP', 'Correios CV', '+ 14'];

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
      </div>
    </section>
  );
}
