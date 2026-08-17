import type {LText, SanityImageWithAlt, SanitySiteSettings} from '@/sanity/lib/queries'
import {hasText} from '../i18n/localize'

/**
 * Dados da empresa por defeito.
 *
 * Tudo isto é editável no Sanity (documento «Definições do site»); estes
 * valores são o recurso usado enquanto o Studio não estiver preenchido.
 */
export const SITE_DEFAULTS = {
  nome: 'Scryptus 1',
  razaoSocial: 'Comercialização de Papéis\ne Produtos Gráficos, Lda.',
  tagline: {
    pt: 'O seu parceiro de negócios.',
    en: 'Your business partner.',
    fr: 'Votre partenaire d’affaires.',
  } satisfies LText,
  morada: 'Rua da Cruz Vermelha, R/C\nPraia, Santiago, Cabo Verde',
  telefone: '(+238) 264 76 07',
  whatsapp: '(+238) 955 10 20',
  whatsappUrl: 'https://wa.me/2389551020',
  email: 'info@scryptus1-caboverde.com',
  horarioDias: {
    pt: 'Segunda a sexta',
    en: 'Monday to Friday',
    fr: 'Du lundi au vendredi',
  } satisfies LText,
  horarioHoras: '08h00 – 13h00\n14h00 – 17h00',
  mapaUrl: 'https://maps.google.com/?q=Rua+da+Cruz+Vermelha,+Praia,+Cabo+Verde',
  facebook: '',
  instagram: '',
  linkedin: '',
  newsletterTexto: {
    pt: 'Novidades, eventos e ofertas especiais.',
    en: 'News, events and special offers.',
    fr: 'Nouveautés, événements et offres spéciales.',
  } satisfies LText,
  copyright: {
    pt: '© 2026 Scryptus 1 · Grupo CAVEX · Todos os direitos reservados.',
    en: '© 2026 Scryptus 1 · CAVEX Group · All rights reserved.',
    fr: '© 2026 Scryptus 1 · Groupe CAVEX · Tous droits réservés.',
  } satisfies LText,
}

/** Endereço público do site — usado no sitemap, canónicos e Open Graph. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scryptus1-caboverde.com'
).replace(/\/$/, '')

/** `(+238) 264 76 07` → `tel:+2382647607` */
export function telHref(numero: string): string {
  const digits = numero.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('+') ? digits : `+${digits}`}`
}

/** Constrói o link wa.me a partir do número, quando não houver link definido. */
export function whatsappHref(numero: string, url?: string | null): string {
  if (url) return url
  const digits = numero.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

/** Dados da empresa já resolvidos (Sanity sobrepõe-se aos valores por defeito). */
export interface SiteInfo {
  razaoSocial: string
  tagline: LText
  morada: string
  telefone: string
  telHref: string
  whatsapp: string
  whatsappUrl: string
  email: string
  horarioDias: LText
  horarioHoras: string
  mapaUrl: string
  facebook: string
  instagram: string
  linkedin: string
  newsletterTexto: LText
  copyright: LText
  ogImage?: SanityImageWithAlt | null
}

const texto = (valor: string | null | undefined, defeito: string) =>
  valor && valor.trim() !== '' ? valor : defeito

/**
 * Junta as «Definições do site» do Sanity aos valores por defeito.
 * Corre no servidor e o resultado é passado aos componentes de cliente.
 */
export function resolveSite(settings: SanitySiteSettings | null): SiteInfo {
  const d = SITE_DEFAULTS
  const telefone = texto(settings?.telefone, d.telefone)
  const whatsapp = texto(settings?.whatsapp, d.whatsapp)

  return {
    razaoSocial: texto(settings?.razaoSocial, d.razaoSocial),
    tagline: hasText(settings?.tagline) ? settings!.tagline! : d.tagline,
    morada: texto(settings?.morada, d.morada),
    telefone,
    telHref: telHref(telefone),
    whatsapp,
    whatsappUrl: whatsappHref(whatsapp, texto(settings?.whatsappUrl, d.whatsappUrl)),
    email: texto(settings?.email, d.email),
    horarioDias: hasText(settings?.horarioDias) ? settings!.horarioDias! : d.horarioDias,
    horarioHoras: texto(settings?.horarioHoras, d.horarioHoras),
    mapaUrl: texto(settings?.mapaUrl, d.mapaUrl),
    facebook: texto(settings?.facebook, d.facebook),
    instagram: texto(settings?.instagram, d.instagram),
    linkedin: texto(settings?.linkedin, d.linkedin),
    newsletterTexto: hasText(settings?.newsletterTexto)
      ? settings!.newsletterTexto!
      : d.newsletterTexto,
    copyright: hasText(settings?.copyright) ? settings!.copyright! : d.copyright,
    ogImage: settings?.ogImage ?? null,
  }
}
