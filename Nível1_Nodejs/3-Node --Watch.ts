// ============================================================
// O QUE É O --watch DO NODE.JS?
// ============================================================
//
// Por padrão, o Node executa o arquivo UMA VEZ e para (ou fica
// rodando, no caso de um servidor, mas sem nunca recarregar).
// Se você mudar o código, precisa parar o processo (Ctrl+C) e
// rodar `node arquivo.ts` de novo manualmente pra ver o efeito.
//
// A flag --watch resolve isso: o Node passa a observar (watch)
// o arquivo executado e todos os arquivos que ele importa. Assim
// que algum desses arquivos é salvo/alterado, o Node MATA o
// processo antigo e REINICIA ele automaticamente.
//
//   node --watch arquivo.ts
//
// Isso é o mesmo problema que ferramentas como o "nodemon"
// resolvem — mas --watch já vem embutido no Node (desde a v18.11,
// estável a partir da v20), então não precisa instalar nada.
//
// IMPORTANTE: --watch reinicia o PROCESSO inteiro. Não é a mesma
// coisa que um "hot reload" de frontend (que troca só o pedaço
// que mudou, sem perder estado). Aqui, se o servidor tinha alguma
// variável em memória, ela é perdida a cada reinício — porque o
// processo Node começa do zero de novo.

// ------------------------------------------------------------
// OUTRAS FLAGS ÚTEIS
// ------------------------------------------------------------
//
// --watch-path=./src        => observa só uma pasta específica
//                               (em vez de tudo que foi importado)
// --watch-preserve-output   => não limpa o terminal a cada restart
//
// Exemplo:
//   node --watch --watch-preserve-output --watch-path=./src index.ts

// ------------------------------------------------------------
// DEMONSTRAÇÃO: servidor HTTP com auto-restart
// ------------------------------------------------------------
//
// Esse é o mesmo servidor da aula anterior. Rode com:
//
//   npm run dev
//
// (o script "dev" no package.json já chama `node --watch` nesse
// arquivo). Depois, com o servidor rodando, mude a mensagem do
// res.end() abaixo e salve — repare que o terminal mostra o
// Node reiniciando sozinho, sem você precisar parar e rodar de
// novo.

import http from 'http';

const server = http.createServer((req, res) =>
{
  console.log(`${req.method} ${req.url}`);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor rodando com --watch! Edite essa mensagem e salve ✅\n');
});

const PORT = 3000;

server.listen(PORT, () =>
{
  console.log(`Servidor rodando em http://localhost:${PORT} (watch ativo)`);
});
