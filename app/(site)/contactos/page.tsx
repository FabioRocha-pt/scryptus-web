import type { Metadata } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  AREAS_QUERY,
  CONTACTOS_QUERY,
  SITE_SETTINGS_QUERY,
  type LText,
  type SanityArea,
  type SanityContactos,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import ContactForm from '../../components/ContactForm';
import ContactInfo from '../../components/ContactInfo';
import PageHero from '../../components/PageHero';
import { CONTACTOS_DEFAULTS as D } from '../../content/paginas';
import { resolveAreas } from '../../content/resolveAreas';
import { resolveSite } from '../../content/site';
import { hasText } from '../../i18n/localize';

export const metadata: Metadata = {
  title: 'Contactos e pedidos de orçamento',
  description: D.seoDescription,
  alternates: { canonical: '/contactos' },
  openGraph: {
    title: 'Contactos e pedidos de orçamento — Scryptus 1',
    description: D.seoDescription,
    url: '/contactos',
  },
};

const txt = (doc: LText | null | undefined, defeito: LText): LText =>
  hasText(doc) ? (doc as LText) : defeito;

export default async function ContactosPage() {
  const [doc, areasDocs, settings] = await Promise.all([
    fetchContent<SanityContactos>(CONTACTOS_QUERY),
    fetchContent<(SanityArea | null)[]>(AREAS_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const areas = resolveAreas(areasDocs);
  const site = resolveSite(settings);

  const passos = (doc?.passos ?? [])
    .filter((p) => hasText(p?.texto))
    .map((p, i) => ({ num: p!.num ?? String(i + 1).padStart(2, '0'), texto: p!.texto! }));

  return (
    <>
      <PageHero
        crumbs={[{ href: '/', k: 'nav.inicio' }, { k: 'nav.contactos' }]}
        eyebrow={txt(doc?.eyebrow, D.eyebrow)}
        titulo={txt(doc?.titulo, D.titulo)}
        lead={txt(doc?.lead, D.lead)}
      />

      <section className="block">
        <div className="orb orb-lime orb-md" style={{ top: '120px', right: '-70px' }}></div>
        <div className="wrap">
          <div className="contact-grid">
            <ContactForm
              areas={areas.map((a) => ({ slug: a.slug, tituloCurto: a.tituloCurto }))}
              titulo={txt(doc?.formTitulo, D.formTitulo)}
            />
            <ContactInfo site={site} passos={passos.length > 0 ? passos : D.passos} />
          </div>
        </div>
      </section>
    </>
  );
}
