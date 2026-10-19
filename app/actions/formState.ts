/**
 * Tipos e estado inicial dos formulários.
 *
 * Ficam fora de forms.ts porque um ficheiro 'use server' só pode exportar
 * funções assíncronas — exportar um objeto de lá rebenta todas as actions.
 */
export type CodigoErro = 'campos' | 'email' | 'envio';

export interface FormState {
  estado: 'inicial' | 'ok' | 'erro';
  codigo?: CodigoErro;
}

export const ESTADO_INICIAL: FormState = { estado: 'inicial' };
