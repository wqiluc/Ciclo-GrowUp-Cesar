// Fecha os 4 RF da aula 45. O `session_id` sai do header `set-cookie`
// da resposta de criação e é reenviado nas próximas requisições — sem
// ele, o hook global da aula 53 barraria com 401, igual bloquearia um
// cliente real sem cookie.

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import request from 'supertest';
import cookie from '@fastify/cookie';
import knexBuilder from 'knex';
import { randomUUID } from 'crypto';

const db = knexBuilder({
  client: 'better-sqlite3',
  connection: { filename: './db/app.db' },
  useNullAsDefault: true,
});

async function checkSessionIdExists(req: FastifyRequest, reply: FastifyReply)
{
  const { session_id: sessionId } = req.cookies;

  if (!sessionId)
  {
    return reply.status(401).send({ erro: 'Não autorizado' });
  }
}

async function transacoesRoutes(app: FastifyInstance)
{
  // POST não passa pelo preHandler: é aqui que a sessão nasce (aula 51),
  // igual acontecia no arquivo daquela aula. GET só lê — precisa da
  // sessão já existir (aula 52/53).
  app.post('/', async (req, reply) =>
  {
    let { session_id: sessionId } = req.cookies;

    if (!sessionId)
    {
      sessionId = randomUUID();
      reply.cookie('session_id', sessionId, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    }

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

  app.get('/', { preHandler: [checkSessionIdExists] }, async () =>
  {
    return { transacoes: await db('transacoes').select('*') };
  });

  app.get('/resumo', { preHandler: [checkSessionIdExists] }, async () =>
  {
    return { resumo: await db('transacoes').sum('valor', { as: 'saldo' }).first() };
  });
}

const app = Fastify();
app.register(cookie);
app.register(transacoesRoutes, { prefix: 'transacoes' });

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
    const resposta = await request(app.server)
      .post('/transacoes')
      .send({ titulo: 'Salário', valor: 5000, tipo: 'credito' })
      .expect(201);

    expect(resposta.get('Set-Cookie')?.[0]).toMatch(/session_id=/);
  });

  test('sem cookie de sessão, a requisição é barrada', async () =>
  {
    await request(app.server).get('/transacoes').expect(401);
  });

  test('o usuário consegue listar suas transações', async () =>
  {
    const criacao = await request(app.server)
      .post('/transacoes')
      .send({ titulo: 'Aluguel', valor: 1100, tipo: 'debito' });

    const cookies = criacao.get('Set-Cookie')!;

    const listagem = await request(app.server)
      .get('/transacoes')
      .set('Cookie', cookies)
      .expect(200);

    expect(listagem.body.transacoes).toEqual(
      expect.arrayContaining([expect.objectContaining({ titulo: 'Aluguel', valor: -1100 })]),
    );
  });

  test('o usuário consegue ver o resumo da conta', async () =>
  {
    const criacao = await request(app.server)
      .post('/transacoes')
      .send({ titulo: 'Freela', valor: 300, tipo: 'credito' });

    const resposta = await request(app.server)
      .get('/transacoes/resumo')
      .set('Cookie', criacao.get('Set-Cookie')!)
      .expect(200);

    expect(resposta.body.resumo).toEqual(expect.objectContaining({ saldo: expect.any(Number) }));
  });
});
