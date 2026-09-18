# Scryptus 1 — alterações a fazer no site

**Para:** Fábio Rocha
**De:** Ivandro Ribeiro
**Data:** 18 de setembro de 2026
**Base:** o teu ponto de situação de 17/09 + auditoria ao que está em produção em `scryptus.duckdns.org`

Verifiquei o site com browser real, a inspecionar DOM e CSS em produção. Onde indico valores, são os que o site serve. O trabalho está sólido — a maior parte dos pedidos da CAVEX está aplicada e bem. Abaixo vai o que falta, por ordem de impacto, e uma correção ao diagnóstico do formulário que convém ver antes de mexeres em código.

---

## 0. Antes de tudo: repor o git como fonte de verdade

Concordo com a tua nota final. Se o build que a cliente está a rever só existe no VPS, qualquer alteração feita a partir do repositório actual apaga meses de trabalho. Puxa os ficheiros do servidor e faz commit antes de tocar em qualquer um dos pontos abaixo.

---

## 1. O formulário não está partido — não o reescrevas

No ponto 3.3 concluis que o `<form>` tem `action=""` sem mecanismo de envio, e que os pedidos se perdem. A inspeção do DOM em produção mostra outra coisa:

```
method                : POST
action (atributo)     : ""
action (resolvido)    : https://scryptus.duckdns.org/contactos
campos escondidos     : $ACTION_REF_3, $ACTION_3:0, $ACTION_3:1,
                        $ACTION_3:2, $ACTION_KEY, idioma, bot-field
campos                : nome, empresa, email, telefone, area, mensagem
```

Os `$ACTION_*` são a assinatura de uma **Next.js Server Action**. O `action` vazio é o comportamento normal — o React resolve-o em runtime e o POST volta à mesma rota, onde o código corre no servidor. Era por isso que não encontravas handler nos bundles: não está lá, nem deve estar. O `Disallow: /contactos/obrigado` no robots.txt confirma que há redirect de sucesso.

**O que falta verificar é mais estreito:** o que é que essa action faz com os dados. Envia email? Grava no Sanity? As duas coisas? Abre o ficheiro da action e confirma. Se enviar email, precisamos de saber por que serviço e para que caixa — e isso liga-se ao ponto do `info@` que está por confirmar com o Paulo Moreira.

Depois disso, uma submissão de teste real fecha o assunto de vez.

---

## 2. "Um único parceiro, oito áreas" com quatro cartões

É a única queixa da Marlène que continua sem resposta e sem ação, e confirma-se em todas as páginas de área. Em `/areas/grafica`:

> **Um único parceiro, _oito áreas._**
> 02 Agricultura · 03 Têxteis · 04 EPI · 05 Mobiliário

Faltam 06 Informática, 07 Museus e exposições e 08 Outras áreas.

**Correção:** mostrar as sete áreas restantes em vez de quatro. Deve haver um `.slice(0, 4)` algures no componente das áreas relacionadas — tirar o corte e deixar a grelha partir para segunda linha.

Como sete cartões numa grelha de quatro colunas dão 4+3 e fica um vazio à direita, sugiro trocar para colunas automáticas:

```css
grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
```

Assim distribui-se sozinho em qualquer largura. A alternativa — mudar o título para refletir os quatro — resolve a incoerência mas deita fora a mensagem de amplitude, que é justamente o que a frase quer transmitir. Prefiro mostrar as sete.

---

## 3. Falta a frase aprovada na secção de clientes

O "+14" foi removido, e ainda bem. Mas a Marlène aprovou explicitamente a segunda opção, que eram **duas** coisas: seleção fixa de clientes **e** uma formulação de escala que não obrigue a manutenção. Neste momento a grelha acaba em INIDA sem qualquer indicação de escala.

Acrescentar, por baixo da grelha:

> e mais de 20 outras entidades em todas as ilhas

Uma linha discreta sob a grelha lê-se melhor do que uma décima terceira caixa — a caixa volta a parecer um item clicável, que era o problema original do "+14". Confirmo o número com a CAVEX antes de fixares.

---

## 4. Metadados de partilha

Três problemas, todos na mesma família:

**`og:image` só existe em `/` e `/privacidade`.** Falta em `/empresa`, `/portefolio`, `/contactos` e nas oito páginas de área. Partilhar qualquer uma dessas no WhatsApp dá pré-visualização sem imagem — e o WhatsApp é o canal principal em Cabo Verde.

**O URL da imagem aponta para um domínio que ainda não serve o site:** `https://www.scryptus1-caboverde.com/og-imagem.jpg`. Enquanto esse domínio não estiver ativo, a imagem não carrega em lado nenhum, incluindo na homepage onde a meta existe. O mesmo se aplica a todos os `canonical` e `og:url`.

**`og:url` de `/privacidade` aponta para a homepage** em vez da própria página. O `canonical` dessa página está correto, por isso é só a meta social que está trocada.

**Correção:** centralizar com `metadataBase` no layout raiz, alimentado por variável de ambiente, e deixar as páginas declararem caminhos relativos:

```ts
// app/layout.tsx
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: { images: ['/og-imagem.jpg'] },
}
```

Com isto, mudar de domínio passa a ser uma variável e não uma caça a strings espalhadas. Enquanto o domínio definitivo não estiver decidido, aponta a variável para `https://scryptus.duckdns.org` — assim as partilhas funcionam já, em vez de estarem partidas à espera.

---

## 5. Fechar a indexação enquanto o site está em revisão

O `robots.txt` em produção diz:

