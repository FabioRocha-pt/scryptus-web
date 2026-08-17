import type { Metadata } from 'next';
import NotFoundContent from './components/NotFoundContent';
import SiteShell from './components/SiteShell';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que procura não existe ou foi movida.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
