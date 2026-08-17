import { SanityLive } from '@/sanity/lib/live';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  AREAS_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityArea,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import '../globals.css';
import { resolveAreas } from '../content/resolveAreas';
import { resolveSite } from '../content/site';
import { LanguageProvider } from '../i18n/LanguageProvider';
import Footer from './Footer';
import Header from './Header';
import WhatsAppFab from './WhatsAppFab';

/**
 * Cabeçalho, rodapé e botão de WhatsApp comuns a todas as páginas do site
 * (usado pelo layout de `(site)` e pela página 404).
 */
export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, areasDocs] = await Promise.all([
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
    fetchContent<(SanityArea | null)[]>(AREAS_QUERY),
  ]);

  const site = resolveSite(settings);
  const areas = resolveAreas(areasDocs);

  return (
    <LanguageProvider>
      <Header />
      <main>{children}</main>
      <Footer
        site={site}
        areas={areas.map((a) => ({ slug: a.slug, tituloCurto: a.tituloCurto }))}
      />
      <WhatsAppFab href={site.whatsappUrl} />
      <SanityLive />
    </LanguageProvider>
  );
}
