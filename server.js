/**
 * Ficheiro de arranque para a extensão Node.js do Plesk (Phusion Passenger).
 *
 * O Passenger precisa de um ficheiro que crie um servidor HTTP — não sabe
 * arrancar o `next start`. Este servidor delega tudo no handler do Next.js,
 * incluindo as páginas já pré-renderizadas no `.next`.
 *
 * No painel do Plesk: Application Startup File → server.js
 *
 * Não passa pelo compilador do Next, por isso é CommonJS puro (o package.json
 * não declara "type": "module").
 */
const { createServer } = require('http');
const next = require('next');

// Produção por defeito: o modo de desenvolvimento só arranca com NEXT_DEV=1,
// para nunca cair em dev por o NODE_ENV não estar definido no painel.
const dev = process.env.NEXT_DEV === '1';
const port = process.env.PORT || 3000;

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`Scryptus 1 a servir em ${port}${dev ? ' (dev)' : ''}`);
    });
  })
  .catch((erro) => {
    console.error('Falha ao arrancar o servidor:', erro);
    process.exit(1);
  });
