// A requisição HTTP (IncomingMessage) é uma Readable stream de Buffers.
// Pra virar um objeto JSON, é preciso juntar os chunks e só então parsear.

import http from 'http';
import { json } from 'stream/consumers';

// 1) Na mão: acumula os Buffers e parseia no fim
async function lerCorpoNaMao(req: http.IncomingMessage): Promise<any>
{
  const chunks: Buffer[] = [];
  for await (const chunk of req)
  {
    chunks.push(chunk);
  }

  const corpo = Buffer.concat(chunks).toString('utf-8');
  return corpo ? JSON.parse(corpo) : {};
}

const servidor = http.createServer(async (req, res) =>
{
  if (req.method !== 'POST')
  {
    res.writeHead(405).end('Use POST com um corpo JSON.');
    return;
  }

  try
  {
    // Trocar por `await json(req)` faz a mesma coisa usando o helper pronto.
    const dados = await lerCorpoNaMao(req);
    console.log('recebido:', dados);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, recebido: dados }));
  }
  catch
  {
    res.writeHead(400).end('JSON inválido.');
  }
});

const PORTA = 3000;
servidor.listen(PORTA, () =>
{
  console.log(`servidor ouvindo em http://localhost:${PORTA}`);
  console.log(`teste: curl -X POST http://localhost:${PORTA} -d '{"nome":"cesar"}' -H 'Content-Type: application/json'`);
});
