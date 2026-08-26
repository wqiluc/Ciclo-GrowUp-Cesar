// Query builder no lugar do array em memória das aulas anteriores:
// `db('tabela')` monta o SQL, `await` executa e devolve as linhas.

import Fastify from 'fastify';
import knexBuilder from 'knex';
import { randomUUID } from 'crypto';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

const application = Fastify({ logger: true });

application.get('/transacoes', async () =>
{
  return db('transacoes').select('*');
});

application.post('/transacoes', async (req) =>
{
  const { titulo, valor } = req.body as { titulo: string; valor: number };
  const transacao = { id: randomUUID(), titulo, valor };

  await db('transacoes').insert(transacao);

  return transacao;
});

application.listen({ port: 3338 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3338');
});
