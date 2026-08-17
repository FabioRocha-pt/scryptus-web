'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageWithAlt } from '@/sanity/lib/queries';
import { Reveal } from './motion/Reveal';

/**
 * Banner largo no topo das páginas de área.
 * Sem imagem no Sanity, mostra a legenda sugerida sobre o gradiente verde.
 */
export default function AreaMedia({
  imagem,
  legenda,
  alt,
}: {
  imagem?: SanityImageWithAlt | null;
  legenda: string;
  alt: string;
}) {
  return (
    <Reveal variant="up" duration={0.9}>
      <div className="area-media">
        {imagem?.asset ? (
          <Image
            src={urlFor(imagem).width(1600).height(700).fit('crop').auto('format').url()}
            alt={imagem.alt ?? alt}
            fill
            sizes="(max-width: 1240px) 100vw, 1176px"
            priority
          />
        ) : (
          <span>
            {legenda.split('\n').map((linha, i) => (
              <span key={i} style={{ display: 'block' }}>
                {linha}
              </span>
            ))}
          </span>
        )}
      </div>
    </Reveal>
  );
}
