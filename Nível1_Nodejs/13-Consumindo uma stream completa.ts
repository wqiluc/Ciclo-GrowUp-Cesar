// Consumir uma stream por completo = esperar ela terminar e juntar
// tudo num único valor na memória (Buffer, string ou objeto). Só
// faz sentido quando o dado cabe na memória — senão, tramite direto
// (pipeline) como nas aulas anteriores.

import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { buffer, text, json } from 'stream/consumers';

const CAMINHO_ARQUIVO = path.join(process.cwd(), 'arquivo-exemplo.txt');

if (!fs.existsSync(CAMINHO_ARQUIVO))
{
  fs.writeFileSync(CAMINHO_ARQUIVO, 'Linha de exemplo gerada pela aula de streams.\n'.repeat(1000));
}

// 1) Na mão, com for await...of
async function consumirComForAwait()
{
  const leitura = fs.createReadStream(CAMINHO_ARQUIVO, { encoding: 'utf-8' });

  let conteudo = ' ';
  for await (const chunk of leitura)
  {
    conteudo += chunk;
  }

  console.log('[for-await] tamanho final: ', conteudo.length);
}

// 2) Com os helpers prontos de stream/consumers
async function consumirComHelpers()
{
  const comoBuffer = await buffer(fs.createReadStream(CAMINHO_ARQUIVO));
  console.log('[consumers.buffer] bytes:', comoBuffer.length);

  const comoTexto = await text(fs.createReadStream(CAMINHO_ARQUIVO));
  console.log('[consumers.text] caracteres:', comoTexto.length);
}

// 3) json() faz o mesmo, mas já devolve o objeto parseado
async function consumirComoJson()
{
  const stream = Readable.from(JSON.stringify({ ok: true, itens: [1, 2, 3] }));
  const objeto = await json(stream);
  console.log('[consumers.json] objeto:', objeto);
}

await consumirComForAwait();
await consumirComHelpers();
await consumirComoJson();