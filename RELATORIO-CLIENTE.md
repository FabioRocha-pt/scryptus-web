# Scryptus 1 — o que falta para pôr o site online

O site está completo e a funcionar: todas as páginas, textos, listas de produtos e formulários
já estão feitos, e tudo é editável na área de administração (o *Studio*). Falta apenas o
material que só a Scryptus 1 pode fornecer.

Enquanto uma imagem não for carregada, o site mostra no lugar dela uma caixa verde com a
sugestão do que ali deve entrar — nunca aparecem imagens partidas. O mesmo vale para os textos:
o que estiver vazio no Studio usa automaticamente o texto já escrito.

---

## 1. Imagens

Todas se carregam no Studio, em `/studio`. Formato preferido: JPG de boa qualidade, com pelo
menos o dobro do tamanho indicado (o site trata do resto: recorte, compressão e versões para
telemóvel).

### Página inicial

| Onde | Formato | Sugestão | Documento no Studio |
| --- | --- | --- | --- |
| Imagem principal do topo (pílula grande) | vertical 2:3 (ex. 1200×1800) | Estufa em produção, com folhagem tropical de Cabo Verde | Início · Herói |
| Imagem secundária (pílula pequena) | vertical 7:10 (ex. 700×1000) | Produto em cena, ou detalhe de máquina | Início · Herói |
| Fotografia da secção «Quem somos» | vertical 2:3 | Armazém na Rua da Cruz Vermelha, de preferência com pessoas | Início · Sobre |

### As oito áreas de negócio

Cada área precisa de **duas** imagens (documento «Áreas de negócio», uma por área):

| Área | Imagem do cartão (4:5) | Imagem de destaque (16:7) |
| --- | --- | --- |
| 01 Gráfica | Prensa offset | Prensa offset em funcionamento |
| 02 Agricultura | Estufa em produção | Estufa em produção |
| 03 Têxteis | Vestuário de trabalho | Vestuário de trabalho |
| 04 EPI | EPI em uso | EPI em utilização |
| 05 Mobiliário | Auditório ou sala equipada | Sala de reuniões equipada |
| 06 Informática | Sala de servidores | Bastidor de rede |
| 07 Museus e exposições | Vitrina de museu | Vitrina de museu |
| 08 Outras áreas | Gerador + material escolar | Gerador industrial |

Se houver fotografias de projetos reais da empresa, são muito preferíveis a imagens de banco.

### Identidade e partilha

| Item | Formato | Onde entra |
| --- | --- | --- |
| Ícone do site (favicon) | quadrado, 512×512 PNG | Ficheiro do projeto (`app/favicon.ico`) |
| Imagem de partilha (WhatsApp, Facebook, LinkedIn) | 1200×630 | Studio → Definições do site → Imagem de partilha |

O logótipo Scryptus 1 já está no site em vetor (desenha-se perfeitamente em qualquer tamanho).

## 2. Logótipos dos clientes

Doze clientes já estão listados; enquanto não houver logótipo, aparece a sigla. Ideal: **SVG**;
em alternativa, PNG com fundo transparente (≈366×220). No site aparecem a cinzento e ganham cor
quando o rato passa por cima.

Banco de Cabo Verde (BCV) · Banco Comercial do Atlântico (BCA) · BAI Cabo Verde ·
Ministério da Agricultura e Ambiente · Câmara Municipal da Praia · Câmara Municipal do Mindelo ·
Imprensa Nacional de Cabo Verde · Cabo Verde Telecom · ASA · IEFP · Correios de Cabo Verde ·
INIDA.

**A confirmar:** podemos usar publicamente estes logótipos e nomes como referências de cliente?
Se algum não puder ser mostrado, basta indicar — e pode ser substituído por outro.

## 3. Acessos e configuração técnica

| O que é preciso | Porquê |
| --- | --- |
| **Domínio** (ex. `scryptus1-caboverde.com`) e acesso ao DNS | Ligar o site ao endereço definitivo |
| **Token de escrita do Sanity** (`SANITY_API_WRITE_TOKEN`) | Sem ele os pedidos de orçamento e as subscrições da newsletter não ficam guardados |
| **Email para onde enviar os pedidos** | Receber cada pedido de orçamento também por email, além de ficar no Studio |
| Contas de **Facebook, Instagram e LinkedIn** | O rodapé mostra apenas os ícones das redes que tiverem endereço |
| Lista de emails para quem administra o Studio | Convites de acesso à área de administração |

## 4. Conteúdo a confirmar ou completar

1. **Traduções EN/FR das listas de produtos.** Os títulos, as introduções e toda a interface já
   estão nos três idiomas. As listas de produtos (cerca de 200 designações técnicas) estão só em
   português: os campos EN/FR já existem no Studio à espera da terminologia correta da empresa.
2. **Política de privacidade.** O texto está redigido em português e precisa de validação —
   é um documento legal. As versões EN/FR devem ser confirmadas pela Scryptus 1.
3. **Dados da empresa a confirmar:** razão social completa, morada, telefone `(+238) 264 76 07`,
   WhatsApp `(+238) 955 10 20`, email `info@scryptus1-caboverde.com`, horário
   (segunda a sexta, 08h00–13h00 e 14h00–17h00) e o link do mapa.
4. **Números da barra de destaque:** «18+ anos no mercado», «8 áreas de negócio», «+30 anos do
   grupo em Cabo Verde». Confirmar se são os valores a usar em 2026.
5. **Percurso da empresa** (2008, 2014, 2022, 2024, 2026): confirmar datas e descrições.
6. **Ano no rodapé:** está «© 2026».

## 5. Como editar o site

A área de administração fica em **`<endereço-do-site>/studio`**. Do lado esquerdo estão as
secções:

- **Definições do site** — contactos, morada, horário, redes sociais, imagem de partilha.
  Alterar aqui muda em todas as páginas ao mesmo tempo.
- **Início** (Herói · A nossa oferta · Sobre) — imagens e textos da página inicial.
- **Conhecer a empresa**, **Portefólio completo**, **Contactos**, **Política de privacidade** —
  uma entrada por página.
- **Áreas de negócio** — as oito áreas: título, introdução, imagens e listas de produtos
  (organizadas por subcategoria, exatamente como aparecem no site).
- **Clientes** — nome, sigla e logótipo.
- **Pedidos de orçamento** e **Newsletter** — tudo o que chega pelos formulários do site.

Cada campo de texto tem três caixas: **Português**, **English** e **Français**. Só o português é
necessário; os outros dois, se ficarem vazios, mostram automaticamente o português. Nos títulos
das páginas interiores, o que estiver entre `*asteriscos*` aparece destacado em verde-lima
(exemplo: `Peça o seu *orçamento.*`).

---

## Resumo — checklist para enviar ao cliente

- [ ] 3 imagens da página inicial (herói, secundária, armazém)
- [ ] 16 imagens das áreas de negócio (2 por área)
- [ ] Favicon 512×512 e imagem de partilha 1200×630
- [ ] Logótipos dos 12 clientes (SVG ou PNG transparente) + autorização de uso
- [ ] Domínio e acesso ao DNS
- [ ] Token de escrita do Sanity e email de destino dos pedidos
- [ ] Endereços das redes sociais
- [ ] Traduções EN/FR das listas de produtos
- [ ] Validação da política de privacidade
- [ ] Confirmação dos contactos, horário, números e datas do percurso
