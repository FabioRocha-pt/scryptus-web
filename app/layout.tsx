import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import localFont from "next/font/local";
import { SanityLive } from "@/sanity/lib/live";
import { SITE_URL } from "./site-config";
import "./globals.css";

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

const DESCRIPTION =
  "Plataforma integrada de comércio internacional em Cabo Verde.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Scryptus 1",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  // Declarado aqui uma só vez: todas as rotas herdam og:image e og:url, e podem
  // sobrepor-se com caminhos relativos em vez de URLs absolutos espalhados.
  openGraph: {
    type: "website",
    siteName: "Scryptus 1",
    locale: "pt_PT",
    title: "Scryptus 1",
    description: DESCRIPTION,
    url: "/",
    images: ["/og-imagem.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scryptus 1",
    description: DESCRIPTION,
    images: ["/og-imagem.jpg"],
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
      <body>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}