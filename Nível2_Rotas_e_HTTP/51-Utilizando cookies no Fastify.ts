// Cookie = jeito de identificar o usuário sem login/senha (RNF da aula
// 45): o servidor gera um `session_id` na primeira visita, o navegador
// devolve ele em toda requisição seguinte.
//
// `npm i @fastify/cookie`

import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import { randomUUID } from 'crypto';

const application = Fastify({ logger: true });

application.register(cookie);

application.post('/transacoes', async (req, reply) =>
{
  let { session_id: sessionId } = req.cookies;

  if (!sessionId)
  {
    sessionId = randomUUID();

    reply.cookie('session_id', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias, em segundos
    });
  }

  return reply.status(201).send();
});

application.listen({ port: 3344 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3344 🚪');
});
