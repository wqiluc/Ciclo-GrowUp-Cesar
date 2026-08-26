// Rodar teste contra o `app.db` de desenvolvimento suja o banco que o
// dev tá olhando na tela. Solução: `NODE_ENV=test` (aula 43 já valida
// esse valor no esquema) aponta pra um arquivo próprio, e `beforeEach`
// zera o schema a cada teste — cada um começa do zero, sem herdar dado
// do teste anterior.

import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { execSync } from 'child_process';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import knexBuilder from 'knex';

const dbFile = process.env.NODE_ENV === 'test' ? './db/test.db' : './db/app.db';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: dbFile },
  useNullAsDefault: true,
});

async function transacoesRoutes(app: FastifyInstance)
{
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

  beforeEach(() =>
  {
    execSync('npx knex migrate:rollback --all');
    execSync('npx knex migrate:latest');
  });

  test('o banco de testes começa vazio', async () =>
  {
    const resposta = await request(app.server).get('/transacoes').expect(200);
    expect(resposta.body.transacoes).toEqual([]);
  });
});
