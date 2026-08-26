// POST /transacoes: crédito soma, débito subtrai — resolvido já na
// gravação, guardando `valor` com sinal. Assim o saldo (aula 50) é só
// somar a coluna, sem precisar checar `tipo` de novo depois.

import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import knexBuilder from 'knex';
import { randomUUID } from 'crypto';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

async function transacoesRoutes(app: FastifyInstance)
{
  app.post('/', async (req, reply) =>
  {
    const { titulo, valor, tipo } = req.body as {
      titulo: string;
      valor: number;
      tipo: 'credito' | 'debito';
    };

    const transacao = 
    {
      id: randomUUID(),
      titulo,
      valor: tipo === 'credito' ? valor : valor * -1,
    };

    await db('transacoes').insert(transacao);

    return reply.status(201).send();
  });
}

const application = Fastify({ logger: true });

application.register(transacoesRoutes, { prefix: 'transacoes' });

application.listen({ port: 3341 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3341 🚪');
});
