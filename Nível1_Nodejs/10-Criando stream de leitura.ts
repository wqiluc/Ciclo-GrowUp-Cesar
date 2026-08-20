// ============================================================
// CRIANDO STREAM DE LEITURA (fs.createReadStream)
// ============================================================
//
// Na aula passada vimos O QUE é uma stream e usamos
// fs.createReadStream junto com pipeline() pra servir um arquivo
// inteiro sem detalhar o que rola por baixo dos panos.
//
// Agora vamos abrir essa caixa: criar uma Readable stream na mão,
// escutar os eventos dela um por um, e entender as OPÇÕES que
// controlam como a leitura acontece (tamanho do pedaço, encoding,
// faixa de bytes).

import fs from 'fs';
import path from 'path';

const CAMINHO_ARQUIVO = path.join(process.cwd(), 'arquivo-exemplo.txt');

if (!fs.existsSync(CAMINHO_ARQUIVO))
{
  fs.writeFileSync(CAMINHO_ARQUIVO, 'Linha de exemplo gerada pela aula de streams.\n'.repeat(1000));
}

// ------------------------------------------------------------
// 1) CRIANDO A STREAM
// ------------------------------------------------------------
//
// fs.createReadStream NÃO lê o arquivo na hora que é chamado.
// Ele só devolve um objeto Readable, "parado", pronto pra
// começar a ler assim que alguém escutar o evento 'data' (ou
// usar .pipe/pipeline nela).

const leitura = fs.createReadStream(CAMINHO_ARQUIVO,
{
  // highWaterMark = tamanho (em bytes) de cada "chunk" que a
  // stream entrega por vez. Padrão é 64KB. Deixei bem pequeno
  // aqui (16 bytes) só pra CONSEGUIR VER vários chunks no
  // console em vez de um só.
  highWaterMark: 16,

  // Sem 'encoding', cada chunk chega como Buffer (bytes crus).
  // Com 'utf-8', a stream já entrega string pronta.
  encoding: 'utf-8',
});

// ------------------------------------------------------------
// 2) OS EVENTOS DE UMA READABLE STREAM
// ------------------------------------------------------------

let totalDeChunks = 0;

leitura.on('open', () =>
{
  console.log('[open] arquivo foi aberto, leitura vai começar');
}
);

leitura.on('data', (chunk) =>
{
  totalDeChunks++;
  console.log(`[data] chunk #${totalDeChunks} (${chunk.length} caracteres):`, JSON.stringify(chunk));
}
);

leitura.on('end', () =>
{
  console.log(`[end] acabou a leitura. Total de chunks: ${totalDeChunks}`);
}
);

leitura.on('close', () =>
{
  console.log('[close] arquivo foi fechado (descritor liberado)');
}
);

leitura.on('error', (erro) =>
{
  console.error('[error] algo deu errado lendo o arquivo:', erro);
}
);

// ------------------------------------------------------------
// POR QUE highWaterMark PEQUENO NÃO É "MAIS RÁPIDO"
// ------------------------------------------------------------
//
// highWaterMark só controla o tamanho do BUFFER interno / do
// pedaço entregue por evento 'data' — não a velocidade real de
// disco. Um valor muito pequeno gera MAIS eventos (mais overhead
// de JS pra cada pedacinho); um valor muito grande usa mais
// memória por chunk. O padrão (64KB) é um bom meio-termo pra
// arquivos — por isso só reduzimos aqui como didática.

// ------------------------------------------------------------
// 3) LENDO SÓ UM PEDAÇO DO ARQUIVO (start / end)
// ------------------------------------------------------------
//
// Dá pra pedir só uma faixa de bytes, sem ler o arquivo inteiro.
// Útil pra coisas como servir vídeo em pedaços (ex: suporte a
// "Range" no header HTTP, usado no <video> do navegador).

function lerFaixaDeBytes()
{
  const streamParcial = fs.createReadStream(CAMINHO_ARQUIVO,
{
    encoding: 'utf-8',
    start: 0,
    end: 19, // inclusivo: lê os bytes 0 até 19 (20 bytes)
});

  let conteudo = '';
  streamParcial.on('data', (chunk) => { conteudo += chunk; });
  streamParcial.on('end', () =>
{
    console.log('[faixa 0-19] conteúdo lido:', JSON.stringify(conteudo));
});
}

lerFaixaDeBytes();