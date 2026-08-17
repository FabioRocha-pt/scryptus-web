import type { Metadata } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  AREAS_QUERY,
  PORTEFOLIO_QUERY,
  SITE_SETTINGS_QUERY,
  type LText,
  type SanityArea,
  type SanityPortefolio,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import BlockHead from '../../components/BlockHead';
import CtaBlock from '../../components/CtaBlock';
import Notice from '../../components/Notice';
import PageHero from '../../components/PageHero';
import PortNav from '../../components/PortNav';
import Subcats from '../../components/Subcats';
import { PORTEFOLIO_DEFAULTS as D } from '../../content/paginas';
import { resolveAreas } from '../../content/resolveAreas';
import { resolveSite } from '../../content/site';
import { hasText } from '../../i18n/localize';

export const metadata: Metadata = {
  title: 'Portefólio completo',
  description: D.seoDescription,
  alternates: { canonical: '/portefolio' },
  openGraph: {
    title: 'Portefólio completo — Scryptus 1',
    description: D.seoDescription,
    url: '/portefolio',
  },
};

const txt = (doc: LText | null | undefined, defeito: LText): LText =>
  hasText(doc) ? (doc as LText) : defeito;

export default async function PortefolioPage() {
  const [doc, areasDocs, settings] = await Promise.all([
    fetchContent<SanityPortefolio>(PORTEFOLIO_QUERY),
    fetchContent<(SanityArea | null)[]>(AREAS_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const areas = resolveAreas(areasDocs);
  const site = resolveSite(settings);

  return (
    <>
      <PageHero
        crumbs={[{ href: '/', k: 'nav.inicio' }, { k: 'nav.portefolio' }]}
        eyebrow={txt(doc?.eyebrow, D.eyebrow)}
        titulo={txt(doc?.titulo, D.titulo)}
        lead={txt(doc?.lead, D.lead)}
      />

      <PortNav areas={areas.map((a) => ({ slug: a.slug, tituloCurto: a.tituloCurto }))} />

      {areas.map((area) => (
        <section className="block" id={area.slug} key={area.slug}>
          <div className="wrap">
            <BlockHead
              eyebrowKey="area.numero"
              eyebrowSufixo={area.num}
              titulo={area.titulo}
              intro={area.lead}
              larguraIntro="60ch"
              link={{ href: `/areas/${area.slug}`, k: 'area.verArea' }}
            />
            <Subcats subcategorias={area.subcategorias} />
          </div>
        </section>
      ))}

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Notice texto={txt(doc?.aviso, D.aviso)} />
        </div>
      </section>

      <CtaBlock site={site} />
    </>
  );
}
