// Supertest dispara a requisição HTTP direto contra `app.server`, sem
// precisar de `.listen()` numa porta real — o teste sobe e derruba a
// aplicação sozinho, isolado do resto (por isso `beforeAll`/`afterAll`).

import { afterAll, beforeAll, test } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import knexBuilder from 'knex';
import { randomUUID } from 'crypto';

const db = knexBuilder(
{
  client: 'better-sqlite3', // databasetype
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

async function transacoesRoutes(app: FastifyInstance)
{
  app.post('/transacoes', async (req, reply) =>
  {
    const { titulo, valor, tipo } = req.body as 
    {
      titulo: string;
      valor: number;
      tipo: 'credito' | 'debito';
    };

    await db('transacoes').insert(
    {
      id: randomUUID(),
      titulo,
      valor: tipo === 'credito' ? valor : valor * -1,
    });

    return reply.status(201).send();
  });
}

const app= Fastify();
app.register(transacoesRoutes);

beforeAll(async () =>
{
  await app.ready();
});

afterAll(async () =>
{
  await app.close();
});

test('o Usuário consegue criar uma nova transação!', async () =>
{
  await request(app.server)
    .post('/transacoes')
    .send({ titulo: 'Salário', valor: 5000, tipo: 'credito' })
    .expect(201);
});
