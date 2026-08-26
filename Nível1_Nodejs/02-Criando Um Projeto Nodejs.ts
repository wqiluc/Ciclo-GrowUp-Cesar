const a = 5;
const b = 5;

console.log(`${a} + ${b}`);

// Commandjs ==> Require
// ESmodules ==> import/export (nosso)

// ============================================================
// CRIANDO UM SERVIDOR HTTP
// ============================================================
//
// O módulo 'http' já vem embutido no Node.js — não precisa
// instalar nada (é diferente do Express, que é uma biblioteca
// externa que facilita a criação de servidores).
//
// createServer() recebe uma função (o "handler") que é chamada
// TODA VEZ que uma requisição chega no servidor. Essa função
// recebe dois objetos:
//   - req (request)  => informações sobre o que o cliente pediu
//                       (URL, método HTTP, headers, etc)
//   - res (response) => usado para responder o cliente

import http from 'http';

const server = http.createServer((req, res) => 
{
  console.log(`${req.method} ${req.url}`);

  // Toda resposta HTTP tem um status code (200 = sucesso) e
  // headers (metadados sobre o conteúdo da resposta).
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // end() envia o corpo da resposta e finaliza a requisição.
  res.end('Servidor HTTP rodando com sucesso! ✅\n');
});

// ------------------------------------------------------------
// COLOCANDO O SERVIDOR PARA ESCUTAR
// ------------------------------------------------------------
//
// listen() faz o servidor "escutar" requisições numa porta
// específica da máquina. Enquanto o processo Node estiver
// rodando, o servidor fica ativo esperando conexões — é por
// isso que o Node não "termina" o script como faria com um
// console.log comum.

const PORT = 3000;

server.listen(PORT, () => 
{
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
