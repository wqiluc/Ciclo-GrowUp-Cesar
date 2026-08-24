// ============================================================
// STREAM DE ESCRITA E TRANSFORMAÇÃO (Writable / Transform)
// ============================================================
//
// Na aula passada abrimos a Readable na mão (fs.createReadStream)
// e vimos os eventos 'open', 'data', 'end', 'close', 'error'.
//
// Agora vamos ver o outro lado: a Writable, que é pra ONDE os
// dados entram (ex: escrever um arquivo, res de uma resposta
// HTTP) — e o Transform, que fica NO MEIO do caminho, entre uma
// Readable e uma Writable, modificando os dados que passam por
// ele (ex: deixar tudo maiúsculo, comprimir, criptografar).

import fs from 'fs';
import path from 'path';
import { Readable, Transform, Writable } from 'stream';
import { pipeline } from 'stream/promises';

const CAMINHO_ARQUIVO = path.join(process.cwd(), 'arquivo-exemplo.txt');

if (!fs.existsSync(CAMINHO_ARQUIVO))
{
  fs.writeFileSync(CAMINHO_ARQUIVO, 'Linha de exemplo gerada pela aula de streams.\n'.repeat(1000));
}

// ------------------------------------------------------------
// 1) CRIANDO UMA WRITABLE (fs.createWriteStream)
// ------------------------------------------------------------
//
// Assim como a Readable, fs.createWriteStream não escreve nada
// na hora que é chamado. Ele devolve um objeto Writable pronto
// pra receber chunks via .write() — e cada .write() devolve
// true/false, avisando se o buffer interno já encheu (isso é a
// base do backpressure, visto na aula 9).

const CAMINHO_SAIDA = path.join(process.cwd(), 'saida-maiuscula.txt');

function escreverNaMao()
{
  const escrita = fs.createWriteStream(CAMINHO_SAIDA);

  escrita.on('open', () =>
  {
    console.log('[open] arquivo de saída foi aberto pra escrita');
  });

  escrita.on('finish', () =>
  {
    console.log('[finish] todos os chunks foram entregues ao sistema de arquivos');
  });

  escrita.on('close', () =>
  {
    console.log('[close] arquivo de saída foi fechado (descritor liberado)');
  });

  escrita.on('error', (erro) =>
  {
    console.error('[error] algo deu errado escrevendo o arquivo: ', erro);
  });

  escrita.write('primeira linha\n');
  escrita.write('segunda linha\n');

  // end() sinaliza que não vem mais nenhum chunk. Sem chamar
  // end(), o evento 'finish' nunca dispara e o arquivo fica
  // "pendurado" esperando mais dados.
  escrita.end('última linha\n');
}

escreverNaMao();

// ------------------------------------------------------------
// POR QUE write() DEVOLVE true/false (BACKPRESSURE NA WRITABLE)
// ------------------------------------------------------------
//
// Cada Writable tem um highWaterMark próprio (padrão 16KB). Se
// você chamar .write() muitas vezes seguidas mais rápido do que
// o destino consegue absorver (disco, rede), o buffer interno
// cresce e write() passa a devolver false — um aviso pra você
// PARAR de escrever até o evento 'drain' disparar. É exatamente
// esse controle que pipeline()/pipe() fazem sozinhos, por isso
// são preferíveis a escrever tudo na mão feito acima.

// ------------------------------------------------------------
// 2) CRIANDO UMA TRANSFORM (o meio do caminho)
// ------------------------------------------------------------
//
// Transform é uma classe que a gente EXTENDE, implementando o
// método _transform(chunk, encoding, callback):
//   - chunk    => o pedaço que chegou da Readable
//   - encoding => o encoding do chunk, se for string
//   - callback => tem que ser chamado quando terminar de
//                 processar esse chunk, passando (erro, dadoTransformado)
//
// O que você passar pro callback é o que sai pro lado Writable
// da Transform (ou seja, pro próximo elo do pipeline).

class ParaMaiuscula extends Transform
{
  totalDeChunksTransformados = 0;

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: (erro?: Error | null, dado?: any) => void)
  {
    this.totalDeChunksTransformados++;

    const textoTransformado = chunk.toString('latin1').toLowerCase();

    // primeiro argumento null = "nenhum erro"; segundo argumento
    // = o dado já transformado, empurrado adiante no pipeline.
    callback(null, textoTransformado);
  }
}

