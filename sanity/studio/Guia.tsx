/**
 * Primeiro painel do Studio: explica, em linguagem simples, onde se muda
 * cada parte do site e o que acontece quando se publica.
 */
const SECCOES: {titulo: string; texto: string}[] = [
  {
    titulo: 'Página inicial',
    texto:
      'O topo com a fotografia, a secção «A nossa oferta» e o bloco «Sobre» com o armazém.',
  },
  {
    titulo: 'Áreas de negócio',
    texto:
      'As oito áreas: nome, texto do cartão, fotografia e a lista de produtos de cada uma. A fotografia serve o cartão da página inicial e o topo da página da área.',
  },
  {
    titulo: 'Clientes',
    texto: 'Os logótipos da secção «Quem confia em nós». A «Ordem» decide quem aparece primeiro.',
  },
  {
    titulo: 'Páginas',
    texto: 'Empresa, portefólio, contactos e política de privacidade.',
  },
  {
    titulo: 'Caixa de entrada',
    texto:
      'Os pedidos de orçamento e as subscrições da newsletter que chegam pelo site. Só para consulta.',
  },
  {
    titulo: 'Definições do site',
    texto: 'Telefone, WhatsApp, email, morada, horário e redes sociais (rodapé e contactos).',
  },
]

const DICAS = [
  'Nada muda no site enquanto não carregar em «Publicar».',
  'O português é obrigatório. Inglês e francês são opcionais: vazios, o site mostra o português.',
  'Num título, o que estiver entre *asteriscos* aparece em verde-lima.',
  'Fotografias: carregue o original, sem cortar nem reduzir. Use o ponto de interesse (hotspot) para escolher o que fica sempre visível.',
  'Uma alteração publicada aparece no site em poucos segundos. Se não aparecer, recarregue a página.',
]

const verde = '#3d6647'
const cartao = {
  background: 'var(--card-bg-color, #fff)',
  border: '1px solid var(--card-border-color, #e1dfd6)',
  borderRadius: 18,
  padding: '18px 20px',
}

export function Guia() {
  return (
    <div style={{padding: '32px 28px 48px', maxWidth: 760, fontFamily: 'inherit', lineHeight: 1.55}}>
      <p style={{margin: 0, color: '#598946', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase'}}>
        Scryptus 1 · gestão do site
      </p>
      <h1 style={{margin: '10px 0 8px', fontSize: 28, lineHeight: 1.15}}>Bem-vindo. O que quer mudar hoje?</h1>
      <p style={{margin: '0 0 28px', opacity: 0.7, fontSize: 15}}>
        Escolha uma secção no menu à esquerda. Cada uma corresponde a uma parte do site.
      </p>

      <div style={{display: 'grid', gap: 12}}>
        {SECCOES.map((s) => (
          <div key={s.titulo} style={cartao}>
            <strong style={{display: 'block', fontSize: 16, marginBottom: 4, color: verde}}>{s.titulo}</strong>
            <span style={{fontSize: 14, opacity: 0.75}}>{s.texto}</span>
          </div>
        ))}
      </div>

      <div style={{...cartao, marginTop: 24, background: 'rgba(168, 212, 32, 0.12)', borderColor: 'rgba(89, 137, 70, 0.35)'}}>
        <strong style={{display: 'block', fontSize: 16, marginBottom: 8}}>Bom saber</strong>
        <ul style={{margin: 0, paddingLeft: 18, fontSize: 14, display: 'grid', gap: 6}}>
          {DICAS.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
