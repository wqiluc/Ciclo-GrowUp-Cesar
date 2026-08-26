// ============================================================
// ROTAS DE CRIAÇÃO E LISTAGEM (MÉTODOS HTTP)
// ============================================================
//
// Até agora nosso servidor respondia sempre a mesma coisa, não
// importava a URL ou o método usado. Uma API de verdade precisa
// diferenciar as requisições para saber o que fazer — isso é
// "rotear" (routing).
//
// Duas informações do req são usadas pra decidir a rota:
//   - req.method => o verbo HTTP (GET, POST, PUT, DELETE, ...)
//   - req.url => o caminho pedido (ex: "/tasks")
//
// Convenção REST mais comum:
//   GET    /tasks => LISTAR os registros
//   POST   /tasks => CRIAR um novo registro
//   Patch  /tasks => ATUALIZAR um novo usuário
//.  Delete /taks => DELETAR um usuário/registro
// Como ainda não usamos nenhuma biblioteca (tipo Express), toda
// essa lógica de "olhar method + url e decidir o que fazer" é
// feita na mão dentro do handler do createServer().

import http from 'http';

// ------------------------------------------------------------
// "BANCO DE DADOS" EM MEMÓRIA
// ------------------------------------------------------------
//
// Sem banco de dados ainda, então guardamos as tasks num array
// simples, em memória. Isso significa que os dados somem toda
// vez que o servidor reinicia (lembra do --watch da aula
// anterior? cada restart zera esse array de novo).

type Task = 
{
  id: string;
  title: string;
};

const tasks: Task[] = [];

// ------------------------------------------------------------
// LENDO O BODY DA REQUISIÇÃO
// ------------------------------------------------------------
//
// Diferente do req.url e req.method, que já chegam prontos, o
// BODY da requisição (o JSON que o cliente manda num POST) chega
// aos poucos, em pedaços (chunks) — porque req é um STREAM.
//
// Por isso precisamos:
//   1) escutar o evento 'data' pra ir acumulando cada pedaço
//   2) escutar o evento 'end' pra saber quando o body terminou
//      de chegar e já podemos usá-lo (nesse caso, fazer o
//      JSON.parse)

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

  if (req.method === 'GET' && req.url === '/tasks') 
{
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
    return;
}

  if (req.method === 'POST' && req.url === '/tasks') 
{
    const body = await readRequestBody(req);
    const { title } = JSON.parse(body);

    const task: Task = 
    {
      id: crypto.randomUUID(),
      title,
    };

    tasks.push(task);

    // 201 = "Created". É o status code correto quando um POST
    // cria com sucesso um novo recurso (diferente do 200 genérico).
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(task));
    return;
}

  // Nenhuma rota bateu => 404 "Not Found"
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
});

const PORT = 3000;

server.listen(PORT, () => 
{
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Com o servidor rodando (npm run dev), teste com curl:
//
//   curl -X POST http://localhost:3000/tasks\
//     -H "Content-Type: application/json"\
//     -d '{"title":"Estudar Node.js"}'
//
//   curl http://localhost:3000/tasks