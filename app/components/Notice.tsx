'use client';

import type { MaybeLText } from '../i18n/localize';
import { Tx, TxL } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

/**
 * Caixa destacada «Não encontra o que procura?».
 * Com `texto`, mostra em vez disso um aviso vindo do Sanity.
 */
export default function Notice({ texto }: { texto?: MaybeLText }) {
  return (
    <Reveal variant="up">
      <div className="notice">
        {texto ? (
          <p>
            <TxL v={texto} />
          </p>
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
