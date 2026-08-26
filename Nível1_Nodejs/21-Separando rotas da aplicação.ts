// Até aqui as rotas viviam num bloco gigante de if dentro do
// createServer. Aqui elas viram uma lista de { metodo, path, handler },
// e o servidor só percorre essa lista procurando quem bate.

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
}

type Handler = (req: RequisicaoComCorpo, res: http.ServerResponse) => void | Promise<void>;

function comJson(handler: Handler): Handler
{
  return async (req, res) =>
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

interface Rota
{
  metodo: string;
  path: string;
  handler: Handler;
}

const rotas: Rota[] =
[
  {
    metodo: 'GET',
    path: '/usuarios',
    handler: (req, res) =>
    {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.select('usuarios')));
    },
  },
  {
    metodo: 'POST',
    path: '/usuarios',
    handler: (req, res) =>
    {
      const usuario = db.insert('usuarios', req.body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usuario));
    },
  },
];

const servidor = http.createServer(comJson((req, res) =>
{
  const rota = rotas.find((rota) => rota.metodo === req.method && rota.path === req.url);

  if (rota)
  {
    return rota.handler(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
}));

const PORTA = 3335;
servidor.listen(PORTA, () =>
{
  console.log(`Servidor ouvindo em http://localhost:${PORTA} ❤️`);
});