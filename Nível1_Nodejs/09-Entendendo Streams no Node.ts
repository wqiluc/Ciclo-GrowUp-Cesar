// ============================================================
// ENTENDENDO STREAMS NO NODE
// ============================================================
//
// Desde a aula de "Headers" a gente já vem usando stream sem
// chamar pelo nome: aquela função que acumula chunks de req.on
// ('data') até o req.on('end') É uma stream sendo lida na unha.
//
// STREAM = um jeito de trabalhar com dados que chegam AOS POUCOS
// (em pedaços, os "chunks"), em vez de esperar tudo pronto de
// uma vez só na memória. Pensa numa mangueira de água: não
// precisa a caixa d'água encher pra você começar a usar a água,
// ela vai passando aos poucos.
//
// Por que isso importa?
//   -> MEMÓRIA: ler um arquivo de 2GB inteiro pra memória (com
//     fs.readFileSync, por exemplo) pode travar o processo. Com
//     stream, você processa pedaço por pedaço, gastando pouca
//     memória o tempo todo.
//   -> VELOCIDADE PERCEBIDA: dá pra começar a ENVIAR a resposta
//     antes de terminar de ler o arquivo inteiro.
//
// ------------------------------------------------------------
// OS 4 TIPOS DE STREAM
// ------------------------------------------------------------
//
//   Readable => de onde os dados SAEM (ex: ler um arquivo,
//               req de uma requisição HTTP)
//   Writable => pra onde os dados ENTRAM (ex: escrever um
//               arquivo, res de uma resposta HTTP)
//   Duplex => é Readable E Writable ao mesmo tempo (ex: um
//               socket TCP)
//   Transform => um Duplex que MODIFICA os dados no meio do
//               caminho (ex: gzip, criptografia)
//
// req (IncomingMessage) é uma Readable stream.
// res (ServerResponse) é uma Writable stream.
// É por isso que a gente escuta req.on('data') / req.on('end')
// pra ler o body — só que fazer isso na mão, acumulando tudo
// num array pra só depois usar, JOGA FORA a vantagem de usar
// stream (porque volta a guardar tudo na memória de uma vez).

import fs from 'fs';
import http from 'http';
import path from 'path';
import { pipeline } from 'stream/promises';

// ------------------------------------------------------------
// LENDO UM ARQUIVO COM STREAM (fs.createReadStream)
// ------------------------------------------------------------
//
// Em vez de fs.readFile (que só entrega o conteúdo quando o
// arquivo INTEIRO já foi lido pra memória), fs.createReadStream
// devolve os dados em pedaços, à medida que vão sendo lidos do
// disco.

const CAMINHO_ARQUIVO = path.join(process.cwd(), 'arquivo-exemplo.txt');

// Criamos um arquivo de exemplo só pra ter o que ler/servir.
if (!fs.existsSync(CAMINHO_ARQUIVO))
{
  fs.writeFileSync(CAMINHO_ARQUIVO, 'Linha de exemplo gerada pela aula de streams.\n'.repeat(1000));
}

// ------------------------------------------------------------
// SERVIDOR: SERVINDO E RECEBENDO ARQUIVOS COM STREAM
// ------------------------------------------------------------

const servidor = http.createServer(async (requisicao, resposta) =>
{
  console.log(`${requisicao.method} ${requisicao.url}`);

  if (requisicao.method === 'GET' && requisicao.url === '/arquivo')
{
    // pipeline() conecta uma Readable numa Writable e cuida de
    // tudo sozinho: repassa os chunks conforme chegam, e o mais
    // importante, respeita o BACKPRESSURE (explicado embaixo).
    //
    // Sem pipeline, teríamos que fazer isso manualmente com
    // leitura.pipe(resposta) — o que funciona, mas pipeline()
    // também propaga erros e fecha os streams direito.
    try
{
      resposta.writeHead(200, {'Content-Type': 'text/plain'});

      const leitura = fs.createReadStream(CAMINHO_ARQUIVO);
      await pipeline(leitura, resposta);
}
    catch (erro)
{
      console.error('Erro ao transmitir arquivo:', erro);
      if (!resposta.headersSent)
{
        resposta.writeHead(500);
}
      resposta.end();
}
    return;
}

  if (requisicao.method === 'POST' && requisicao.url === '/upload')
{
    // requisicao (req) já É uma Readable stream. Em vez de
    // acumular tudo com req.on('data')/req.on('end') pra só
    // depois escrever no arquivo, usamos pipeline pra ir
    // escrevendo DIRETO no disco conforme os chunks chegam.
    const destino = path.join(process.cwd(), 'upload-recebido.txt');
    const escrita = fs.createWriteStream(destino);

    try
{
      await pipeline(requisicao, escrita);

      resposta.writeHead(201, {'Content-Type': 'application/json'});
      resposta.end(JSON.stringify({ mensagem: 'Upload salvo com sucesso' }));
}
    catch (erro)
{
      console.error('Erro ao salvar upload:', erro);
      resposta.writeHead(500, {'Content-Type': 'application/json'});
      resposta.end(JSON.stringify({ mensagem: 'Falha ao salvar o arquivo' }));
}
    return;
}

  resposta.writeHead(404, {'Content-Type': 'application/json'});
  resposta.end(JSON.stringify({ mensagem: 'Rota não encontrada' }));
});

const PORTA = 3333;

servidor.listen(PORTA, () =>
{
  console.log(`Servidor rodando em http://localhost:${PORTA}✅`);
});

// ------------------------------------------------------------
// BACKPRESSURE (POR QUE NÃO É SÓ "LER E JOGAR PRA FRENTE")
// ------------------------------------------------------------
//
// Backpressure é o mecanismo que evita que uma Readable RÁPIDA
// (ex: ler do disco) sobrecarregue uma Writable LENTA (ex:
// mandar pela rede pra um cliente com internet ruim).
//
// Se você tentasse fazer isso na mão, chamando escrita.write()
// pra cada chunk sem checar nada, os chunks lidos rápido demais
// iriam se acumulando em memória esperando a escrita terminar
// — ou seja, você perderia a vantagem de usar stream.
//
// pipe() e pipeline() já cuidam disso: eles PAUSAM a leitura
// automaticamente quando a escrita não está dando conta, e
// RETOMAM quando ela libera espaço de novo. Por isso pipeline()
// é sempre preferível a implementar o encadeamento na mão.

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Com o servidor rodando (npm run dev), teste com curl:
//
//   curl http://localhost:3000/arquivo
//   (baixa o arquivo-exemplo.txt inteiro, transmitido em stream)
//
//   curl -X POST http://localhost:3000/upload --data-binary @arquivo-exemplo.txt
//   (envia o arquivo como body; o servidor escreve em
//   upload-recebido.txt conforme os chunks chegam, sem juntar
//   tudo na memória antes)