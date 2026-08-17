import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  AREAS_QUERY,
  AREA_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityArea,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import AreaMedia from '../../../components/AreaMedia';
import BlockHead from '../../../components/BlockHead';
import CtaBlock from '../../../components/CtaBlock';
import Notice from '../../../components/Notice';
import PageHero from '../../../components/PageHero';
import RelatedAreas from '../../../components/RelatedAreas';
import Subcats from '../../../components/Subcats';
import { AREA_SLUGS } from '../../../content/areas';
import { resolveArea, resolveAreas } from '../../../content/resolveAreas';
import { resolveSite } from '../../../content/site';
import { pick } from '../../../i18n/localize';

/** As oito áreas do código, mais qualquer área criada só no Studio. */
export async function generateStaticParams() {
  const docs = await fetchContent<(SanityArea | null)[]>(AREAS_QUERY);
  const doSanity = (docs ?? [])
    .map((d) => d?.slug)
    .filter((s): s is string => Boolean(s));
  const slugs = Array.from(new Set([...AREA_SLUGS, ...doSanity]));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await fetchContent<SanityArea>(AREA_QUERY, { slug });
  const area = resolveArea(slug, doc);
  if (!area) return { title: 'Área de negócio' };

  const titulo = pick('pt', area.titulo);
  return {
    title: titulo,
    description: area.seoDescription,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `${titulo} — Scryptus 1`,
      description: area.seoDescription,
      url: `/areas/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [doc, todosDocs, settings] = await Promise.all([
    fetchContent<SanityArea>(AREA_QUERY, { slug }),
    fetchContent<(SanityArea | null)[]>(AREAS_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const area = resolveArea(slug, doc);
  if (!area) notFound();

  const todas = resolveAreas(todosDocs);
  const outras = todas.filter((a) => a.slug !== area.slug).slice(0, 4);
  const site = resolveSite(settings);
  const nome = pick('pt', area.tituloCurto);

  return (
    <>
      <PageHero
        crumbs={[
          { href: '/', k: 'nav.inicio' },
          { href: '/#areas', k: 'nav.areas' },
          { v: area.tituloCurto },
        ]}
        kicker={area.num}
        eyebrowKey="area.eyebrow"
        titulo={area.titulo}
        lead={area.lead}
      />

      <section className="block">
        <div className="orb orb-lime orb-md" style={{ top: '120px', right: '-70px' }}></div>
        <div className="wrap">
          <AreaMedia
            imagem={area.imagemDestaque}
            legenda={area.legendaDestaque}
            alt={`${nome} — Scryptus 1`}
          />
          <BlockHead
            eyebrowKey="area.oQue"
            tituloKeys={['area.h2a', 'area.h2b']}
            link={{ href: `/contactos?area=${area.slug}`, k: 'area.pedir' }}
          />
          <Subcats subcategorias={area.subcategorias} />
          <Notice />
        </div>
      </section>

      {outras.length > 0 && (
        <section className="block bg-paper-2">
          <div className="wrap">
            <BlockHead
              eyebrowKey="area.outrasEyebrow"
              tituloKeys={['area.outrasH2a', 'area.outrasH2b']}
              link={{ href: '/portefolio', k: 'areas.more' }}
            />
            <RelatedAreas
              areas={outras.map((a) => ({
                slug: a.slug,
                num: a.num,
                tituloCurto: a.tituloCurto,
              }))}
            />
          </div>
        </section>
      )}

      <CtaBlock site={site} sobrePaper2={outras.length > 0} />
    </>
  );
}
