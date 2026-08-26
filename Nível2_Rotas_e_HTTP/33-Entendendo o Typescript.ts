// Em vez de dar cast (`as`) no que chega da requisição, dá pra
// descrever o formato esperado via generics do FastifyRequest e
// deixar o compilador (e o editor) avisar quando algo não bate.

import Fastify from 'fastify';
import type { FastifyRequest } from 'fastify';

interface ParamsComId 
{
  id: string;
}

interface CorpoDeUsuario 
{
  nome: string;
  email?: string;
}

const application = Fastify();

application.get('/usuarios/:id', async (req: FastifyRequest<{ Params: ParamsComId }>) => 
{
  return { id: req.params.id };
});

application.post('/usuarios', async (req: FastifyRequest<{ Body: CorpoDeUsuario }>) => 
{
  return { criado: req.body.nome };
});

application.listen({ port: 3336 }).then(() => 
{
  console.log('servidor ouvindo em http://localhost:3336 ❤️');
});
