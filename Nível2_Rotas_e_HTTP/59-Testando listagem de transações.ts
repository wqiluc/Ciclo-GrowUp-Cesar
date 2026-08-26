// `arrayContaining` + `objectContaining` confere só que a transação
// criada aparece na lista, sem travar em posição, quantidade ou nos
// campos gerados (`id`, `criado_em`) — o mesmo banco é reaproveitado
// entre testes, então outras linhas podem já estar lá.

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
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

  app.get('/transacoes', async () =>
  {
    const transacoes = await db('transacoes').select('*');
    return { transacoes };
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

  test('o usuário consegue listar todas as transações', async () =>
  {
    await request(app.server)
      .post('/transacoes')
      .send({ titulo: 'Salário', valor: 5000, tipo: 'credito' });

    const resposta = await request(app.server).get('/transacoes').expect(200);

    expect(resposta.body.transacoes).toEqual(
      expect.arrayContaining([expect.objectContaining({ titulo: 'Salário', valor: 5000 })]),
    );
  });
});
