// O banco da aula 18 morre junto com o processo. Persistir = salvar o
// Map inteiro num arquivo JSON a cada mudança, e recarregar dele ao iniciar.

import fs from 'fs';
import path from 'path';

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

  insert(tabela: string, registro: any): any
  {
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
console.log('carregado do disco:', db.select('usuarios'));

if (db.select('usuarios', { id: '1' }).length === 0)
{
  db.insert('usuarios', { id: '1', nome: 'Cesar' });
  console.log('inserido — rode este arquivo de novo para ver o registro vindo do disco');
}