// ------------------------------------------------------------
// 3) LIGANDO TUDO: Readable -> Transform -> Writable
// ------------------------------------------------------------
//
// pipeline() aceita quantos elos a gente quiser no meio, não só
// uma Readable e uma Writable direto. Ele conecta cada um ao
// próximo, propaga o backpressure por toda a cadeia e cuida de
// fechar/destruir todos os streams se algum deles der erro.

async function transformarArquivo()
{
  const leitura = fs.createReadStream(CAMINHO_ARQUIVO, 
    { encoding: 'latin1' });
  const paraMaiuscula = new ParaMaiuscula();
  const escrita = fs.createWriteStream(CAMINHO_SAIDA);

  try
  {
    await pipeline(leitura, paraMaiuscula, escrita);
    console.log(`[pipeline] arquivo transformado e salvo em ${CAMINHO_SAIDA}`);
    console.log(`[pipeline] chunks transformados: ${paraMaiuscula.totalDeChunksTransformados}`);
  }
  catch (erro)
  {
    console.error('[pipeline] erro ao transformar arquivo:', erro);
  }
}

transformarArquivo();

// ------------------------------------------------------------
// 4) EXERCÍCIO: Readable numérica + duas Transforms encadeadas
// ------------------------------------------------------------
//
// Aqui em vez de string/Buffer, as streams trabalham em
// objectMode: cada "chunk" é um number, não texto. Isso é muito
// comum quando o pipeline representa um processamento de dados
// (linha de um CSV já parseada, registro de banco, etc), e não
// um fluxo de bytes.
//
// OnetohunrdredStream  -> Readable que gera os números de 1 a 100
// InverseNumberStream  -> Transform que inverte o sinal de cada número
// MultipliedbytenStream -> Transform que multiplica cada número por 10

class OnetohunrdredStream extends Readable
{
  private numeroAtual = 1;

  constructor()
  {
    super({ objectMode: true });
  }

  _read()
  {
    if (this.numeroAtual > 100)
    {
      // push(null) sinaliza o fim da Readable, equivalente ao
      // 'end' que vimos na aula passada.
      this.push(null);
      return;
    }

    this.push(this.numeroAtual);
    this.numeroAtual++;
  }
}

class InverseNumberStream extends Transform
{
  constructor()
  {
    super({ objectMode: true });
  }

  _transform(chunk: number, encoding: BufferEncoding, callback: (erro?: Error | null, dado?: any) => void)
  {
    callback(null, chunk * -1);
  }
}

class MultipliedbytenStream extends Transform
{
  constructor()
  {
    super({ objectMode: true });
  }

  _transform(chunk: number, encoding: BufferEncoding, callback: (erro?: Error | null, dado?: any) => void)
  {
    callback(null, chunk * 10);
  }
}

async function processarNumeros()
{
  const numeros = new OnetohunrdredStream();
  const invertido = new InverseNumberStream();
  const multiplicado = new MultipliedbytenStream();

  const resultado: number[] = [];

  const saida = new Writable({
    objectMode: true,
    write(chunk: number, encoding, callback)
    {
      resultado.push(chunk);
      callback();
    },
  });

  await pipeline(numeros, invertido, multiplicado, saida);

  console.log('[processarNumeros] total de números processados:', resultado.length);
  console.log('[processarNumeros] primeiros 5:', resultado.slice(0, 5));
  console.log('[processarNumeros] últimos 5:', resultado.slice(-5));
}

processarNumeros();

// ------------------------------------------------------------
// TESTANDO
// ------------------------------------------------------------
//
// Rodando este arquivo (npm run dev ou equivalente), dois
// arquivos são gerados na raiz do projeto:
//
//   saida-maiuscula.txt
//   (sobrescrito duas vezes: primeiro pela escreverNaMao(),
//   depois pelo resultado de transformarArquivo() — em ordem
//   assíncrona, então repare nos logs qual terminou por último)
//
// Pra ver cada etapa isolada, comente uma das duas chamadas
// (escreverNaMao() ou transformarArquivo()) e rode de novo.