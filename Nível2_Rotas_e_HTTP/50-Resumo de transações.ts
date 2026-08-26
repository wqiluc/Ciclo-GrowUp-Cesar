// GET /transacoes/resumo: soma a coluna `valor` inteira no banco
// (`.sum`) em vez de trazer todas as linhas e somar em JS — menos dado
// trafegando, e o cálculo já sai pronto do SQL.

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
  app.get('/resumo', async () =>
  {
    const resumo = await db('transacoes')
      .sum('valor', { as: 'saldo' })
      .first();

    return { resumo };
  });
}

const application = Fastify({ logger: true });

application.register(transacoesRoutes, { prefix: 'transacoes' });

application.listen({ port: 3343 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3343 🚪');
});