import type { Metadata } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import {
  CONTACTOS_QUERY,
  SITE_SETTINGS_QUERY,
  type LText,
  type SanityContactos,
  type SanitySiteSettings,
} from '@/sanity/lib/queries';
import ObrigadoContent from '../../../components/ObrigadoContent';
import { CONTACTOS_DEFAULTS as D } from '../../../content/paginas';
import { resolveSite } from '../../../content/site';
import { hasText } from '../../../i18n/localize';

export const metadata: Metadata = {
  title: 'Pedido enviado',
  description: 'O seu pedido de orçamento foi enviado com sucesso.',
  robots: { index: false, follow: true },
};

const txt = (doc: LText | null | undefined, defeito: LText): LText =>
  hasText(doc) ? (doc as LText) : defeito;

export default async function ObrigadoPage() {
  const [doc, settings] = await Promise.all([
    fetchContent<SanityContactos>(CONTACTOS_QUERY),
    fetchContent<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  const site = resolveSite(settings);

  return (
    <ObrigadoContent
      titulo={txt(doc?.obrigadoTitulo, D.obrigadoTitulo)}
      texto={txt(doc?.obrigadoTexto, D.obrigadoTexto)}
      whatsappUrl={site.whatsappUrl}
      whatsapp={site.whatsapp}
    />
  );
}
