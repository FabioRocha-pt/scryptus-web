import type { Metadata } from 'next';
import HomeContent from '../../../components/HomeContent';
import { FOTO_HERO_V2 } from '../../../content/imagens';

/**
 * Pré-visualização da página inicial com a imagem «Página inicial_V2», para a
 * cliente comparar com a atual (pedido de 12/11/2026). Fora do sitemap e dos
 * motores de busca; apagar esta pasta quando a escolha estiver feita.
 */
export const metadata: Metadata = {
  title: 'Pré-visualização — imagem inicial V2',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

export default function PreviaHeroV2() {
  return <HomeContent fotoHero={FOTO_HERO_V2} />;
}
