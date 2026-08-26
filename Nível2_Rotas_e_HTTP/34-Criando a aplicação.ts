// Rotas organizadas em plugin (application.register), separado da
// criação do servidor — mesmo espírito da aula 21 (separando rotas),
// agora com Fastify cuidando de roteamento e serialização.

import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';

interface Usuario
{
  id: string;
  nome: string;
  email: string;
}

const usuarios: Usuario[] = [];

async function rotasDeUsuarios(app: FastifyInstance)
{
  app.get('/usuarios', async () => usuarios);

  app.post('/usuarios', async (req) =>
  {
    const { nome, email } = req.body as Omit<Usuario, 'id'>;
    const usuario: Usuario = { id: randomUUID(), nome, email };
    usuarios.push(usuario);
    return usuario;
  });

  app.get('/usuarios/:id', async (req, reply) =>
  {
    const { id } = req.params as { id: string };
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario)
    {
      return reply.status(404).send({ erro: 'Usuário não encontrado' });
    }

    return usuario;
  });
}

function construirApp(): FastifyInstance
{
  const application = Fastify({ logger: true });
  application.register(rotasDeUsuarios);
  return application;
}

const application = construirApp();

application.listen({ port: 3337 }).then(() =>
{
  console.log('servidor ouvindo em http://localhost:3337');
});
