// Plugin = função async que recebe a instância do app e registra rotas
// (ou hooks, decorators) nela. `application.register` isola o plugin
// num escopo próprio, então dá pra dar `prefix` sem tocar nas rotas.

import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

async function transacoesRoutes(app: FastifyInstance)
{
  app.get('/', async () =>
  {
    return { transacoes: [] };
  });
}

const application = Fastify({ logger: true });

application.register(transacoesRoutes, { prefix: 'transacoes' });

application.listen({ port: 3340 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3340 ❤️🚪');
});
