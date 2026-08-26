// GET /transacoes e GET /transacoes/:id — mesmo par de rotas da aula 25
// (Route e Query parameters), agora delegando a busca pro Knex em vez
// de filtrar array em memória.

import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import knexBuilder from 'knex';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

async function transacoesRoutes(app: FastifyInstance)
{
  app.get('/', async () =>
  {
    const transacoes = await db('transacoes').select('*');
    return { transacoes };
  });

  app.get('/:id', async (req, reply) =>
  {
    const { id } = req.params as { id: string };
    const transacao = await db('transacoes').where('id', id).first();

    if (!transacao)
    {
      return reply.status(404).send({ erro: 'Transação não encontrada' });
    }

    return { transacao };
  });
}

const application = Fastify({ logger: true });

application.register(transacoesRoutes, { prefix: 'transacoes' });

application.listen({ port: 3342 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3342');
});
