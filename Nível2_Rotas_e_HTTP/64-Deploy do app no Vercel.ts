// Vercel roda funções serverless: cada request instancia a function do
// zero, não um processo com `app.listen` de pé o tempo todo. Fastify se
// encaixa nisso expondo `app.server`, o `http.Server` cru por baixo —
// dá pra injetar (req, res) direto nele em vez de escutar uma porta.
//
// `vercel.json` na raiz do projeto:
// {
//   "version": 2,
//   "builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
//   "routes": [{ "src": "/(.*)", "dest": "api/index.ts" }]
// }
//
// Isso é só o build/config — publicar de fato é `vercel --prod`
// (precisa da CLI logada na conta), fora do escopo daqui.

import type { IncomingMessage, ServerResponse } from 'http';
import Fastify from 'fastify';

const app = Fastify();

app.get('/', async () => ({ status: 'ok' }));

export default async function handler(req: IncomingMessage, res: ServerResponse)
{
  await app.ready();
  app.server.emit('request', req, res);
}
