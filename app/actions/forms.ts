'use server';

import { redirect } from 'next/navigation';
import { hasWriteAccess, writeClient } from '@/sanity/lib/writeClient';

export type CodigoErro = 'campos' | 'email' | 'envio';

export interface FormState {
  estado: 'inicial' | 'ok' | 'erro';
  codigo?: CodigoErro;
}

export const ESTADO_INICIAL: FormState = { estado: 'inicial' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function limpar(valor: FormDataEntryValue | null, max: number): string {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

/**
 * Envia um aviso por email, se as variáveis de ambiente estiverem definidas.
 * Usa a API da Resend por HTTP — sem dependências extra.
 */
async function avisarPorEmail(assunto: string, corpo: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const para = process.env.CONTACT_EMAIL_TO;
  const de = process.env.CONTACT_EMAIL_FROM;
  if (!key || !para || !de) return false;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: de,
        to: para.split(',').map((e) => e.trim()),
        subject: assunto,
        text: corpo,
      }),
    });
    if (!res.ok) {
      console.warn(`[form] envio de email falhou: ${res.status} ${await res.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn('[form] envio de email falhou:', error);
    return false;
  }
}

async function guardar(tipo: string, doc: Record<string, string>): Promise<boolean> {
  if (!hasWriteAccess) return false;
  try {
    await writeClient.create({ _type: tipo, ...doc, recebidoEm: new Date().toISOString() });
    return true;
  } catch (error) {
    console.warn(`[form] gravação no Sanity falhou (${tipo}):`, error);
    return false;
  }
}

/** Pedido de orçamento — grava no Sanity e avisa por email. */
export async function enviarPedido(
  _anterior: FormState,
  formData: FormData,
): Promise<FormState> {
  // Armadilha para robôs: se estiver preenchida, finge que correu bem.
  if (limpar(formData.get('bot-field'), 200) !== '') redirect('/contactos/obrigado');

  const nome = limpar(formData.get('nome'), 120);
  const empresa = limpar(formData.get('empresa'), 160);
  const email = limpar(formData.get('email'), 160);
  const telefone = limpar(formData.get('telefone'), 60);
  const area = limpar(formData.get('area'), 60);
  const mensagem = limpar(formData.get('mensagem'), 5000);
  const idioma = limpar(formData.get('idioma'), 5) || 'pt';

  if (!nome || !email || !mensagem) return { estado: 'erro', codigo: 'campos' };
  if (!EMAIL_RE.test(email)) return { estado: 'erro', codigo: 'email' };

  const guardado = await guardar('pedidoOrcamento', {
    nome,
    empresa,
    email,
    telefone,
    area,
    mensagem,
    idioma,
  });

  const avisado = await avisarPorEmail(
    `Novo pedido de orçamento — ${nome}${empresa ? ` (${empresa})` : ''}`,
    [
      `Nome: ${nome}`,
      `Empresa: ${empresa || '—'}`,
      `Email: ${email}`,
      `Telefone: ${telefone || '—'}`,
      `Área: ${area || '—'}`,
      `Idioma: ${idioma}`,
      '',
      mensagem,
    ].join('\n'),
  );

  if (!guardado && !avisado) {
    console.error(
      '[form] pedido de orçamento perdido: falta SANITY_API_WRITE_TOKEN e/ou configuração de email.',
    );
    return { estado: 'erro', codigo: 'envio' };
  }

  redirect('/contactos/obrigado');
}

/** Subscrição da newsletter. */
export async function subscreverNewsletter(
  _anterior: FormState,
  formData: FormData,
): Promise<FormState> {
  if (limpar(formData.get('bot-field'), 200) !== '') return { estado: 'ok' };

  const email = limpar(formData.get('email'), 160);
  const idioma = limpar(formData.get('idioma'), 5) || 'pt';

  if (!EMAIL_RE.test(email)) return { estado: 'erro', codigo: 'email' };

  const guardado = await guardar('newsletterSubscricao', { email, idioma });
  const avisado = guardado
    ? false
    : await avisarPorEmail('Nova subscrição da newsletter', `Email: ${email}\nIdioma: ${idioma}`);

  if (!guardado && !avisado) return { estado: 'erro', codigo: 'envio' };
  return { estado: 'ok' };
}
