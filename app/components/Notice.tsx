'use client';

import { useLocale } from '../i18n/LanguageProvider';
import { pick, type MaybeLText } from '../i18n/localize';
import { Tx } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

/** Aviso do Sanity: a primeira frase sai em negrito, como no site de origem. */
function Aviso({ v }: { v: MaybeLText }) {
  const { locale } = useLocale();
  const texto = pick(locale, v);
  const corte = texto.indexOf('. ');
  if (corte === -1) return <p>{texto}</p>;
  return (
    <p>
      <strong>{texto.slice(0, corte + 1)}</strong>
      {texto.slice(corte + 1)}
    </p>
  );
}

/**
 * Caixa destacada «Não encontra o que procura?».
 * Com `texto`, mostra em vez disso um aviso vindo do Sanity.
 * `semMargem` retira a margem de topo (no portefólio o aviso abre a secção).
 */
export default function Notice({
  texto,
  semMargem = false,
}: {
  texto?: MaybeLText;
  semMargem?: boolean;
}) {
  return (
    <Reveal variant="up">
      <div className={semMargem ? 'notice sem-margem' : 'notice'}>
        {texto ? (
          <Aviso v={texto} />
        ) : (
          <>
            <p>
              <strong>
                <Tx k="area.notice.title" />
              </strong>{' '}
              <Tx k="area.notice.p1" />
            </p>
            <p>
              <Tx k="area.notice.p2" />
            </p>
          </>
        )}
      </div>
    </Reveal>
  );
}
