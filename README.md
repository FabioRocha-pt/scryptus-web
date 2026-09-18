# Scryptus 1 — site institucional

Site da Scryptus 1 (Praia, Cabo Verde), em Next.js 16 (App Router) com Sanity Studio integrado
em `/studio`. Trilingue PT · EN · FR, com troca de idioma no cabeçalho.

## Arrancar

```bash
npm install
cp .env.example .env.local   # preencher as variáveis
npm run dev                  # http://localhost:3000
```

Outros comandos: `npm run build`, `npm run start`, `npm run lint`.

## Variáveis de ambiente

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sim | Projeto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | sim | Normalmente `production` |
| `NEXT_PUBLIC_SITE_URL` | sim | Domínio público (sitemap, canónicos, Open Graph) |
| `SANITY_API_WRITE_TOKEN` | para os formulários | Token «Editor» que grava os pedidos de orçamento e as subscrições |
| `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` | opcional | Aviso por email de cada pedido |

Ver `.env.example`. O token de escrita **não** pode ter o prefixo `NEXT_PUBLIC_`.

## Como está organizado

```
app/
  layout.tsx          fontes, metadata base
  (site)/             páginas do site (com cabeçalho, rodapé e WhatsApp)
    page.tsx          início
    empresa/ portefolio/ contactos/ contactos/obrigado/ privacidade/
    areas/[slug]/     as 8 áreas de negócio
  studio/             Sanity Studio, sem o CSS nem a navegação do site
  components/         componentes de UI (todos os blocos das páginas)
  content/            conteúdo por defeito em português + funções de resolução
  i18n/               textos de interface PT/EN/FR e o efeito de scramble
  actions/forms.ts    server actions dos formulários
  sitemap.ts robots.ts
sanity/
  schemaTypes/        schemas (objetos, singletons, coleções, submissões)
  lib/                cliente, imagens, consultas GROQ, escrita
```

### Conteúdo: código + Sanity

O português está no código (`app/content/*`) e o Sanity **sobrepõe-se quando preenchido**:
qualquer campo vazio no Studio faz o site cair no texto por defeito. Por isso o site funciona
com o dataset vazio e nunca mostra páginas em branco nem imagens partidas — sem imagem, aparece
a legenda sugerida sobre o gradiente verde.

- **Interface** (menus, botões, etiquetas de formulário): `app/i18n/translations.ts`, nos três idiomas.
- **Conteúdo editorial** (áreas, empresa, privacidade): `app/content/*` + campos `pt/en/fr` no Studio.
  Se o EN ou o FR estiverem vazios, mostra-se o PT.
- Nos títulos das páginas interiores, o que está entre `*asteriscos*` aparece em verde-lima.

### O que se edita no Studio (`/studio`)

Definições do site · Início (Herói, A nossa oferta, Sobre) · Conhecer a empresa · Portefólio ·
Contactos · Política de privacidade · Áreas de negócio (8) · Clientes · e a caixa de entrada com
os **Pedidos de orçamento** e as **subscrições da newsletter**.

## Formulários

`app/actions/forms.ts` grava cada pedido como documento no Sanity e, se as variáveis da Resend
estiverem definidas, envia também um email. Tem armadilha para robôs, validação e reencaminha
para `/contactos/obrigado`. Sem `SANITY_API_WRITE_TOKEN` nem email configurado, o formulário
mostra uma mensagem de erro em vez de perder o pedido em silêncio.

## Deploy

No VPS Hetzner + Plesk (extensão Node.js / Passenger): ver **`DEPLOY-PLESK.md`**.
O arranque é o `server.js`; testa-se localmente com `npm run build && npm run start:passenger`.

### Vercel (alternativa)

1. Importar o repositório no Vercel (preset Next.js, sem configuração extra).
2. Definir as variáveis de ambiente, com `NEXT_PUBLIC_SITE_URL` a apontar para o domínio final.
3. Em [sanity.io/manage](https://sanity.io/manage) → API → **CORS origins**, autorizar o domínio
   do site (e o de pré-visualização do Vercel) com credenciais, para o Studio funcionar em
   `/studio`.
4. Ligar o domínio e confirmar `/sitemap.xml`, `/robots.txt` e os redirects dos endereços
   antigos (`/grafica.html` → `/areas/grafica`), definidos em `next.config.ts`.

Falta ainda material do cliente (imagens, logótipos, acessos): ver `RELATORIO-CLIENTE.md`.
