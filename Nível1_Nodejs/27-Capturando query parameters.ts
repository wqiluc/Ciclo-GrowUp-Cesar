// Assim como params vem do regex da rota, query vem do pedaço depois
// do "?" em req.url. Extraída uma vez no router, com URLSearchParams,
// e disponibilizada em req.query pra qualquer handler usar.

import http from 'http';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const CAMINHO_DB = path.join(process.cwd(), 'db.json');

class Database
{
  #dados: Map<string, any[]>;

  constructor()
  {
    if (fs.existsSync(CAMINHO_DB))
    {
      const conteudo = fs.readFileSync(CAMINHO_DB, 'utf-8');
      this.#dados = new Map(Object.entries(JSON.parse(conteudo)));
    }

    else
    {
      this.#dados = new Map();
    }
  }

  #persistir(): void
  {
    fs.writeFileSync(CAMINHO_DB, JSON.stringify(Object.fromEntries(this.#dados), null, 2));
  }

  select(tabela: string, busca?: Record<string, any>): any[]
  {
    const registros = this.#dados.get(tabela) ?? [];

    if (!busca)
    {
      return registros;
    }

    return registros.filter((registro) =>
      Object.entries(busca).every(([chave, valor]) => registro[chave] === valor)
    );
  }

  insert(tabela: string, dados: Record<string, any>): any
  {
    const registro = { id: randomUUID(), ...dados };
    const registros = this.#dados.get(tabela) ?? [];
    registros.push(registro);
    this.#dados.set(tabela, registros);
    this.#persistir();
    return registro;
  }

  update(tabela: string, id: string, dados: Record<string, any>): any
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros[indice] = { ...registros[indice], ...dados };
    this.#persistir();
    return registros[indice];
  }

  delete(tabela: string, id: string): void
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros.splice(indice, 1);
    this.#persistir();
  }
}

const db = new Database();

interface RequisicaoComCorpo extends http.IncomingMessage
{
  body?: any;
  params: Record<string, string>;
  query: URLSearchParams;
}

type Handler = (req: RequisicaoComCorpo, res: http.ServerResponse) => void | Promise<void>;

function comJson(handler: Handler): Handler
{
  return async (req: any, res) =>
  {
    const metodoTemCorpo = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH';
    if (!metodoTemCorpo)
    {
      return handler(req, res);
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req)
    {
      chunks.push(chunk);
    }
    const corpo = Buffer.concat(chunks).toString('utf-8');

    try
    {
      req.body = corpo ? JSON.parse(corpo) : {};
    }

    catch
    {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'JSON inválido' }));
      return;
    }

    return handler(req, res);
  };
}

function construirRegexDaRota(path: string): RegExp
{
  const caminhoComParams = path.replace(/:(\w+)/g, (_, nome) => `(?<${nome}>[^/]+)`);
  return new RegExp(`^${caminhoComParams}(?:\\?(?<query>.*))?$`);
}

interface Rota
{
  metodo: string;
  regex: RegExp;
  handler: Handler;
}

const rotas: Rota[] =
[
  {
    metodo: 'GET',
    regex: construirRegexDaRota('/usuarios'),
    handler: (req, res) =>
    {
      console.log('query recebida:', Object.fromEntries(req.query));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.select('usuarios')));
    },
  },
  {
    metodo: 'POST',
    regex: construirRegexDaRota('/usuarios'),
    handler: (req, res) =>
    {
      const usuario = db.insert('usuarios', req.body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usuario));
    },
  },
];

const servidor = http.createServer(comJson((req: any, res) =>
{
  const [pathname, querystring] = (req.url as string).split('?');
  const rota = rotas.find((rota) => rota.metodo === req.method && rota.regex.test(pathname));

  if (rota)
  {
    req.params = rota.regex.exec(pathname)?.groups ?? {};
    req.query = new URLSearchParams(querystring ?? '');
    return rota.handler(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
}) as http.RequestListener);

const PORTA = 3335;
servidor.listen(PORTA, () =>
{
  console.log(`servidor ouvindo em http://localhost:${PORTA}`);
  console.log(`teste: curl "http://localhost:${PORTA}/usuarios?search=ana"`);
});
