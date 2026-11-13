import type {SanityCliente} from '@/sanity/lib/queries'
import type {ClienteItem} from '../components/Clientes'

/**
 * Clientes de referência.
 *
 * Os logótipos (PNG a preto com fundo transparente) vivem em /public/img/clientes.
 * Em 13/11/2026 saíram CM Praia, CM São Vicente e INIDA e entraram Tipografia
 * Santos, DIKOR e Printer Center (pedido da cliente de 12/11). Um logótipo carregado no Sanity sobrepõe-se ao local.
 * Sem nenhum dos dois, o site mostra a sigla — nunca imagens partidas.
 */
export interface ClienteContent {
  nome: string
  nomeCurto: string
  /** Chave do ficheiro em /public/img/clientes e da classe .c-<chave> no CSS. */
  chave: string
  largura: number
  altura: number
}

export const CLIENTES: ClienteContent[] = [
  {nome: 'Banco de Cabo Verde', nomeCurto: 'BCV', chave: 'bcv', largura: 752, altura: 340},
  {nome: 'Banco Comercial do Atlântico', nomeCurto: 'BCA', chave: 'bca', largura: 307, altura: 389},
  {nome: 'Banco BAI Cabo Verde', nomeCurto: 'BAI CV', chave: 'bai', largura: 616, altura: 259},
  {
    nome: 'Ministério da Agricultura e Ambiente',
    nomeCurto: 'Min. Agricultura',
    chave: 'maa',
    largura: 784,
    altura: 256,
  },
  {
    nome: 'Imprensa Nacional de Cabo Verde',
    nomeCurto: 'INCV',
    chave: 'incv',
    largura: 607,
    altura: 303,
  },
  {nome: 'Cabo Verde Telecom', nomeCurto: 'CV Telecom', chave: 'cvt', largura: 693, altura: 168},
  {nome: 'Aeroportos e Segurança Aérea', nomeCurto: 'ASA', chave: 'asa', largura: 629, altura: 175},
  {
    nome: 'Instituto do Emprego e Formação Profissional',
    nomeCurto: 'IEFP',
    chave: 'iefp',
    largura: 713,
    altura: 284,
  },
  {
    nome: 'Correios de Cabo Verde',
    nomeCurto: 'Correios CV',
    chave: 'correios',
    largura: 774,
    altura: 157,
  },
  {
    nome: 'Tipografia Santos',
    nomeCurto: 'Tip. Santos',
    chave: 'tipsantos',
    largura: 640,
    altura: 601,
  },
  {nome: 'DIKOR', nomeCurto: 'DIKOR', chave: 'dikor', largura: 292, altura: 134},
  {
    nome: 'Printer Center',
    nomeCurto: 'Printer Center',
    chave: 'printercenter',
    largura: 359,
    altura: 192,
  },
]

/** O logótipo local de um cliente, procurado pelo nome ou pela sigla. */
function local(nome: string, nomeCurto?: string | null) {
  return CLIENTES.find((c) => c.nome === nome || (nomeCurto && c.nomeCurto === nomeCurto))
}

/** Usa os clientes do Sanity; sem nenhum criado, mostra a lista por defeito. */
export function resolveClientes(
  docs: (SanityCliente | null)[] | null | undefined,
): ClienteItem[] {
  const validos = (docs ?? []).filter((d): d is SanityCliente => Boolean(d?.nome))
  if (validos.length === 0) {
    return CLIENTES.map((c) => ({nome: c.nome, nomeCurto: c.nomeCurto, logo: null, local: c}))
  }
  return validos.map((d) => ({
    nome: d.nome!,
    nomeCurto: d.nomeCurto?.trim() || d.nome!,
    logo: d.logo ?? null,
    local: local(d.nome!, d.nomeCurto) ?? null,
  }))
}
