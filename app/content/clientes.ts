import type {SanityCliente} from '@/sanity/lib/queries'
import type {ClienteItem} from '../components/Clientes'

/**
 * Clientes de referência.
 *
 * Enquanto não houver logótipos carregados no Sanity (documentos «Clientes»),
 * o site mostra a sigla — nunca imagens partidas.
 */
export interface ClienteContent {
  nome: string
  nomeCurto: string
}

export const CLIENTES: ClienteContent[] = [
  {nome: 'Banco de Cabo Verde', nomeCurto: 'BCV'},
  {nome: 'Banco Comercial do Atlântico', nomeCurto: 'BCA'},
  {nome: 'Banco BAI Cabo Verde', nomeCurto: 'BAI CV'},
  {nome: 'Ministério da Agricultura e Ambiente', nomeCurto: 'Min. Agricultura'},
  {nome: 'Câmara Municipal da Praia', nomeCurto: 'CMP'},
  {nome: 'Câmara Municipal do Mindelo', nomeCurto: 'CM Mindelo'},
  {nome: 'Imprensa Nacional de Cabo Verde', nomeCurto: 'INCV'},
  {nome: 'Cabo Verde Telecom', nomeCurto: 'CV Telecom'},
  {nome: 'Aeroportos e Segurança Aérea', nomeCurto: 'ASA'},
  {nome: 'Instituto do Emprego e Formação Profissional', nomeCurto: 'IEFP'},
  {nome: 'Correios de Cabo Verde', nomeCurto: 'Correios CV'},
  {
    nome: 'Instituto Nacional de Investigação e Desenvolvimento Agrário',
    nomeCurto: 'INIDA',
  },
]

/** Usa os clientes do Sanity; sem nenhum criado, mostra a lista por defeito. */
export function resolveClientes(
  docs: (SanityCliente | null)[] | null | undefined,
): ClienteItem[] {
  const validos = (docs ?? []).filter((d): d is SanityCliente => Boolean(d?.nome))
  if (validos.length === 0) {
    return CLIENTES.map((c) => ({nome: c.nome, nomeCurto: c.nomeCurto, logo: null}))
  }
  return validos.map((d) => ({
    nome: d.nome!,
    nomeCurto: d.nomeCurto?.trim() || d.nome!,
    logo: d.logo ?? null,
  }))
}
