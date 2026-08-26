// Fastify resolve na mão o que a gente fez até aqui no módulo http:
// roteamento, parse de JSON e envio de resposta. Handler async que
// retorna um valor já vira a resposta (serializada em JSON sozinha).

import Fastify from 'fastify';

const application = Fastify({ logger: true });

application.get('/', async () => 
{
  return { ok: true };
});

application.get('/usuarios/:id', async (req) => 
{
  const { id } = req.params as { id: string };
  return { id };
});

application.listen({ port: 3335 }).then(() => 
{
  console.log('servidor ouvindo em http://localhost:3335 ❤️');
});
