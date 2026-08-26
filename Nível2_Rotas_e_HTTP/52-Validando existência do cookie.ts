// `preHandler` roda antes do handler da rota — lugar certo pra barrar
// a requisição cedo, sem duplicar a checagem de cookie em cada rota
// que precisa saber quem é o usuário.

import Fastify from 'fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';

async function checkSessionIdExists(req: FastifyRequest, reply: FastifyReply)
{
  const { session_id: sessionId } = req.cookies;

  if (!sessionId)
  {
    return reply.status(401).send({ erro: 'Não autorizado' });
  }
}

const application = Fastify({ logger: true });

application.register(cookie);

application.get('/transacoes', { preHandler: [checkSessionIdExists] }, async () =>
{
  return { transacoes: [] };
});

application.listen({ port: 3345 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3345 🚪');
});
