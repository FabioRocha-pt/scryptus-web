# Deploy no Plesk (extensão Node.js / Passenger)

Testado com Next.js 16.2.9 e Node 24. O arranque é feito por `server.js`, porque o Passenger
precisa de um ficheiro que crie o servidor HTTP — não sabe correr `next start`.

## 1. Node.js no domínio

Painel do domínio → **Node.js**:

| Campo | Valor |
| --- | --- |
| Node.js version | **20.9 ou superior** (o Next 16 exige; ideal 22 LTS) |
| Document Root | `/httpdocs` (o habitual) |
| Application Root | a pasta onde o Git faz pull (ex. `/httpdocs`) |
| Application Startup File | **`server.js`** |
| Application Mode | `production` |

## 2. Variáveis de ambiente — antes do build

Em **Custom environment variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=c1gufx1v
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://www.scryptus1-caboverde.com
SANITY_API_WRITE_TOKEN=<token com permissão Editor>
```

Opcional, para receber cada pedido também por email (resend.com):

```
RESEND_API_KEY=...
CONTACT_EMAIL_TO=info@scryptus1-caboverde.com
CONTACT_EMAIL_FROM=site@scryptus1-caboverde.com
```

> **Isto não é opcional nem adiável:** `sanity/env.ts` atira erro se o projeto ou o dataset
> faltarem, e as variáveis `NEXT_PUBLIC_*` ficam **gravadas dentro do bundle durante o build**.
> Se fizeres o build sem elas, não basta acrescentá-las e reiniciar — tens de voltar a fazer build.
> `.env.local` está no `.gitignore`, portanto ou usas o painel ou crias o ficheiro no servidor.

## 3. Instalar e compilar

Pela ordem, no painel Node.js:

1. **NPM install** — atenção: se `NODE_ENV=production` estiver definido, o npm **salta as
   devDependencies** e o build falha por falta de `typescript` e `@tailwindcss/postcss`.
   Se isso acontecer, corre por SSH na pasta da app:
   ```bash
   npm ci --include=dev
   ```
2. **Run script → `build`** (equivale a `next build`).
3. **Restart App**.

Precisa de ~1 GB de RAM livre para compilar. Num plano apertado, faz o build localmente ou em CI
e envia `.next` juntamente com o código.

## 4. Depois do primeiro deploy

1. **CORS do Sanity** — [sanity.io/manage](https://sanity.io/manage) → API → **CORS origins**:
   acrescentar `https://www.scryptus1-caboverde.com` com *Allow credentials*, senão o Studio em
   `/studio` não consegue autenticar.
2. Confirmar `/sitemap.xml` e `/robots.txt` já com o domínio real (saem de `NEXT_PUBLIC_SITE_URL`).
3. Confirmar um redirect antigo: `/grafica.html` deve responder 301 para `/areas/grafica`.
4. Abrir `/studio`, entrar e confirmar que aparecem todas as secções.
5. Submeter um pedido de teste em `/contactos` e confirmar que aparece em **Pedidos de orçamento**.

## 5. Deploys seguintes

Pull do Git → **NPM install** (só se o `package-lock.json` mudou) → **Run script `build`** →
**Restart App**. Alterações feitas apenas no Studio aparecem sem novo deploy.

## Notas

- `server.js` corre sempre em produção; só arranca em modo de desenvolvimento com `NEXT_DEV=1`.
- Não usar `output: 'standalone'` no `next.config.ts` — é incompatível com o servidor
  personalizado que o Passenger precisa.
- O `sharp` já está nas dependências, portanto a otimização de imagens do Next funciona no VPS
  sem mais nada.
- Testar localmente o mesmo arranque do Plesk: `npm run build && npm run start:passenger`.
