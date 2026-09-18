import type { Metadata } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  PRIVACIDADE_QUERY,
  type LText,
  type SanityPrivacidade,
} from '@/sanity/lib/queries';
import PageHero from '../../components/PageHero';
import Secoes from '../../components/Secoes';
import { PRIVACIDADE_DEFAULTS as D } from '../../content/paginas';
import { hasText } from '../../i18n/localize';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: D.seoDescription,
  alternates: { canonical: '/privacidade' },
};

const txt = (doc: LText | null | undefined, defeito: LText): LText =>
  hasText(doc) ? (doc as LText) : defeito;

export default async function PrivacidadePage() {
  const doc = await fetchContent<SanityPrivacidade>(PRIVACIDADE_QUERY);

  const secoes = (doc?.secoes ?? [])
    .filter((s) => hasText(s?.titulo))
    .map((s) => ({
      titulo: s!.titulo!,
      paragrafos: (s!.paragrafos ?? []).filter(hasText) as LText[],
      lista: (s!.lista ?? []).filter(hasText) as LText[],
      paragrafosFinais: (s!.paragrafosFinais ?? []).filter(hasText) as LText[],
    }));

  return (
    <>
      <PageHero
        crumbs={[{ href: '/', k: 'nav.inicio' }, { k: 'nav.privacidade' }]}
        eyebrow={txt(doc?.eyebrow, D.eyebrow)}
        titulo={txt(doc?.titulo, D.titulo)}
        lead={txt(doc?.lead, D.lead)}
        orbLime={false}
      />

      <section className="block">
        <div className="wrap">
          <Secoes secoes={secoes.length > 0 ? secoes : D.secoes} />
        </div>
      </section>
    </>
  );
}
