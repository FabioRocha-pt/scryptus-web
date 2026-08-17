'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import type { LText } from '@/sanity/lib/queries';
import { ESTADO_INICIAL, enviarPedido } from '../actions/forms';
import { useLocale } from '../i18n/LanguageProvider';
import type { MaybeLText } from '../i18n/localize';
import { Tx, TxAccent, useL, useT } from '../i18n/Tx';
import { Reveal } from './motion/Reveal';

export interface AreaOpcao {
  slug: string;
  tituloCurto: LText;
}

export default function ContactForm({
  areas,
  titulo,
}: {
  areas: AreaOpcao[];
  titulo?: MaybeLText;
}) {
  const [state, action, pending] = useActionState(enviarPedido, ESTADO_INICIAL);
  const params = useSearchParams();
  const { locale } = useLocale();
  const t = useT();
  const l = useL();

  // A área pode vir pré-selecionada por ?area=grafica (links «Pedir orçamento»)
  const pedida = params.get('area') ?? '';
  const valida = areas.some((a) => a.slug === pedida) || ['varias', 'outro'].includes(pedida);
  const areaInicial = valida ? pedida : '';

  const mensagemErro =
    state.codigo === 'campos'
      ? t('form.erroCampos')
      : state.codigo === 'email'
        ? t('form.erroEmail')
        : t('form.erroEnvio');

  return (
    <div>
      <Reveal variant="up">
        <span className="eyebrow">
          <Tx k="form.eyebrow" />
        </span>
        <h2 style={{ margin: '18px 0 34px' }}>
          <TxAccent v={titulo} />
        </h2>
      </Reveal>

      <form action={action} className="form-grid">
        <input type="hidden" name="idioma" value={locale} />
        <p className="hp">
          <label>
            Não preencher este campo <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        {state.estado === 'erro' && (
          <p className="form-msg erro" role="alert">
            {mensagemErro}
          </p>
        )}

        <div className="field">
          <label htmlFor="nome">
            <Tx k="form.nome" /> <span className="req">*</span>
          </label>
          <input type="text" id="nome" name="nome" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="empresa">
            <Tx k="form.empresa" />
          </label>
          <input type="text" id="empresa" name="empresa" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="email">
            <Tx k="form.email" /> <span className="req">*</span>
          </label>
          <input type="email" id="email" name="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="telefone">
            <Tx k="form.telefone" />
          </label>
          <input type="tel" id="telefone" name="telefone" autoComplete="tel" />
        </div>
        <div className="field wide">
          <label htmlFor="area">
            <Tx k="form.area" />
          </label>
          <select id="area" name="area" key={areaInicial} defaultValue={areaInicial}>
            <option value="">{t('form.areaVazia')}</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {l(area.tituloCurto)}
              </option>
            ))}
            <option value="varias">{t('form.areaVarias')}</option>
            <option value="outro">{t('form.areaOutro')}</option>
          </select>
        </div>
        <div className="field wide">
          <label htmlFor="mensagem">
            <Tx k="form.mensagem" /> <span className="req">*</span>
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            required
            placeholder={t('form.mensagemPh')}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-lime" disabled={pending}>
            {pending ? t('form.aEnviar') : t('form.enviar')}
          </button>
          <span className="hint">{t('form.obrigatorios')}</span>
        </div>
      </form>
    </div>
  );
}
