'use client';

import { useActionState } from 'react';
import { ESTADO_INICIAL, subscreverNewsletter } from '../actions/forms';
import { useLocale } from '../i18n/LanguageProvider';
import { useT } from '../i18n/Tx';

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(subscreverNewsletter, ESTADO_INICIAL);
  const { locale } = useLocale();
  const t = useT();

  return (
    <form action={action}>
      <input type="hidden" name="idioma" value={locale} />
      <p className="hp">
        <label>
          Não preencher <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label htmlFor="nl-email" className="hp">
        {t('footer.news.ph')}
      </label>
      <input
        type="email"
        id="nl-email"
        name="email"
        placeholder={t('footer.news.ph')}
        required
        autoComplete="email"
      />
      <button type="submit" className="sub-btn" disabled={pending}>
        {pending ? t('form.aEnviar') : t('footer.news.btn')}
      </button>
      <p aria-live="polite" style={{ marginTop: '10px', fontSize: '13px' }}>
        {state.estado === 'ok' && <span style={{ color: 'var(--lime)' }}>{t('form.news.ok')}</span>}
        {state.estado === 'erro' && (
          <span style={{ color: '#f0b3a0' }}>
            {state.codigo === 'email' ? t('form.erroEmail') : t('form.news.erro')}
          </span>
        )}
      </p>
    </form>
  );
}
