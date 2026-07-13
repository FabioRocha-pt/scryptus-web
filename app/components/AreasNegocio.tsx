'use client';

import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { HomeImages } from '@/sanity/lib/queries';
import type { TKey } from '../i18n/translations';
import { Tx } from '../i18n/Tx';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

type AreaField = keyof NonNullable<HomeImages['areasNegocio']>;

const AREAS: {
  num: string;
  name: string;
  titleKey: TKey;
  descKey: TKey;
  tagKey: TKey;
  tagClass: string;
  field: AreaField;
  placeholder: ReactNode;
}[] = [
  { num: '01', name: 'Gráfica', titleKey: 'areas.a1.title', descKey: 'areas.a1.desc', tagKey: 'areas.tag.mixed', tagClass: 'tag', field: 'grafica', placeholder: <>Foto<br />prensa offset</> },
  { num: '02', name: 'Agricultura', titleKey: 'areas.a2.title', descKey: 'areas.a2.desc', tagKey: 'areas.tag.mixed', tagClass: 'tag', field: 'agricultura', placeholder: <>Foto<br />estufa em produção</> },
  { num: '03', name: 'Têxteis', titleKey: 'areas.a3.title', descKey: 'areas.a3.desc', tagKey: 'areas.tag.direct', tagClass: 'tag direct', field: 'texteis', placeholder: <>Foto<br />vestuário trabalho</> },
  { num: '04', name: 'EPI', titleKey: 'areas.a4.title', descKey: 'areas.a4.desc', tagKey: 'areas.tag.direct', tagClass: 'tag direct', field: 'epi', placeholder: <>Foto<br />EPI em uso</> },
  { num: '05', name: 'Mobiliário', titleKey: 'areas.a5.title', descKey: 'areas.a5.desc', tagKey: 'areas.tag.quote', tagClass: 'tag quote', field: 'mobiliario', placeholder: <>Foto<br />auditório</> },
  { num: '06', name: 'Informática', titleKey: 'areas.a6.title', descKey: 'areas.a6.desc', tagKey: 'areas.tag.mixed', tagClass: 'tag', field: 'informatica', placeholder: <>Foto<br />sala servidores</> },
  { num: '07', name: 'Museus e exposições', titleKey: 'areas.a7.title', descKey: 'areas.a7.desc', tagKey: 'areas.tag.quote', tagClass: 'tag quote', field: 'museus', placeholder: <>Foto<br />vitrina museu</> },
  { num: '08', name: 'Outras áreas', titleKey: 'areas.a8.title', descKey: 'areas.a8.desc', tagKey: 'areas.tag.quote', tagClass: 'tag quote', field: 'outras', placeholder: <>Foto<br />gerador + escolar</> },
];

export default function AreasNegocio({ data }: { data?: HomeImages['areasNegocio'] }) {
  return (
    <section className="block bg-paper-2" id="areas">
      <div className="orb orb-green orb-xl" style={{ top: '200px', left: '-200px' }}></div>
      <div className="orb orb-lime orb-lg" style={{ bottom: '-100px', right: '-100px' }}></div>
      <div className="wrap">
        <div className="block-head">
          <Reveal variant="up" className="text">
            <span className="eyebrow"><Tx k="areas.eyebrow" /></span>
            <h2><Tx k="areas.h2a" /><em><Tx k="areas.h2b" /></em></h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-mute)', marginTop: '18px', maxWidth: '54ch', lineHeight: 1.65 } as CSSProperties}>
              <Tx k="areas.intro" />
            </p>
          </Reveal>
          <Reveal variant="left" delay={0.2}>
            <a href="#" className="more"><Tx k="areas.more" /></a>
          </Reveal>
        </div>
        <RevealGroup className="verticals" stagger={0.08}>
          {AREAS.map((area) => {
            const image = data?.[area.field];
            return (
              <RevealItem key={area.num} className="cell-fill" variant="up">
                <div className="vert">
                  <div className="img">
                    {image?.asset ? (
                      <Image
                        src={urlFor(image).width(560).height(644).fit('crop').auto('format').url()}
                        alt={image.alt ?? area.name}
                        fill
                        sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, 280px"
                      />
                    ) : (
                      area.placeholder
                    )}
                  </div>
                  <div className="body">
                    <span className="num">{area.num}</span>
                    <h3><Tx k={area.titleKey} /></h3>
                    <p><Tx k={area.descKey} /></p>
                    <span className={area.tagClass}><Tx k={area.tagKey} /></span>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
