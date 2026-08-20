// ============================================================
// CONHECENDO HTTP STATUS CODES
// ============================================================
//
// Nas aulas anteriores já usamos alguns status codes (200, 201,
// 404, 415) meio "no automático". Agora vamos entender o que
// eles significam de verdade e ampliar a API de "usuarios" com
// rotas de busca, atualização e remoção, cada uma respondendo
// o código correto pra cada situação.
//
// Status codes são divididos em 5 faixas, pelo primeiro dígito:
//
//   1xx => INFORMATIVO equisição recebida, continua processando
//   2xx => SUCESSO = deu certo✅
//   3xx => REDIRECIONAMENTO precisa de outra ação pra completar
//   4xx => ERRO DO CLIENTE o cliente mandou algo errado
//   5xx => ERRO DO SERVIDOR o servidor quebrou processando algo certo
//
// Os mais usados no dia a dia de uma API REST:
//
//   200 OK sucesso genérico (GET, PUT, PATCH)
//   201 Created sucesso ao CRIAR um recurso (POST)
//   204 No Content sucesso mas sem body na resposta (DELETE)
//   400 Bad Request o body/parâmetros mandados são inválidos
//   401 Unauthorized falta se autenticar
//   403 Forbidden autenticado, mas sem permissão
//   404 Not Found a rota ou o recurso não existe
//   409 Conflict conflita com o estado atual (ex: duplicado)
//   415 Unsupported Media Type Content-Type não é o esperado
//   500 Internal Server Error erro inesperado no servidor

import http from 'http';

// ------------------------------------------------------------
// "BANCO DE DADOS" EM MEMÓRIA
// ------------------------------------------------------------

type Usuario =
{
  id: string;
  nome: string;
};

const usuarios: Usuario[] = [];

// ------------------------------------------------------------
// LENDO O BODY DA REQUISIÇÃO
// ------------------------------------------------------------

function lerCorpoRequisicao(requisicao: http.IncomingMessage): Promise<string>
{
  return new Promise((resolve) =>
{
    const pedacos: Buffer[] = [];

    requisicao.on('data', (pedaco: Buffer) =>
    {
      pedacos.push(pedaco);
    });

    requisicao.on('end', () =>
    {
      resolve(Buffer.concat(pedacos).toString());
    });
  });
}

// ------------------------------------------------------------
// SERVIDOR COM ROTEAMENTO MANUAL
// ------------------------------------------------------------

const servidor = http.createServer(async (requisicao, resposta) =>
{
  console.log(`${requisicao.method} ${requisicao.url}`);

  // Rotas com :id (ex: /usuarios/123) não batem num "===" simples,
  // então quebramos a URL em pedaços pra extrair o id à mão.
  const partesUrl = (requisicao.url ?? '').split('/').filter(Boolean);
  const ehColecaoUsuarios = partesUrl.length === 1 && partesUrl[0] === 'usuarios';
  const ehItemUsuario = partesUrl.length === 2 && partesUrl[0] === 'usuarios';
  const idUsuario = ehItemUsuario ? partesUrl[1] : undefined;

  if (requisicao.method === 'GET' && ehColecaoUsuarios)
{
    // 200 OK => sucesso genérico, aqui devolvendo a lista inteira.
    resposta.writeHead(200, { 'Content-Type': 'application/json' });
    resposta.end(JSON.stringify(usuarios));
    return;
}

  if (requisicao.method === 'GET' && ehItemUsuario)
{
    const usuario = usuarios.find((item) => item.id === idUsuario);

    if (!usuario)
{
      // 404 Not Found => a rota existe, mas o RECURSO pedido não.
      resposta.writeHead(404, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'Usuário não encontrado' }));
      return;
}

    resposta.writeHead(200, { 'Content-Type': 'application/json' });
    resposta.end(JSON.stringify(usuario));
    return;
}

  if (requisicao.method === 'POST' && ehColecaoUsuarios)
{
    const tipoConteudo = requisicao.headers['content-type'];

    if (tipoConteudo !== 'application/json')
{
      // 415 Unsupported Media Type => o formato do body não é
      // o que o servidor sabe processar.
      resposta.writeHead(415, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'Content-Type deve ser application/json' }));
      return;
}

    const corpo = await lerCorpoRequisicao(requisicao);
    const { nome } = JSON.parse(corpo);

    if (!nome)
{
      // 400 Bad Request => o Content-Type até tá certo, mas o
      // CONTEÚDO do body é inválido pra criar o recurso.
      resposta.writeHead(400, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'O campo "nome" é obrigatório' }));
      return;
}

    const usuario: Usuario =
    {
      id: crypto.randomUUID(),
      nome,
    };

    usuarios.push(usuario);

    // 201 Created => sucesso ao criar um recurso NOVO.
    resposta.writeHead(201, { 'Content-Type': 'application/json' });
    resposta.end(JSON.stringify(usuario));
    return;
}

  if (requisicao.method === 'PUT' && ehItemUsuario)
{
    const usuario = usuarios.find((item) => item.id === idUsuario);

    if (!usuario)
{
      resposta.writeHead(404, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'Usuário não encontrado' }));
      return;
}

    const corpo = await lerCorpoRequisicao(requisicao);
    const { nome } = JSON.parse(corpo);

    if (!nome)
{
      resposta.writeHead(400, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'O campo "nome" é obrigatório' }));
      return;
}

    usuario.nome = nome;

    // 200 OK => atualizou com sucesso e tem body pra devolver
    // (o recurso atualizado). Diferente do 201, pois não criou nada.
    resposta.writeHead(200, { 'Content-Type': 'application/json' });
    resposta.end(JSON.stringify(usuario));
    return;
}

  if (requisicao.method === 'DELETE' && ehItemUsuario)
{
    const indiceUsuario = usuarios.findIndex((item) => item.id === idUsuario);

    if (indiceUsuario < 0)
{
      resposta.writeHead(404, { 'Content-Type': 'application/json' });
      resposta.end(JSON.stringify({ mensagem: 'Usuário não encontrado' }));
      return;
}

    usuarios.splice(indiceUsuario, 1);

    // 204 No Content => sucesso, mas não tem nada útil pra devolver
    // no body. Por isso NÃO chamamos resposta.end() com JSON nenhum.
    resposta.writeHead(204);
    resposta.end();
    return;
}

  // Nenhuma rota bateu => 404 "Not Found"
  resposta.writeHead(404, { 'Content-Type': 'application/json' });
  resposta.end(JSON.stringify({ mensagem: 'Rota não encontrada' }));
});

const PORTA = 3000;

servidor.listen(PORTA, () =>
{
  console.log(`Servidor rodando em http://localhost:${PORTA} ✅`);
});

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Com o servidor rodando (npm run dev), teste com curl:
//
//   curl -X POST http://localhost:3000/usuarios\
//     -H "Content-Type: application/json"\
//     -d '{"nome":"Lucas"}'
//   (201 Created, guarda o "id" que voltou pra usar nos próximos)
//
//   curl -X POST http://localhost:3000/usuarios\
//     -H "Content-Type: application/json"\
//     -d '{}'
//   (400 Bad Request, faltou o "nome")
//
//   curl -i http://localhost:3000/usuarios/<id>
//   (200 OK se existir, 404 Not Found se não)
//
//   curl -X PUT http://localhost:3000/usuarios/<id>\
//     -H "Content-Type: application/json"\
//     -d '{"nome":"Lucas Paguetti"}'
//   (200 OK)
//
//   curl -i -X DELETE http://localhost:3000/usuarios/<id>
//   (204 No Content, sem body na resposta)