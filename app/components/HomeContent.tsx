import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  HOME_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityHome,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import { resolveClientes } from '../content/clientes';
import type { FotoLocal } from '../content/imagens';
import { resolveAreas } from '../content/resolveAreas';
import { resolveSite } from '../content/site';
import AreasNegocio from './AreasNegocio';
import Clientes from './Clientes';
import CtaBlock from './CtaBlock';
import Hero from './Hero';
import Oferta from './Oferta';
import Preloader from './Preloader';
import Sobre from './Sobre';

/**
 * A página inicial inteira. `fotoHero` força uma fotografia local no herói
 * (ignora a do Sanity) — serve as pré-visualizações em /previa.
 */
export default async function HomeContent({ fotoHero }: { fotoHero?: FotoLocal }) {
  const [home, settings] = await Promise.all([
    fetchContent<SanityHome>(HOME_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const areas = resolveAreas(home?.areas);
  const clientes = resolveClientes(home?.clientes);
  const site = resolveSite(settings);

  return (
    <>
      <Preloader />
      <Hero data={home?.hero} foto={fotoHero} />
      <Oferta data={home?.oferta} />
      <AreasNegocio areas={areas} />
      <Sobre data={home?.sobre} />
      <Clientes clientes={clientes} />
      <CtaBlock site={site} sobrePaper2 />
    </>
  );
}
