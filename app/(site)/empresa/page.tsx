import type { Metadata } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  EMPRESA_QUERY,
  SITE_SETTINGS_QUERY,
  type LText,
  type SanityEmpresa,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import BlockHead from '../../components/BlockHead';
import CtaBlock from '../../components/CtaBlock';
import EmpresaSobre from '../../components/EmpresaSobre';
import GrupoCards from '../../components/GrupoCards';
import PageHero from '../../components/PageHero';
import PilaresGrid from '../../components/PilaresGrid';
import Timeline from '../../components/Timeline';
import { EMPRESA_DEFAULTS as D } from '../../content/empresa';
import { resolveSite } from '../../content/site';
import { hasText } from '../../i18n/localize';

export const metadata: Metadata = {
  title: 'Conhecer a empresa',
  description: D.seoDescription,
  alternates: { canonical: '/empresa' },
  openGraph: {
    title: 'Conhecer a empresa — Scryptus 1',
    description: D.seoDescription,
    url: '/empresa',
  },
};

/** Texto do Sanity, se estiver preenchido; caso contrário o do código. */
const txt = (doc: LText | null | undefined, defeito: LText): LText =>
  hasText(doc) ? (doc as LText) : defeito;

export default async function EmpresaPage() {
  const [doc, settings] = await Promise.all([
    fetchContent<SanityEmpresa>(EMPRESA_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const site = resolveSite(settings);

  const paragrafos = (doc?.sobreParagrafos ?? []).filter(hasText) as LText[];
  const estatisticas = (doc?.estatisticas ?? [])
    .filter((e) => e?.valor)
    .map((e) => ({ valor: e!.valor!, legenda: e!.legenda ?? { pt: '' } }));
  const marcos = (doc?.marcos ?? [])
    .filter((m) => m?.ano || hasText(m?.titulo))
    .map((m) => ({
      ano: m!.ano ?? '',
      titulo: m!.titulo ?? { pt: '' },
      descricao: m!.descricao ?? { pt: '' },
    }));
  const pilares = (doc?.pilares ?? [])
    .filter((p) => hasText(p?.titulo))
    .map((p, i) => ({
      num: p!.num ?? String(i + 1).padStart(2, '0'),
      titulo: p!.titulo!,
      descricao: p!.descricao ?? { pt: '' },
    }));
  const grupo = (doc?.grupoEmpresas ?? [])
    .filter((g) => g?.nome)
    .map((g) => ({ etiqueta: g!.etiqueta ?? '', nome: g!.nome!, url: g!.url ?? undefined }));

  return (
    <>
      <PageHero
        crumbs={[{ href: '/', k: 'nav.inicio' }, { k: 'nav.empresa' }]}
        eyebrow={txt(doc?.eyebrow, D.eyebrow)}
        titulo={txt(doc?.titulo, D.titulo)}
        lead={txt(doc?.lead, D.lead)}
      />

      <section className="block">
        <div className="orb orb-lime orb-md" style={{ top: '100px', right: '-70px' }}></div>
        <div className="wrap">
          <EmpresaSobre
            eyebrow={D.sobreEyebrow}
            titulo={txt(doc?.sobreTitulo, D.sobreTitulo)}
            pullquote={txt(doc?.pullquote, D.pullquote)}
            paragrafos={paragrafos.length > 0 ? paragrafos : D.sobreParagrafos}
            estatisticas={estatisticas.length > 0 ? estatisticas : D.estatisticas}
            imagem={doc?.imagem}
            legendaImagem={D.imagemLegenda}
          />
        </div>
      </section>

      <section className="block bg-paper-2">
        <div className="wrap">
          <BlockHead
            eyebrow={D.percursoEyebrow}
            titulo={D.percursoTitulo}
            intro={txt(doc?.percursoIntro, D.percursoIntro)}
          />
          <Timeline marcos={marcos.length > 0 ? marcos : D.marcos} />
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <BlockHead eyebrow={D.trabalhoEyebrow} titulo={D.trabalhoTitulo} />
          <PilaresGrid pilares={pilares.length > 0 ? pilares : D.pilares} />
        </div>
      </section>

      <section className="block bg-paper-2">
        <div className="wrap">
          <BlockHead
            eyebrow={D.grupoEyebrow}
            titulo={D.grupoTitulo}
            intro={txt(doc?.grupoIntro, D.grupoIntro)}
            larguraIntro="58ch"
          />
          <GrupoCards empresas={grupo.length > 0 ? grupo : D.grupoEmpresas} />
        </div>
      </section>

      <CtaBlock site={site} sobrePaper2 />
    </>
  );
}
