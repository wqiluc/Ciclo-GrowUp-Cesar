// ============================================================
// APLICANDO STREAMS NO MÓDULO HTTP
// ============================================================
//
// Nas aulas 10 e 11 vimos Readable, Writable e Transform "soltas",
// sem servidor nenhum no meio. Mas o motivo de tudo isso importar
// pra web é simples:
//
//   req (IncomingMessage) => JÁ é uma Readable
//   res (ServerResponse) => JÁ é uma Writable
//
// Ou seja, todo servidor HTTP que você já escreveu tava, o tempo
// todo, manipulando streams. Agora que a gente sabe o que tem por
// baixo, dá pra plugar uma Transform no meio do caminho e streamar
// dados relacionados a rede sem nunca guardar tudo na memória —
// nem do lado de quem lê (upload), nem do lado de quem escreve
// (download).

import fs from 'fs';
import http from 'http';
import path from 'path';
import zlib from 'zlib';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const CAMINHO_ARQUIVO = path.join(process.cwd(), 'arquivo-exemplo.txt');

if (!fs.existsSync(CAMINHO_ARQUIVO))
{
  fs.writeFileSync(CAMINHO_ARQUIVO, 'Linha de exemplo gerada pela aula de streams.\n'.repeat(1000));
}

// ------------------------------------------------------------
// 1) A TRANSFORM DA AULA PASSADA, REAPROVEITADA AQUI
// ------------------------------------------------------------
//
// Não tem nada de especial em usar uma Transform dentro de um
// servidor HTTP: ela não sabe (nem precisa saber) que tem uma
// requisição/resposta nas pontas. Pra ela, só existe "alguma
// Readable" de um lado e "alguma Writable" do outro.

class ParaMaiuscula extends Transform
{
  _transform(chunk: Buffer, encoding: BufferEncoding, callback: (erro?: Error | null, dado?: any) => void)
  {
    callback(null, chunk.toString('utf-8').toUpperCase());
  }
}

// ------------------------------------------------------------
// 2) SERVIDOR
// ------------------------------------------------------------

const servidor = http.createServer(async (req, res) =>
{
  console.log(`${req.method} ${req.url}`);

  // ----------------------------------------------------------
  // GET /arquivo -> streama um arquivo de disco pro cliente
  // ----------------------------------------------------------
  //
  // Diferente da aula 9, aqui a gente manda Content-Length ANTES
  // de começar a escrever, usando fs.stat pra saber o tamanho sem
  // precisar ler o arquivo inteiro. Isso deixa o cliente saber o
  // progresso do download (0%, 50%, 100%) em vez de só receber
  // chunks sem fim previsto.
  if (req.method === 'GET' && req.url === '/arquivo')
{
    try
    {
      const estatisticas = fs.statSync(CAMINHO_ARQUIVO);

      res.writeHead(200, 
    {
        'Content-Type': 'text/plain',
        'Content-Length': estatisticas.size,
    });

      const leitura = fs.createReadStream(CAMINHO_ARQUIVO);
      await pipeline(leitura, res);
    }
    catch (erro)
    {
      console.error('Erro ao transmitir arquivo:', erro);
      if (!res.headersSent)
      {
        res.writeHead(500);
      }
      res.end();
    }
    return;
  }

  // ----------------------------------------------------------
  // GET /arquivo-gzip -> mesma coisa, mas com uma Transform de
  // verdade no meio: zlib.createGzip()
  // ----------------------------------------------------------
  //
  // zlib.createGzip() é uma Transform pronta do Node: entra
  // Buffer cru, sai Buffer comprimido, chunk por chunk. Ela
  // encaixa no pipeline exatamente como a ParaMaiuscula encaixava
  // na aula passada — é só mais um elo na corrente.
  //
  // Repare que NÃO dá pra mandar Content-Length aqui: o tamanho
  // comprimido só se sabe depois de comprimir tudo, e a gente não
  // quer esperar isso pra começar a responder. Por isso
  // Content-Encoding existe: ele avisa o cliente "o que eu tô
  // mandando tá comprimido, descomprime aí do seu lado".
  if (req.method === 'GET' && req.url === '/arquivo-gzip')
  {
    try
    {
      res.writeHead(200, 
    {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip',
      });

      const leitura = fs.createReadStream(CAMINHO_ARQUIVO);
      const compressao = zlib.createGzip();
      await pipeline(leitura, compressao, res);
    }
    catch (erro)
    {
      console.error('Erro ao comprimir/transmitir arquivo:', erro);
      if (!res.headersSent)
      {
        res.writeHead(500);
      }
      res.end();
    }
    return;
  }

  // ----------------------------------------------------------
  // POST /maiuscula -> req entra, passa pela Transform, sai
  // direto pra res. Sem acumular nada em memória em NENHUM lado.
  // ----------------------------------------------------------
  //
  // req -> ParaMaiuscula -> res
  //
  // Isso é literalmente o mesmo pipeline de 3 elos da aula 11
  // (Readable -> Transform -> Writable), só que aqui a Readable e
  // a Writable são a própria conversa HTTP. O cliente pode estar
  // MANDANDO o corpo aos poucos (upload lento) enquanto o servidor
  // já está DEVOLVENDO a resposta transformada aos poucos.
  if (req.method === 'POST' && req.url === '/maiuscula')
  {
    try
    {
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      const paraMaiuscula = new ParaMaiuscula();
      await pipeline(req, paraMaiuscula, res);
    }
    catch (erro)
    {
      console.error('Erro ao transformar corpo da requisição:', erro);
      if (!res.headersSent)
      {
        res.writeHead(500);
      }
      res.end();
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ mensagem: 'Rota não encontrada' }));
});

const PORTA = 3333;

servidor.listen(PORTA, () =>
{
  console.log(`Servidor rodando em http://localhost:${PORTA} ✅`);
});

// ------------------------------------------------------------
// POR QUE headersSent IMPORTA AQUI
// ------------------------------------------------------------
//
// Num pipeline com res no fim, se o erro acontecer DEPOIS que o
// primeiro chunk já foi escrito (ex: leitura falhou no meio do
// arquivo), os headers já foram enviados — chamar writeHead() de
// novo nesse ponto quebraria a resposta. Por isso todo catch aqui
// checa resposta.headersSent antes de tentar mandar um status de
// erro.

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Com o servidor rodando (npm run dev ou node --watch nesse
// arquivo), teste com curl:
//
//   curl http://localhost:3333/arquivo -o baixado.txt
//   (baixa o arquivo com Content-Length correto)
//
//   curl http://localhost:3333/arquivo-gzip --compressed -o baixado.txt
//   (--compressed faz o curl descomprimir sozinho; sem essa flag
//   o arquivo salvo fica com o conteúdo gzipado, cru)
//
//   curl -X POST http://localhost:3333/maiuscula --data-binary @arquivo-exemplo.txt
//   (o corpo enviado volta transformado em maiúsculas, streamado)
