// `addHook` dentro do plugin aplica o preHandler a toda rota registrada
// nele daqui pra frente, sem repetir `{ preHandler: [...] }` rota por
// rota como na aula 52 — o encapsulamento do plugin limita o alcance.

import Fastify from 'fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';

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
  app.addHook('preHandler', checkSessionIdExists);

  app.get('/', async () =>
  {
    return { transacoes: [] };
  });

  app.get('/resumo', async () =>
  {
    return { resumo: { saldo: 0 } };
  });
}

const application = Fastify({ logger: true });

application.register(cookie);
application.register(transacoesRoutes, { prefix: 'transacoes' });

application.listen({ port: 3346 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3346');
});
