import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  HOME_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityHome,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import AreasNegocio from '../components/AreasNegocio';
import Clientes from '../components/Clientes';
import CtaBlock from '../components/CtaBlock';
import Hero from '../components/Hero';
import Oferta from '../components/Oferta';
import Preloader from '../components/Preloader';
import Sobre from '../components/Sobre';
import { resolveClientes } from '../content/clientes';
import { resolveAreas } from '../content/resolveAreas';
import { resolveSite } from '../content/site';

export default async function Home() {
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
      <Hero data={home?.hero} />
      <Oferta data={home?.oferta} />
      <AreasNegocio areas={areas} />
      <Sobre data={home?.sobre} />
      <Clientes clientes={clientes} />
      <CtaBlock site={site} sobrePaper2 />
    </>
  );
}
