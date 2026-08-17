import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import localFont from "next/font/local";
import { SITE_URL } from "./content/site";

// 1. Carregar a Delicious Heavy a partir da pasta public
const deliciousHeavy = localFont({
  src: '../public/fonts/Delicious-Heavy.otf',
  variable: '--display',
  weight: '900',
  display: 'swap',
});

// 2. Carregar a Carlito (texto corrido) otimizada pelo Google Fonts
const carlito = Carlito({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ['normal', 'italic'],
  variable: "--body"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scryptus 1 — O seu parceiro de negócios em Cabo Verde",
    template: "%s — Scryptus 1",
  },
  description:
    "Plataforma integrada de comércio internacional, apoio técnico e consultoria na Praia, Cabo Verde. Oito áreas de negócio: gráfica, agricultura, têxteis, EPI, mobiliário, informática, museus e outras áreas.",
  openGraph: {
    type: "website",
    siteName: "Scryptus 1",
    locale: "pt_PT",
    url: SITE_URL,
  },
  other: {
    "theme-color": "#2d4f3a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Injetar as duas fontes globalmente na tag HTML
    <html lang="pt" className={`${deliciousHeavy.variable} ${carlito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
