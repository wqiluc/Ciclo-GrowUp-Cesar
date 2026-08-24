// A aula 14 leu e parseou o corpo dentro da própria rota. Um
// middleware extrai isso pra fora: qualquer rota passa a receber
// `req.body` já pronto, sem repetir o parsing em cada uma.

import http from 'http';

interface RequisicaoComCorpo extends http.IncomingMessage
{
  body?: any;
}

type Handler = (req: RequisicaoComCorpo, res: http.ServerResponse) => void | Promise<void>;

// Recebe um handler e devolve outro que já populou req.body antes de chamá-lo
function comJson(handler: Handler): Handler
{
  return async (req, res) =>
  {
    const metodoTemCorpo = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH';
    if (!metodoTemCorpo)
    {
      return handler(req, res);
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req)
    {
      chunks.push(chunk);
    }
    const corpo = Buffer.concat(chunks).toString('utf-8');

    try
    {
      req.body = corpo ? JSON.parse(corpo) : {};
    }

    catch
    {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'JSON inválido' }));
      return;
    }

    finally
    {
        return handler(req, res);
    }
  };
}

// Rota já usa req.body direto, sem saber como ele foi parseado
const criarUsuario: Handler = (req, res) =>
{
  console.log('corpo recebido:', req.body);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, usuario: req.body }));
};

const servidor = http.createServer(comJson((req, res) =>
{
  if (req.method === 'POST' && req.url === '/usuarios')
  {
    return criarUsuario(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
}));

const PORTA = 3334;
servidor.listen(PORTA, () =>
{
  console.log(`servidor ouvindo em http://localhost:${PORTA}`);
  console.log(`teste: curl -X POST http://localhost:${PORTA}/usuarios -d '{"nome":"cesar"}' -H 'Content-Type: application/json'`);
});