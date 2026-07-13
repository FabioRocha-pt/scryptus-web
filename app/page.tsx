import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Oferta from './components/Oferta';
import AreasNegocio from './components/AreasNegocio';
import Sobre from './components/Sobre';
import Clientes from './components/Clientes';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { LanguageProvider } from './i18n/LanguageProvider';
import { sanityFetch } from '@/sanity/lib/live';
import { HOME_IMAGES_QUERY, type HomeImages } from '@/sanity/lib/queries';

async function getHomeImages(): Promise<HomeImages> {
  try {
    const { data } = await sanityFetch({ query: HOME_IMAGES_QUERY });
    return data as unknown as HomeImages;
  } catch {
    // Sem ligação ao Sanity, a página mantém os placeholders
    return { hero: null, areasNegocio: null, sobre: null };
  }
}

export default async function Home() {
  const images = await getHomeImages();

  return (
    <LanguageProvider>
      <Preloader />
      <Header />
      <main>
        <Hero data={images.hero} />
        <TrustBar />
        <Oferta />
        <AreasNegocio data={images.areasNegocio} />
        <Sobre data={images.sobre} />
        <Clientes />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
