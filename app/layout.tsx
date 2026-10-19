import type { Metadata } from "next";
import { OG_BASE } from "./content/seo";
import { SITE_URL } from "./content/site";

// Fontes auto-hospedadas (Delicious Heavy e Carlito) declaradas em globals.css:
// nenhum pedido ao Google Fonts.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scryptus 1 — O seu parceiro de negócios em Cabo Verde",
    template: "%s — Scryptus 1",
  },
  description:
    "Plataforma integrada de comércio internacional, apoio técnico e consultoria na Praia, Cabo Verde. Oito áreas de negócio: gráfica, agricultura, têxteis, EPI, mobiliário, informática, museus e outras áreas.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    ...OG_BASE,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-imagem.jpg"],
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
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
