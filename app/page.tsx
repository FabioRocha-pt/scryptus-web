import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Oferta from './components/Oferta';
import AreasNegocio from './components/AreasNegocio';
import Sobre from './components/Sobre';
import Clientes from './components/Clientes';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      {/* O SVG global com os defs pode ficar aqui ou num componente dedicado */}
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Oferta />
        <AreasNegocio />
        <Sobre />
        <Clientes />
      </main>
      <Footer />
    </>
  );
}