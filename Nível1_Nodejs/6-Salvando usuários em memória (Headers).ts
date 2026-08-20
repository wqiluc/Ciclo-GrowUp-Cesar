// ============================================================
// SALVANDO USUÁRIOS EM MEMÓRIA (HEADERS)
// ============================================================
//
// Na aula anterior criamos rotas de criação e listagem pra
// "tasks". Agora vamos repetir a ideia pra um recurso novo,
// "users", e aproveitar pra falar de HEADERS.
//
// Headers são metadados da requisição/resposta — informações
// que viajam junto com a URL e o body, mas não fazem parte
// deles. Exemplos comuns:
//   - Content-Type => qual o formato do body (json, form, etc)
//   - Authorization => token/credencial de quem tá chamando
//   - User-Agent => de onde veio a requisição (navegador, curl...)
//
// Assim como o body, os headers ficam disponíveis em req.headers
// — só que, diferente do body, eles já chegam prontos (não são
// stream), então não precisamos esperar nenhum evento 'end'.

import http from 'http';

// ------------------------------------------------------------
// "BANCO DE DADOS" EM MEMÓRIA
// ------------------------------------------------------------

type User =
{
  id: string;
  name: string;
};

const users: User[] = [];

// ------------------------------------------------------------
// LENDO O BODY DA REQUISIÇÃO
// ------------------------------------------------------------
//
// Mesma função da aula passada — o body continua sendo stream,
// então continuamos acumulando os chunks até o evento 'end'.

function readRequestBody(req: http.IncomingMessage): Promise<string>
{
  return new Promise((resolve) =>
{
    const buffer: Buffer[] = [];

    req.on('data', (chunk: Buffer) =>
    {
      buffer.push(chunk);
    });

    req.on('end', () =>
    {
      resolve(Buffer.concat(buffer).toString());
    });
  });
}

// ------------------------------------------------------------
// SERVIDOR COM ROTEAMENTO MANUAL
// ------------------------------------------------------------

const server = http.createServer(async (req, res) =>
{
  console.log(`${req.method} ${req.url}`);

  // req.headers é um objeto com todos os headers da requisição,
  // sempre em lowercase (não importa como o cliente mandou).
  // Ex: req.headers['content-type'], req.headers['authorization']

  if (req.method === 'GET' && req.url === '/users')
{
    // Também dá pra ENVIAR headers customizados na resposta, além
    // dos padrões (Content-Type, etc). Aqui mandamos quantos
    // usuários existem sem o cliente precisar ler o body inteiro.
    res.writeHead(200,
    {
      'Content-Type': 'application/json',
      'X-Total-Count': String(users.length),
    });
    res.end(JSON.stringify(users));
    return;
}

  if (req.method === 'POST' && req.url === '/users')
{
    // Validando um header antes de continuar: exigimos que o
    // cliente diga que está mandando JSON. Se não mandar (ou
    // mandar outra coisa), respondemos 415 "Unsupported Media Type".
    const contentType = req.headers['content-type'];

    if (contentType !== 'application/json')
{
      res.writeHead(415, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Content-Type deve ser application/json' }));
      return;
}

    const body = await readRequestBody(req);
    const { name } = JSON.parse(body);

    const user: User =
    {
      id: crypto.randomUUID(), // biblioteca de criptografia
      name,
    };

    users.push(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
}

  // Nenhuma rota bateu => 404 "Not Found"
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
});

const PORT = 3000;

server.listen(PORT, () =>
{
  console.log(`Servidor rodando em http://localhost:${PORT} ✅`);
});

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Com o servidor rodando (npm run dev), teste com curl:
//
//   curl -X POST http://localhost:3000/users\
//     -H "Content-Type: application/json"\
//     -d '{"name":"Lucas"}'
//
//   curl -i http://localhost:3000/users
//   (o -i mostra os headers da resposta, incluindo o X-Total-Count)
//
//   curl -X POST http://localhost:3000/users\
//     -d '{"name":"Sem content-type"}'
//   (sem o header Content-Type => 415)