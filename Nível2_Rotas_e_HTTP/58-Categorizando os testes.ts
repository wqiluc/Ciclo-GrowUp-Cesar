// `describe` agrupa testes relacionados sob uma mesma categoria no
// relatório. Os hooks declarados dentro dele valem só pros testes
// daquele grupo — mesmo princípio de encapsulamento do hook de plugin
// da aula 53, agora aplicado à suíte de testes.

import { afterAll, beforeAll, describe, test } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import knexBuilder from 'knex';
import { randomUUID } from 'crypto';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

async function transacoesRoutes(app: FastifyInstance)
{
  app.post('/transacoes', async (req, reply) =>
  {
    const { titulo, valor, tipo } = req.body as {
      titulo: string;
      valor: number;
      tipo: 'credito' | 'debito';
    };

    await db('transacoes').insert({
      id: randomUUID(),
      titulo,
      valor: tipo === 'credito' ? valor : valor * -1,
    });

    return reply.status(201).send();
  });
}

const app = Fastify();
app.register(transacoesRoutes);

describe('Transações', () =>
{
  beforeAll(async () =>
  {
    await app.ready();
  });

  afterAll(async () =>
  {
    await app.close();
  });

  test('o usuário consegue criar uma nova transação', async () =>
  {
    await request(app.server)
      .post('/transacoes')
      .send({ titulo: 'Salário', valor: 5000, tipo: 'credito' })
      .expect(201);
  });
});