```
User-Agent: *
Allow: /
Disallow: /studio
Disallow: /contactos/obrigado

Sitemap: https://www.scryptus1-caboverde.com/sitemap.xml
```

Dois problemas. O site de revisão está **aberto à indexação**: o Google pode indexar `scryptus.duckdns.org` e, quando o domínio definitivo entrar, os dois competem entre si nos resultados. E o `Sitemap:` aponta para um domínio diferente daquele onde o robots.txt está servido, o que os motores ignoram.

**Correção:** tornar o robots dependente do ambiente e acrescentar cabeçalho, que é o que realmente impede a indexação mesmo que alguém partilhe o link:

```ts
// app/robots.ts
const isProd = process.env.NEXT_PUBLIC_SITE_URL?.includes('scryptus1-caboverde.com')
export default function robots() {
  return isProd
    ? { rules: { userAgent: '*', allow: '/', disallow: ['/studio'] },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: '*', disallow: '/' } }
}
```

E no `next.config`, enquanto não for produção, `X-Robots-Tag: noindex, nofollow` para todas as rotas.

---

## 6. Confirmar que o `/studio` está protegido

O Sanity Studio está alojado no próprio site e só aparece bloqueado por `robots.txt`. Isso não é proteção — é um pedido aos motores de busca, que qualquer pessoa ignora escrevendo o endereço. Confirma que exige autenticação e que só as contas certas têm acesso ao dataset de produção.

---

## 7. Ligações sem destino

No rodapé de todas as páginas:

```html
<a href="#">f</a>  <a href="#">ig</a>  <a href="#">in</a>
```

Além de não irem a lado nenhum, aparecem como texto de duas letras em vez de ícones. Ou recebem os endereços reais das páginas da Scryptus, ou saem. Vou pedir os endereços à CAVEX; se não existir presença nas redes, retiramos.

Desapareceu também o link **"Ver no mapa"** do rodapé, e em `/contactos` a morada é texto simples. Convém repor, com ligação ao Google Maps da Rua da Cruz Vermelha.

---

## 8. Imagem do herói

É a única imagem real do site, e está a ser servida a **308×489 px num espaço de 338×505**. Ou seja, abaixo do tamanho de exibição, e sem versão para ecrãs retina — fica visivelmente suave em Mac e telemóvel, que é onde a maioria vai ver.

O original no Sanity tem 900×484 e está a ser recortado para 305×484, por isso não há pixels suficientes para servir 2×. Não se resolve com `sizes`; precisa de um ficheiro maior. Fica resolvido com a sessão fotográfica, mas convém garantir que os originais entram no Sanity em resolução alta e que o recorte é feito a partir daí.

O `alt` está como `"Scryptus 1"` — genérico. Deve descrever a imagem, tanto para leitores de ecrã como para pesquisa.

---

## 9. Pontos menores

**A animação de entrada demora cerca de três segundos a assentar.** Quem percorre a página depressa vê texto esbatido e cartões por aparecer — cheguei a pensar que era um bug antes de esperar. Vale a pena encurtar a duração e disparar mais cedo, com margem no observer. E respeitar `prefers-reduced-motion`, que além de acessibilidade evita este efeito em máquinas lentas.

**O seletor "PT · EN · FR" não é clicável.** Está de acordo com a decisão de fazermos só português por agora, mas ao cliente parece um elemento avariado. Ou se retira até haver traduções, ou se marca de forma a ler-se como "brevemente". Reparei que o formulário já leva um campo escondido `idioma`, por isso presumo que a estrutura multilingue já esteja prevista — se estiver, diz-me em que estado, porque isso muda o que respondo à CAVEX.

---

## O que está bem e não deve ser mexido

Para não haver dúvidas sobre o que é para manter:

- **Tipografia auto-hospedada.** `deliciousHeavy` em `.otf` e `Carlito` em `.woff2`, ambas servidas pelo site, com fallback local para Arial. Resolveste o problema de a tipografia mudar conforme a máquina do visitante. Fica só um ponto legal por confirmar: a Delicious é do Jos Buivenga (exljbris) e o uso comercial como webfont exige licença comprada — confirma-me se foi adquirida, porque se não foi temos de tratar disso antes de publicar.
- **Botão flutuante de WhatsApp.** SVG a sério, com `aria-label="Falar no WhatsApp"`, a ligar a `wa.me/2389551020`. Conforme.
- **Estrutura de páginas.** As oito áreas, empresa, portefólio, contactos, privacidade e página de obrigado. Completa.
- **Títulos e descrições.** Únicos, corretos e em pt-PT em todas as páginas.
- Todos os pedidos da CAVEX de 31/07: logo maior, ordem do menu, separadores a 14px, barra 18+ removida, rede de parceiros, soluções multimédia, texto de Quem somos, +30 anos em Cabo Verde.

---

## Ordem sugerida

1. Repor o git a partir do VPS
2. Confirmar o que a Server Action faz com os dados
3. "Oito áreas" → mostrar as sete restantes
4. Frase "e mais de 20 outras entidades em todas as ilhas"
5. `metadataBase` e `og:image` em todas as páginas
6. Fechar indexação do domínio de revisão
7. Confirmar autenticação do `/studio`
8. Redes sociais e "Ver no mapa"
9. Animação e seletor de idioma

Os pontos 2, 5 e 6 dependem de decisões que estou a fechar com a CAVEX — o email de destino, o domínio definitivo e os endereços das redes. Assim que tiver respostas, digo-te.

Qualquer coisa, apita.
