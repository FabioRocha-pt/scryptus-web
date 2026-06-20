import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Scryptus 1",
  description: "Plataforma integrada de comércio internacional em Cabo Verde.",
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